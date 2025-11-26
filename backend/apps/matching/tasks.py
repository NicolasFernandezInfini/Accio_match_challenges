"""
Celery tasks for matching app - Motor de Matchmaking
"""
import logging
import time
from celery import shared_task
from django.utils import timezone
from django.db.models import Q

from .models import MatchingResult, Match
from apps.challenges.models import Challenge
from apps.companies.models import Company
from apps.ai_services.claude_client import ClaudeClient

logger = logging.getLogger(__name__)


@shared_task(bind=True)
def execute_matching_task(self, challenge_id, user_id):
    """
    Ejecuta el proceso completo de matchmaking para un challenge

    Este es el motor principal de matchmaking que:
    1. Pre-filtra empresas por criterios hard
    2. Evalúa cada empresa con Claude API
    3. Genera TOP N matches con scores y explicaciones
    """
    start_time = time.time()

    try:
        challenge = Challenge.objects.get(id=challenge_id)

        # Crear resultado de matching
        result = MatchingResult.objects.create(
            challenge=challenge,
            created_by_id=user_id,
            status='processing',
            config_snapshot={
                'num_matches': challenge.num_matches,
                'sector_target': challenge.sector_target,
                'location_preference': challenge.location_preference,
                'size_preference': challenge.size_preference,
            }
        )

        logger.info(f"Starting matching for challenge {challenge_id}")

        # PASO 1: Pre-filtrado de empresas por criterios hard
        companies_query = Company.objects.filter(status='active')

        # Filtrar por sectores si están especificados
        if challenge.sector_target:
            companies_query = companies_query.filter(
                sector__overlap=challenge.sector_target
            )

        # Filtrar por tamaño si está especificado
        if challenge.size_preference:
            companies_query = companies_query.filter(
                size__in=challenge.size_preference
            )

        # Filtrar por ubicación si está especificada
        if challenge.location_preference:
            companies_query = companies_query.filter(
                Q(city__icontains=challenge.location_preference) |
                Q(region__icontains=challenge.location_preference)
            )

        companies = companies_query.select_related('profile')[:50]  # Max 50 empresas

        logger.info(f"Pre-filtered to {companies.count()} companies")

        # Preparar datos del challenge
        challenge_data = {
            'id': challenge.id,
            'title': challenge.title,
            'description': challenge.description,
            'requirements': challenge.requirements,
            'required_capabilities': challenge.required_capabilities,
            'sector_target': challenge.sector_target,
        }

        # PASO 2: Evaluar cada empresa con Claude
        claude = ClaudeClient()
        evaluations = []

        for company in companies:
            try:
                # Preparar datos de la empresa
                company_data = _prepare_company_data(company)

                # Evaluar con Claude
                evaluation = claude.evaluate_company_for_challenge(
                    company_data=company_data,
                    challenge_data=challenge_data
                )

                if not evaluation.get('parse_error'):
                    evaluations.append({
                        'company': company,
                        'evaluation': evaluation
                    })
                else:
                    logger.warning(f"Failed to evaluate company {company.id}")

            except Exception as e:
                logger.error(f"Error evaluating company {company.id}: {e}")
                continue

        logger.info(f"Successfully evaluated {len(evaluations)} companies")

        # PASO 3: Ordenar por score y seleccionar TOP N
        evaluations.sort(
            key=lambda x: x['evaluation']['scores']['overall'],
            reverse=True
        )

        top_matches = evaluations[:challenge.num_matches]

        # PASO 4: Crear objetos Match
        for rank, match_data in enumerate(top_matches, 1):
            company = match_data['company']
            evaluation = match_data['evaluation']
            scores = evaluation.get('scores', {})

            Match.objects.create(
                result=result,
                company=company,
                rank=rank,
                overall_score=scores.get('overall', 0),
                score_technical_relevance=scores.get('relevancia_tecnica', 0),
                score_sector_experience=scores.get('experiencia_sectorial', 0),
                score_track_record=scores.get('track_record', 0),
                explanation=evaluation.get('explanation', ''),
                highlights=evaluation.get('highlights', []),
                confidence_level=evaluation.get('confidence', 'medium'),
                decision_log={
                    'strengths': evaluation.get('strengths', []),
                    'considerations': evaluation.get('considerations', [])
                }
            )

        # Actualizar resultado
        execution_time = int(time.time() - start_time)
        result.total_companies_analyzed = len(evaluations)
        result.execution_time_seconds = execution_time
        result.status = 'completed'
        result.completed_at = timezone.now()
        result.save()

        # Actualizar challenge
        challenge.status = 'completed'
        challenge.save()

        logger.info(
            f"Matching completed for challenge {challenge_id}. "
            f"TOP {len(top_matches)} matches generated in {execution_time}s"
        )

    except Challenge.DoesNotExist:
        logger.error(f"Challenge {challenge_id} not found")
    except Exception as e:
        logger.error(f"Error in matching task for challenge {challenge_id}: {e}")

        # Marcar como fallido
        try:
            result.status = 'failed'
            result.error_message = str(e)
            result.save()

            challenge.status = 'active'
            challenge.save()
        except:
            pass


def _prepare_company_data(company):
    """
    Prepara todos los datos de una empresa para enviar a Claude
    """
    # Obtener perfil
    profile = getattr(company, 'profile', None)

    data = {
        'id': company.id,
        'name': company.name,
        'cif': company.cif,
        'website': company.website,
        'sector': company.sector,
        'size': company.size,
        'city': company.city,
        'region': company.region,
        'country': company.country,
        'context_input': company.context_input,
        'capabilities': [],
        'services': [],
        'sectors_experience': [],
        'case_studies': [],
        'web_summary': '',
    }

    if profile:
        data['capabilities'] = profile.capabilities
        data['services'] = profile.services
        data['sectors_experience'] = profile.sectors_experience
        data['case_studies'] = profile.case_studies
        data['web_summary'] = profile.web_summary

    return data
