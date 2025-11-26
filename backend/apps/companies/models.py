"""
Company models
"""
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.core.validators import URLValidator
from django.utils import timezone


class Company(models.Model):
    """Empresa proveedora de tecnología"""

    SIZE_CHOICES = [
        ('micro', 'Micro (1-10 empleados)'),
        ('small', 'Pequeña (11-50 empleados)'),
        ('medium', 'Mediana (51-250 empleados)'),
        ('large', 'Grande (250+ empleados)'),
    ]

    STATUS_CHOICES = [
        ('active', 'Activa'),
        ('inactive', 'Inactiva'),
    ]

    # Datos básicos
    name = models.CharField(
        max_length=255,
        unique=True,
        verbose_name='Nombre'
    )
    cif = models.CharField(
        max_length=20,
        unique=True,
        blank=True,
        null=True,
        verbose_name='CIF'
    )
    website = models.URLField(
        validators=[URLValidator()],
        blank=True,
        verbose_name='Sitio web'
    )

    # Clasificación
    sector = ArrayField(
        models.CharField(max_length=100),
        blank=True,
        default=list,
        verbose_name='Sectores de actividad'
    )
    size = models.CharField(
        max_length=20,
        choices=SIZE_CHOICES,
        verbose_name='Tamaño'
    )

    # Ubicación
    address = models.TextField(
        blank=True,
        verbose_name='Dirección'
    )
    city = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Ciudad'
    )
    region = models.CharField(
        max_length=100,
        blank=True,
        verbose_name='Región'
    )
    country = models.CharField(
        max_length=100,
        default='España',
        verbose_name='País'
    )

    # Contactos (JSON flexible)
    contacts = models.JSONField(
        default=list,
        blank=True,
        verbose_name='Contactos',
        help_text='Lista de contactos clave'
    )

    # Campo de contexto libre
    context_input = models.TextField(
        blank=True,
        verbose_name='Información adicional',
        help_text='Información adicional en texto libre'
    )

    # Estado
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='active',
        verbose_name='Estado'
    )

    # GDPR
    data_processing_consent = models.BooleanField(
        default=False,
        verbose_name='Consentimiento procesamiento de datos'
    )
    consent_date = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Fecha de consentimiento'
    )
    privacy_notice_accepted = models.BooleanField(
        default=False,
        verbose_name='Aviso de privacidad aceptado'
    )

    # Metadata
    created_by = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        related_name='companies_created',
        verbose_name='Creado por'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de creación'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Última actualización'
    )

    class Meta:
        db_table = 'companies'
        verbose_name = 'Empresa'
        verbose_name_plural = 'Empresas'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return self.name


class Document(models.Model):
    """Documento PDF asociado a una empresa"""

    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('processing', 'Procesando'),
        ('completed', 'Completado'),
        ('failed', 'Fallido'),
    ]

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name='documents',
        verbose_name='Empresa'
    )

    # Archivo
    filename = models.CharField(
        max_length=255,
        verbose_name='Nombre de archivo'
    )
    file = models.FileField(
        upload_to='documents/%Y/%m/',
        verbose_name='Archivo'
    )
    file_size = models.IntegerField(
        verbose_name='Tamaño',
        help_text='Tamaño en bytes'
    )

    # Procesamiento
    extracted_text = models.TextField(
        blank=True,
        verbose_name='Texto extraído'
    )
    processed_data = models.JSONField(
        default=dict,
        blank=True,
        verbose_name='Datos procesados',
        help_text='Datos estructurados extraídos por IA'
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Estado'
    )
    processing_error = models.TextField(
        blank=True,
        verbose_name='Error de procesamiento'
    )

    # Metadata
    uploaded_by = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Subido por'
    )
    uploaded_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de subida'
    )
    processed_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Fecha de procesamiento'
    )

    class Meta:
        db_table = 'documents'
        verbose_name = 'Documento'
        verbose_name_plural = 'Documentos'
        ordering = ['-uploaded_at']

    def __str__(self):
        return f"{self.filename} - {self.company.name}"


class CompanyProfile(models.Model):
    """Perfil consolidado y enriquecido de una empresa"""

    company = models.OneToOneField(
        Company,
        on_delete=models.CASCADE,
        related_name='profile',
        verbose_name='Empresa'
    )

    # Datos enriquecidos
    capabilities = ArrayField(
        models.CharField(max_length=200),
        default=list,
        blank=True,
        verbose_name='Capacidades tecnológicas'
    )

    services = ArrayField(
        models.CharField(max_length=200),
        default=list,
        blank=True,
        verbose_name='Servicios ofrecidos'
    )

    sectors_experience = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True,
        verbose_name='Sectores con experiencia'
    )

    case_studies = models.JSONField(
        default=list,
        blank=True,
        verbose_name='Casos de éxito',
        help_text='Casos de éxito y proyectos destacados'
    )

    # Resumen de web scraping
    web_summary = models.TextField(
        blank=True,
        verbose_name='Resumen web',
        help_text='Resumen ejecutivo extraído del sitio web'
    )

    # Completitud del perfil
    profile_completeness = models.IntegerField(
        default=0,
        verbose_name='Completitud del perfil',
        help_text='Porcentaje de completitud (0-100)'
    )

    # Tags generados por IA
    ai_generated_tags = ArrayField(
        models.CharField(max_length=50),
        default=list,
        blank=True,
        verbose_name='Tags generados por IA'
    )

    # Metadata de scraping
    last_scraped_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Última fecha de scraping'
    )
    scraping_status = models.CharField(
        max_length=50,
        blank=True,
        verbose_name='Estado del scraping'
    )

    # Metadata
    last_updated_at = models.DateTimeField(
        auto_now=True,
        verbose_name='Última actualización'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de creación'
    )

    class Meta:
        db_table = 'company_profiles'
        verbose_name = 'Perfil de Empresa'
        verbose_name_plural = 'Perfiles de Empresas'
        indexes = [
            models.Index(fields=['profile_completeness']),
        ]

    def __str__(self):
        return f"Perfil: {self.company.name}"

    def calculate_completeness(self):
        """Calcula el % de completitud del perfil"""
        score = 0
        total = 7

        if self.company.website:
            score += 1
        if len(self.capabilities) > 0:
            score += 1
        if len(self.services) > 0:
            score += 1
        if len(self.sectors_experience) > 0:
            score += 1
        if len(self.case_studies) > 0:
            score += 1
        if self.web_summary:
            score += 1
        if self.company.documents.filter(status='completed').exists():
            score += 1

        self.profile_completeness = int((score / total) * 100)
        self.save(update_fields=['profile_completeness'])
        return self.profile_completeness
