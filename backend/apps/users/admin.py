"""
Admin configuration for users app
"""
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, AuditLog


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Admin para modelo User extendido"""

    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'date_joined']
    list_filter = ['role', 'is_active', 'is_staff', 'date_joined']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'organization']

    fieldsets = BaseUserAdmin.fieldsets + (
        ('Información Adicional', {
            'fields': ('role', 'phone', 'organization')
        }),
    )

    add_fieldsets = BaseUserAdmin.add_fieldsets + (
        ('Información Adicional', {
            'fields': ('role', 'phone', 'organization')
        }),
    )


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    """Admin para logs de auditoría"""

    list_display = ['timestamp', 'user', 'action', 'resource_type', 'resource_id', 'ip_address']
    list_filter = ['action', 'timestamp']
    search_fields = ['user__username', 'user__email', 'ip_address']
    readonly_fields = ['timestamp', 'user', 'action', 'resource_type', 'resource_id',
                      'details', 'ip_address', 'user_agent']

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        # Solo admins pueden borrar logs
        return request.user.is_superuser

    def has_change_permission(self, request, obj=None):
        return False
