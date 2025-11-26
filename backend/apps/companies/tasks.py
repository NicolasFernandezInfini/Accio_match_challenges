"""
Celery tasks for companies app
"""
import logging
from celery import shared_task
from django.utils import timezone
from .models import Company, Document, CompanyProfile
from apps.ai_services.claude_client import ClaudeClient

logger = logging.getLogger(__name__)


@shared_task(bind=True, max_retries=3)
def process_document(self, document_id):
    """
    Procesa un documento PDF: extrae texto y analiza con IA
    """
    try:
        document = Document.objects.get(id=document_id)
        document.status = 'processing'
        document.save()

        # Extraer texto del PDF
        try:
            import PyPDF2
            pdf_file = document.file.open('rb')
            pdf_reader = PyPDF2.PdfReader(pdf_file)

            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()

            pdf_file.close()

            document.extracted_text = text
            document.save()

        except Exception as e:
            logger.error(f"Error extracting PDF text: {e}")
            document.status = 'failed'
            document.processing_error = f"Error extrayendo texto: {str(e)}"
            document.save()
            return

        # Analizar con Claude
        try:
            claude = ClaudeClient()
            result = claude.analyze_document(
                text=document.extracted_text,
                company_name=document.company.name
            )

            if result.get('parse_error'):
                raise Exception("Error parsing Claude response")

            document.processed_data = result
            document.status = 'completed'
            document.processed_at = timezone.now()
            document.save()

            # Actualizar perfil de empresa
            update_company_profile(document.company.id, document_data=result)

        except Exception as e:
            logger.error(f"Error analyzing document with Claude: {e}")
            document.status = 'failed'
            document.processing_error = f"Error con IA: {str(e)}"
            document.save()

    except Document.DoesNotExist:
        logger.error(f"Document {document_id} not found")
    except Exception as e:
        logger.error(f"Unexpected error processing document {document_id}: {e}")
        raise self.retry(exc=e, countdown=60)


@shared_task(bind=True, max_retries=3)
def scrape_company_website(self, company_id):
    """
    Hace scraping del sitio web de una empresa usando Claude
    """
    try:
        company = Company.objects.get(id=company_id)

        if not company.website:
            logger.warning(f"Company {company_id} has no website")
            return

        # Obtener o crear perfil
        profile, created = CompanyProfile.objects.get_or_create(company=company)
        profile.scraping_status = 'processing'
        profile.save()

        # Scraping con Claude
        try:
            claude = ClaudeClient()
            result = claude.scrape_website(
                url=company.website,
                company_name=company.name
            )

            if result.get('parse_error'):
                raise Exception("Error parsing Claude response")

            if not result.get('scraped_successfully', False):
                profile.scraping_status = 'failed'
                profile.save()
                return

            # Actualizar perfil
            profile.web_summary = result.get('executive_summary', '')
            profile.last_scraped_at = timezone.now()
            profile.scraping_status = 'completed'

            # Merge capabilities y services
            scraped_capabilities = result.get('capabilities', [])
            scraped_services = result.get('services', [])
            scraped_sectors = result.get('sectors', [])
            scraped_case_studies = result.get('case_studies', [])

            # Combinar con datos existentes (sin duplicados)
            profile.capabilities = list(set(profile.capabilities + scraped_capabilities))
            profile.services = list(set(profile.services + scraped_services))
            profile.sectors_experience = list(set(profile.sectors_experience + scraped_sectors))

            # Agregar casos de estudio
            existing_cases = profile.case_studies or []
            profile.case_studies = existing_cases + scraped_case_studies

            profile.save()

            # Recalcular completitud
            profile.calculate_completeness()

        except Exception as e:
            logger.error(f"Error scraping website for company {company_id}: {e}")
            profile.scraping_status = 'failed'
            profile.save()

    except Company.DoesNotExist:
        logger.error(f"Company {company_id} not found")
    except Exception as e:
        logger.error(f"Unexpected error scraping company {company_id}: {e}")
        raise self.retry(exc=e, countdown=60)


def update_company_profile(company_id, document_data):
    """
    Actualiza el perfil de una empresa con datos extraídos de un documento
    """
    try:
        company = Company.objects.get(id=company_id)
        profile, created = CompanyProfile.objects.get_or_create(company=company)

        # Merge capabilities, services, etc.
        if 'capabilities' in document_data:
            profile.capabilities = list(set(profile.capabilities + document_data['capabilities']))

        if 'services' in document_data:
            profile.services = list(set(profile.services + document_data['services']))

        if 'sectors' in document_data:
            profile.sectors_experience = list(set(profile.sectors_experience + document_data['sectors']))

        if 'case_studies' in document_data:
            existing_cases = profile.case_studies or []
            profile.case_studies = existing_cases + document_data['case_studies']

        if 'tags' in document_data:
            profile.ai_generated_tags = list(set(profile.ai_generated_tags + document_data['tags']))

        profile.save()

        # Recalcular completitud
        profile.calculate_completeness()

    except Exception as e:
        logger.error(f"Error updating company profile {company_id}: {e}")


@shared_task
def scrape_active_companies():
    """
    Tarea programada: scraping de todas las empresas activas
    """
    companies = Company.objects.filter(status='active', website__isnull=False).exclude(website='')

    logger.info(f"Starting scraping for {companies.count()} active companies")

    for company in companies:
        scrape_company_website.delay(company.id)

    logger.info("Scraping tasks queued successfully")
