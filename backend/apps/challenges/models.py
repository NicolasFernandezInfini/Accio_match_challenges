"""
Challenge models
"""
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.utils import timezone


class Challenge(models.Model):
    """Desafío o evento de innovación"""

    TYPE_CHOICES = [
        ('permanent', 'Plataforma Permanente'),
        ('event', 'Event-Based'),
    ]

    STATUS_CHOICES = [
        ('draft', 'Borrador'),
        ('active', 'Activo'),
        ('matching', 'En Proceso de Matching'),
        ('completed', 'Completado'),
        ('archived', 'Archivado'),
    ]

    LANGUAGE_CHOICES = [
        ('es', 'Español'),
        ('ca', 'Català'),
    ]

    # Información básica
    title = models.CharField(
        max_length=255,
        verbose_name='Título'
    )
    description = models.TextField(
        verbose_name='Descripción',
        help_text='Descripción detallada del desafío'
    )
    type = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        verbose_name='Tipo'
    )
    topic = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='Tema',
        help_text='Tema o tópico principal'
    )

    # Organización solicitante
    requesting_org = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='Organización solicitante'
    )
    contact_person = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='Persona de contacto'
    )
    contact_email = models.EmailField(
        blank=True,
        verbose_name='Email de contacto'
    )

    # Requisitos técnicos
    requirements = models.TextField(
        verbose_name='Requisitos',
        help_text='Requisitos técnicos y capacidades necesarias'
    )
    required_capabilities = ArrayField(
        models.CharField(max_length=200),
        default=list,
        blank=True,
        verbose_name='Capacidades requeridas'
    )

    # Preferencias de matching
    sector_target = ArrayField(
        models.CharField(max_length=100),
        default=list,
        blank=True,
        verbose_name='Sectores objetivo'
    )
    location_preference = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='Preferencia de ubicación',
        help_text='Ubicación geográfica preferida'
    )
    size_preference = ArrayField(
        models.CharField(max_length=20),
        default=list,
        blank=True,
        verbose_name='Tamaño de empresa preferido'
    )

    # Configuración de matching
    num_matches = models.IntegerField(
        default=10,
        verbose_name='Número de matches',
        help_text='Número de matches deseados'
    )
    language = models.CharField(
        max_length=2,
        choices=LANGUAGE_CHOICES,
        default='es',
        verbose_name='Idioma'
    )

    # Estado
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='draft',
        verbose_name='Estado'
    )

    # Metadata
    created_by = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        related_name='challenges_created',
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
        db_table = 'challenges'
        verbose_name = 'Challenge'
        verbose_name_plural = 'Challenges'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['status']),
            models.Index(fields=['-created_at']),
        ]

    def __str__(self):
        return self.title
