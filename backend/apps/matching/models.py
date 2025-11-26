"""
Matching models
"""
from django.db import models
from django.utils import timezone


class MatchingResult(models.Model):
    """Resultado de un proceso de matching"""

    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('processing', 'Procesando'),
        ('completed', 'Completado'),
        ('failed', 'Fallido'),
    ]

    challenge = models.ForeignKey(
        'challenges.Challenge',
        on_delete=models.CASCADE,
        related_name='matching_results',
        verbose_name='Challenge'
    )

    # Estadísticas del proceso
    total_companies_analyzed = models.IntegerField(
        default=0,
        verbose_name='Total de empresas analizadas'
    )
    execution_time_seconds = models.IntegerField(
        default=0,
        verbose_name='Tiempo de ejecución',
        help_text='Tiempo de ejecución en segundos'
    )

    # Configuración utilizada
    config_snapshot = models.JSONField(
        default=dict,
        verbose_name='Configuración utilizada',
        help_text='Snapshot de la configuración del challenge'
    )

    # Estado
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name='Estado'
    )
    error_message = models.TextField(
        blank=True,
        verbose_name='Mensaje de error'
    )

    # Metadata
    created_by = models.ForeignKey(
        'users.User',
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Creado por'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de creación'
    )
    completed_at = models.DateTimeField(
        null=True,
        blank=True,
        verbose_name='Fecha de finalización'
    )

    class Meta:
        db_table = 'matching_results'
        verbose_name = 'Resultado de Matching'
        verbose_name_plural = 'Resultados de Matching'
        ordering = ['-created_at']

    def __str__(self):
        return f"Matching: {self.challenge.title} - {self.created_at.strftime('%Y-%m-%d')}"


class Match(models.Model):
    """Match individual entre un challenge y una empresa"""

    CONFIDENCE_CHOICES = [
        ('low', 'Bajo'),
        ('medium', 'Medio'),
        ('high', 'Alto'),
    ]

    result = models.ForeignKey(
        MatchingResult,
        on_delete=models.CASCADE,
        related_name='matches',
        verbose_name='Resultado'
    )
    company = models.ForeignKey(
        'companies.Company',
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name='Empresa'
    )

    # Ranking
    rank = models.IntegerField(
        verbose_name='Posición',
        help_text='Posición en el ranking (1-10)'
    )

    # Scores
    overall_score = models.FloatField(
        verbose_name='Score global',
        help_text='Score global (0-100)'
    )

    score_technical_relevance = models.FloatField(
        default=0,
        verbose_name='Relevancia técnica',
        help_text='Relevancia técnica (0-100)'
    )
    score_sector_experience = models.FloatField(
        default=0,
        verbose_name='Experiencia sectorial',
        help_text='Experiencia sectorial (0-100)'
    )
    score_track_record = models.FloatField(
        default=0,
        verbose_name='Track record',
        help_text='Track record (0-100)'
    )

    # Explicación generada por IA
    explanation = models.TextField(
        verbose_name='Explicación',
        help_text='Explicación detallada del match'
    )

    highlights = models.JSONField(
        default=list,
        verbose_name='Puntos clave',
        help_text='3-5 puntos clave del match'
    )

    confidence_level = models.CharField(
        max_length=10,
        choices=CONFIDENCE_CHOICES,
        default='medium',
        verbose_name='Nivel de confianza'
    )

    # Trazabilidad
    decision_log = models.JSONField(
        default=dict,
        blank=True,
        verbose_name='Log de decisión',
        help_text='Log de la evaluación de la IA'
    )

    # Metadata
    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de creación'
    )

    class Meta:
        db_table = 'matches'
        verbose_name = 'Match'
        verbose_name_plural = 'Matches'
        ordering = ['result', 'rank']
        unique_together = ['result', 'rank']

    def __str__(self):
        company_name = self.company.name if self.company else '[ELIMINADA]'
        return f"Match #{self.rank}: {company_name} ({self.overall_score:.1f})"
