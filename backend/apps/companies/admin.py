"""
Admin configuration for companies app
"""
from django.contrib import admin
from .models import Company, Document, CompanyProfile


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    """Admin para modelo Company"""

    list_display = ['name', 'cif', 'size', 'city', 'region', 'status', 'created_at']
    list_filter = ['status', 'size', 'region', 'created_at']
    search_fields = ['name', 'cif', 'city', 'website']
    readonly_fields = ['created_by', 'created_at', 'updated_at']

    fieldsets = (
        ('Información Básica', {
            'fields': ('name', 'cif', 'website', 'status')
        }),
        ('Clasificación', {
            'fields': ('sector', 'size')
        }),
        ('Ubicación', {
            'fields': ('address', 'city', 'region', 'country')
        }),
        ('Contactos y Contexto', {
            'fields': ('contacts', 'context_input')
        }),
        ('GDPR', {
            'fields': ('data_processing_consent', 'consent_date', 'privacy_notice_accepted')
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    """Admin para modelo Document"""

    list_display = ['filename', 'company', 'status', 'file_size', 'uploaded_at']
    list_filter = ['status', 'uploaded_at']
    search_fields = ['filename', 'company__name']
    readonly_fields = ['uploaded_by', 'uploaded_at', 'processed_at', 'file_size']

    fieldsets = (
        ('Información del Documento', {
            'fields': ('company', 'filename', 'file', 'file_size')
        }),
        ('Procesamiento', {
            'fields': ('status', 'extracted_text', 'processed_data', 'processing_error')
        }),
        ('Metadata', {
            'fields': ('uploaded_by', 'uploaded_at', 'processed_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(CompanyProfile)
class CompanyProfileAdmin(admin.ModelAdmin):
    """Admin para modelo CompanyProfile"""

    list_display = ['company', 'profile_completeness', 'last_scraped_at', 'last_updated_at']
    list_filter = ['profile_completeness', 'last_scraped_at']
    search_fields = ['company__name', 'capabilities', 'services']
    readonly_fields = ['profile_completeness', 'last_scraped_at', 'last_updated_at', 'created_at']

    fieldsets = (
        ('Empresa', {
            'fields': ('company', 'profile_completeness')
        }),
        ('Capacidades y Servicios', {
            'fields': ('capabilities', 'services', 'sectors_experience')
        }),
        ('Casos de Éxito', {
            'fields': ('case_studies',)
        }),
        ('Web Scraping', {
            'fields': ('web_summary', 'last_scraped_at', 'scraping_status')
        }),
        ('IA', {
            'fields': ('ai_generated_tags',)
        }),
        ('Metadata', {
            'fields': ('last_updated_at', 'created_at'),
            'classes': ('collapse',)
        }),
    )
