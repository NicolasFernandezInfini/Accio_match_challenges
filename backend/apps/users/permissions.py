"""
Custom permissions for RBAC
"""
from rest_framework import permissions


class IsAdmin(permissions.BasePermission):
    """Solo administradores"""

    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'


class IsAnalystOrAdmin(permissions.BasePermission):
    """Analistas y administradores"""

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated and
            request.user.role in ['analyst', 'admin']
        )


class ReadOnlyOrAdmin(permissions.BasePermission):
    """Lectura para todos autenticados, escritura solo admin"""

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return request.user.is_authenticated
        return request.user.is_authenticated and request.user.role == 'admin'


class IsOwnerOrAdmin(permissions.BasePermission):
    """Solo el propietario o admin puede editar"""

    def has_object_permission(self, request, view, obj):
        if request.user.role == 'admin':
            return True

        # Para lectura, cualquier autenticado
        if request.method in permissions.SAFE_METHODS:
            return True

        # Para escritura, solo el creador
        if hasattr(obj, 'created_by'):
            return obj.created_by == request.user

        return False
