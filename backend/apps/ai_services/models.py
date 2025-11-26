"""
AI Services models
"""
from django.db import models
from django.utils import timezone


class AIRequest(models.Model):
    """Log de requests a Claude API para auditoría y debugging"""

    TYPE_CHOICES = [
        ('document_analysis', 'Análisis de Documento'),
        ('web_scraping', 'Web Scraping'),
        ('company_evaluation', 'Evaluación de Empresa'),
        ('other', 'Otro'),
    ]

    # Tipo de request
    request_type = models.CharField(
        max_length=50,
        choices=TYPE_CHOICES,
        verbose_name='Tipo de request'
    )

    # Contexto
    company = models.ForeignKey(
        'companies.Company',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Empresa'
    )
    challenge = models.ForeignKey(
        'challenges.Challenge',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        verbose_name='Challenge'
    )

    # Request
    prompt = models.TextField(
        verbose_name='Prompt',
        help_text='Prompt enviado a Claude'
    )
    prompt_tokens = models.IntegerField(
        default=0,
        verbose_name='Tokens del prompt'
    )

    # Response
    response = models.TextField(
        blank=True,
        verbose_name='Respuesta'
    )
    response_tokens = models.IntegerField(
        default=0,
        verbose_name='Tokens de la respuesta'
    )

    # Metadata
    model_used = models.CharField(
        max_length=100,
        default='claude-3-5-sonnet-20241022',
        verbose_name='Modelo utilizado'
    )
    execution_time_ms = models.IntegerField(
        default=0,
        verbose_name='Tiempo de ejecución (ms)'
    )
    status = models.CharField(
        max_length=20,
        default='success',
        verbose_name='Estado'
    )
    error_message = models.TextField(
        blank=True,
        verbose_name='Mensaje de error'
    )

    # Costos estimados (en USD)
    estimated_cost = models.DecimalField(
        max_digits=10,
        decimal_places=6,
        default=0,
        verbose_name='Costo estimado (USD)'
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Fecha de creación'
    )

    class Meta:
        db_table = 'ai_requests'
        verbose_name = 'Request de IA'
        verbose_name_plural = 'Requests de IA'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['-created_at']),
            models.Index(fields=['request_type']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"{self.get_request_type_display()} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"
