"""
Views for challenges app
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Challenge
from .serializers import ChallengeSerializer
from apps.users.permissions import IsAnalystOrAdmin


class ChallengeViewSet(viewsets.ModelViewSet):
    """ViewSet for Challenge model"""

    queryset = Challenge.objects.all()
    serializer_class = ChallengeSerializer
    permission_classes = [IsAnalystOrAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'type', 'language']
    search_fields = ['title', 'description', 'topic']
    ordering_fields = ['created_at', 'title']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def execute_matching(self, request, pk=None):
        """Ejecuta el proceso de matchmaking"""
        challenge = self.get_object()

        if challenge.status == 'matching':
            return Response(
                {'error': 'El matching ya está en proceso'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Actualizar estado
        challenge.status = 'matching'
        challenge.save()

        # Iniciar task de matching
        from apps.matching.tasks import execute_matching_task
        execute_matching_task.delay(challenge.id, request.user.id)

        return Response({
            'message': 'Proceso de matching iniciado',
            'challenge_id': challenge.id
        })

    @action(detail=True, methods=['get'])
    def results(self, request, pk=None):
        """Obtiene los resultados del matching"""
        challenge = self.get_object()

        latest_result = challenge.matching_results.filter(
            status='completed'
        ).order_by('-created_at').first()

        if not latest_result:
            return Response(
                {'message': 'No hay resultados disponibles'},
                status=status.HTTP_404_NOT_FOUND
            )

        from apps.matching.serializers import MatchingResultSerializer
        serializer = MatchingResultSerializer(latest_result)
        return Response(serializer.data)
