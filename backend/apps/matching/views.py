"""
Views for matching app
"""
from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter

from .models import MatchingResult, Match
from .serializers import MatchingResultSerializer, MatchSerializer
from apps.users.permissions import IsAnalystOrAdmin


class MatchingResultViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for MatchingResult model"""

    queryset = MatchingResult.objects.all()
    serializer_class = MatchingResultSerializer
    permission_classes = [IsAnalystOrAdmin]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['challenge', 'status']
    ordering_fields = ['created_at']
    ordering = ['-created_at']


class MatchViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for Match model"""

    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [IsAnalystOrAdmin]
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['result', 'company']
    ordering_fields = ['rank', 'overall_score']
    ordering = ['rank']
