"""
User models
"""
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    """Usuario extendido del sistema"""

    ROLE_CHOICES = [
        ('admin', 'Administrador'),
        ('analyst', 'Analista'),
        ('viewer', 'Visualizador'),
    ]

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default='viewer',
        verbose_name='Rol'
    )
    phone = models.CharField(
        max_length=20,
        blank=True,
        verbose_name='Teléfono'
    )
    organization = models.CharField(
        max_length=200,
        blank=True,
        verbose_name='Organización'
    )

    class Meta:
        db_table = 'users'
        verbose_name = 'Usuario'
        verbose_name_plural = 'Usuarios'
        ordering = ['-date_joined']

    def __str__(self):
        return f"{self.get_full_name() or self.username} ({self.get_role_display()})"

    @property
    def is_admin(self):
        return self.role == 'admin'

    @property
    def is_analyst(self):
        return self.role in ['admin', 'analyst']


class AuditLog(models.Model):
    """Log de acciones críticas para auditoría"""

    ACTION_CHOICES = [
        ('COMPANY_CREATED', 'Empresa Creada'),
        ('COMPANY_UPDATED', 'Empresa Actualizada'),
        ('COMPANY_DELETED', 'Empresa Eliminada'),
        ('DOCUMENT_UPLOADED', 'Documento Subido'),
        ('DOCUMENT_ACCESSED', 'Documento Accedido'),
        ('CHALLENGE_CREATED', 'Challenge Creado'),
        ('MATCHING_EXECUTED', 'Matching Ejecutado'),
        ('USER_LOGIN', 'Login de Usuario'),
        ('USER_LOGOUT', 'Logout de Usuario'),
        ('PERMISSION_CHANGED', 'Permiso Cambiado'),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        verbose_name='Usuario'
    )
    action = models.CharField(
        max_length=50,
        choices=ACTION_CHOICES,
        verbose_name='Acción'
    )
    resource_type = models.CharField(
        max_length=50,
        blank=True,
        verbose_name='Tipo de recurso'
    )
    resource_id = models.IntegerField(
        null=True,
        blank=True,
        verbose_name='ID de recurso'
    )
    details = models.JSONField(
        default=dict,
        blank=True,
        verbose_name='Detalles'
    )
    ip_address = models.GenericIPAddressField(
        null=True,
        blank=True,
        verbose_name='Dirección IP'
    )
    user_agent = models.CharField(
        max_length=255,
        blank=True,
        verbose_name='User Agent'
    )
    timestamp = models.DateTimeField(
        default=timezone.now,
        verbose_name='Fecha y hora'
    )

    class Meta:
        db_table = 'audit_logs'
        verbose_name = 'Log de Auditoría'
        verbose_name_plural = 'Logs de Auditoría'
        ordering = ['-timestamp']
        indexes = [
            models.Index(fields=['-timestamp']),
            models.Index(fields=['user', '-timestamp']),
            models.Index(fields=['action']),
        ]

    def __str__(self):
        return f"{self.get_action_display()} - {self.user} - {self.timestamp}"
