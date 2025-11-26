"""
Admin configuration for matching app
"""
from django.contrib import admin
from .models import MatchingResult, Match


@admin.register(MatchingResult)
class MatchingResultAdmin(admin.ModelAdmin):
    """Admin para modelo MatchingResult"""

    list_display = ['challenge', 'status', 'total_companies_analyzed', 'execution_time_seconds', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['challenge__title']
    readonly_fields = ['created_by', 'created_at', 'completed_at']

    fieldsets = (
        ('Challenge', {
            'fields': ('challenge',)
        }),
        ('Estadísticas', {
            'fields': ('total_companies_analyzed', 'execution_time_seconds')
        }),
        ('Estado', {
            'fields': ('status', 'error_message')
        }),
        ('Configuración', {
            'fields': ('config_snapshot',)
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'completed_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    """Admin para modelo Match"""

    list_display = ['result', 'company', 'rank', 'overall_score', 'confidence_level']
    list_filter = ['confidence_level', 'rank']
    search_fields = ['company__name', 'result__challenge__title']
    readonly_fields = ['created_at']

    fieldsets = (
        ('Match', {
            'fields': ('result', 'company', 'rank')
        }),
        ('Scores', {
            'fields': ('overall_score', 'score_technical_relevance',
                      'score_sector_experience', 'score_track_record')
        }),
        ('Explicación', {
            'fields': ('explanation', 'highlights', 'confidence_level')
        }),
        ('Trazabilidad', {
            'fields': ('decision_log',),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )
