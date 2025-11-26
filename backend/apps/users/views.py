"""
Views for users app
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import User, AuditLog
from .serializers import UserSerializer, UserCreateSerializer, AuditLogSerializer
from .permissions import IsAdmin, IsAnalystOrAdmin


class UserViewSet(viewsets.ModelViewSet):
    """ViewSet for User model"""

    queryset = User.objects.all()
    permission_classes = [IsAnalystOrAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['role', 'is_active']
    search_fields = ['username', 'email', 'first_name', 'last_name', 'organization']
    ordering_fields = ['date_joined', 'username', 'email']
    ordering = ['-date_joined']

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        """
        Solo admins pueden crear, actualizar o eliminar usuarios
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAdmin()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Obtiene el usuario actual"""
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def change_role(self, request, pk=None):
        """Cambia el rol de un usuario (solo admin)"""
        user = self.get_object()
        new_role = request.data.get('role')

        if new_role not in dict(User.ROLE_CHOICES):
            return Response(
                {'error': 'Rol inválido'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user.role = new_role
        user.save()

        # Log de auditoría
        AuditLog.objects.create(
            user=request.user,
            action='PERMISSION_CHANGED',
            resource_type='User',
            resource_id=user.id,
            details={'new_role': new_role}
        )

        serializer = self.get_serializer(user)
        return Response(serializer.data)


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for AuditLog model (read-only)"""

    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [IsAnalystOrAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['action', 'user', 'resource_type']
    search_fields = ['user__username', 'ip_address']
    ordering_fields = ['timestamp']
    ordering = ['-timestamp']
