"""
Views for companies app
"""
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.db.models import Q

from .models import Company, Document, CompanyProfile
from .serializers import CompanySerializer, DocumentSerializer, CompanyProfileSerializer
from apps.users.permissions import IsAnalystOrAdmin, ReadOnlyOrAdmin


class CompanyViewSet(viewsets.ModelViewSet):
    """ViewSet for Company model"""

    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    permission_classes = [IsAnalystOrAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'size', 'sector', 'region', 'city']
    search_fields = ['name', 'cif', 'city', 'region']
    ordering_fields = ['created_at', 'name', 'updated_at']
    ordering = ['-created_at']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

        # Crear perfil automáticamente
        company = serializer.instance
        CompanyProfile.objects.get_or_create(company=company)

    @action(detail=True, methods=['post'])
    def trigger_scraping(self, request, pk=None):
        """Inicia el proceso de scraping del sitio web"""
        company = self.get_object()

        if not company.website:
            return Response(
                {'error': 'La empresa no tiene sitio web configurado'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Importar y ejecutar task de scraping
        from .tasks import scrape_company_website
        scrape_company_website.delay(company.id)

        return Response({
            'message': 'Proceso de scraping iniciado',
            'company_id': company.id
        })

    @action(detail=True, methods=['get'])
    def export_data(self, request, pk=None):
        """Exporta todos los datos de una empresa (GDPR portability)"""
        company = self.get_object()

        data = {
            'company': CompanySerializer(company).data,
            'profile': CompanyProfileSerializer(company.profile).data if hasattr(company, 'profile') else None,
            'documents': DocumentSerializer(company.documents.all(), many=True).data,
        }

        return Response(data)


class DocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for Document model"""

    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [IsAnalystOrAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['company', 'status']
    search_fields = ['filename', 'company__name']
    ordering_fields = ['uploaded_at', 'filename']
    ordering = ['-uploaded_at']

    def perform_create(self, serializer):
        document = serializer.save(
            uploaded_by=self.request.user,
            file_size=serializer.validated_data['file'].size
        )

        # Trigger async processing
        from .tasks import process_document
        process_document.delay(document.id)

    @action(detail=True, methods=['post'])
    def reprocess(self, request, pk=None):
        """Re-procesa un documento"""
        document = self.get_object()

        from .tasks import process_document
        process_document.delay(document.id)

        return Response({
            'message': 'Re-procesamiento iniciado',
            'document_id': document.id
        })


class CompanyProfileViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for CompanyProfile model (read-only)"""

    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer
    permission_classes = [ReadOnlyOrAdmin]
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['company']
    search_fields = ['company__name', 'capabilities', 'services']
    ordering_fields = ['profile_completeness', 'last_updated_at']
    ordering = ['-profile_completeness']

    @action(detail=True, methods=['post'])
    def recalculate_completeness(self, request, pk=None):
        """Recalcula el porcentaje de completitud"""
        profile = self.get_object()
        completeness = profile.calculate_completeness()

        return Response({
            'profile_completeness': completeness
        })
