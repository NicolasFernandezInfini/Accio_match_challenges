"""
Admin configuration for challenges app
"""
from django.contrib import admin
from .models import Challenge


@admin.register(Challenge)
class ChallengeAdmin(admin.ModelAdmin):
    """Admin para modelo Challenge"""

    list_display = ['title', 'type', 'status', 'created_by', 'created_at']
    list_filter = ['status', 'type', 'language', 'created_at']
    search_fields = ['title', 'description', 'topic']
    readonly_fields = ['created_by', 'created_at', 'updated_at']

    fieldsets = (
        ('Información Básica', {
            'fields': ('title', 'description', 'type', 'topic', 'status')
        }),
        ('Organización Solicitante', {
            'fields': ('requesting_org', 'contact_person', 'contact_email')
        }),
        ('Requisitos Técnicos', {
            'fields': ('requirements', 'required_capabilities')
        }),
        ('Preferencias de Matching', {
            'fields': ('sector_target', 'location_preference', 'size_preference')
        }),
        ('Configuración', {
            'fields': ('num_matches', 'language')
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
