"""
Admin configuration for ai_services app
"""
from django.contrib import admin
from django.db.models import Sum
from .models import AIRequest


@admin.register(AIRequest)
class AIRequestAdmin(admin.ModelAdmin):
    """Admin para modelo AIRequest"""

    list_display = ['request_type', 'status', 'model_used', 'prompt_tokens',
                    'response_tokens', 'estimated_cost', 'execution_time_ms', 'created_at']
    list_filter = ['request_type', 'status', 'created_at']
    search_fields = ['company__name', 'challenge__title']
    readonly_fields = ['created_at', 'prompt', 'response', 'prompt_tokens',
                      'response_tokens', 'estimated_cost', 'execution_time_ms']

    fieldsets = (
        ('Request', {
            'fields': ('request_type', 'company', 'challenge', 'status')
        }),
        ('Prompt', {
            'fields': ('prompt', 'prompt_tokens'),
            'classes': ('collapse',)
        }),
        ('Response', {
            'fields': ('response', 'response_tokens'),
            'classes': ('collapse',)
        }),
        ('Metadata', {
            'fields': ('model_used', 'execution_time_ms', 'estimated_cost', 'created_at')
        }),
        ('Error', {
            'fields': ('error_message',),
            'classes': ('collapse',)
        }),
    )

    def changelist_view(self, request, extra_context=None):
        """Agrega estadísticas de costos al listado"""
        from datetime import timedelta
        from django.utils import timezone

        extra_context = extra_context or {}

        # Costo total del último mes
        last_month = timezone.now() - timedelta(days=30)
        total_cost_month = AIRequest.objects.filter(
            created_at__gte=last_month
        ).aggregate(total=Sum('estimated_cost'))['total'] or 0

        # Costo total de todos los tiempos
        total_cost_all = AIRequest.objects.aggregate(
            total=Sum('estimated_cost')
        )['total'] or 0

        # Total de requests por tipo
        requests_by_type = AIRequest.objects.values('request_type').annotate(
            count=models.Count('id')
        )

        extra_context['total_cost_month'] = f"${total_cost_month:.2f}"
        extra_context['total_cost_all'] = f"${total_cost_all:.2f}"
        extra_context['requests_by_type'] = requests_by_type

        return super().changelist_view(request, extra_context)

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return False
