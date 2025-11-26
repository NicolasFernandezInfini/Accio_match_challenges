"""
Serializers for companies app
"""
from rest_framework import serializers
from django.core.validators import FileExtensionValidator
from .models import Company, Document, CompanyProfile


class CompanySerializer(serializers.ModelSerializer):
    """Serializer for Company model"""

    profile_completeness = serializers.SerializerMethodField()
    documents_count = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = [
            'id', 'name', 'cif', 'website', 'sector', 'size',
            'address', 'city', 'region', 'country', 'contacts',
            'context_input', 'status', 'data_processing_consent',
            'consent_date', 'privacy_notice_accepted',
            'created_by', 'created_at', 'updated_at',
            'profile_completeness', 'documents_count'
        ]
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

    def get_profile_completeness(self, obj):
        if hasattr(obj, 'profile'):
            return obj.profile.profile_completeness
        return 0

    def get_documents_count(self, obj):
        return obj.documents.count()


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for Document model"""

    file = serializers.FileField(
        validators=[FileExtensionValidator(allowed_extensions=['pdf'])]
    )

    class Meta:
        model = Document
        fields = [
            'id', 'company', 'filename', 'file', 'file_size',
            'status', 'extracted_text', 'processed_data',
            'processing_error', 'uploaded_by', 'uploaded_at',
            'processed_at'
        ]
        read_only_fields = [
            'id', 'file_size', 'status', 'extracted_text',
            'processed_data', 'processing_error', 'uploaded_by',
            'uploaded_at', 'processed_at'
        ]

    def validate_file(self, value):
        # Validar tamaño
        if value.size > 10 * 1024 * 1024:  # 10 MB
            raise serializers.ValidationError(
                "El archivo no puede superar los 10 MB"
            )
        return value


class CompanyProfileSerializer(serializers.ModelSerializer):
    """Serializer for CompanyProfile model"""

    company_name = serializers.CharField(source='company.name', read_only=True)

    class Meta:
        model = CompanyProfile
        fields = [
            'id', 'company', 'company_name', 'capabilities', 'services',
            'sectors_experience', 'case_studies', 'web_summary',
            'profile_completeness', 'ai_generated_tags',
            'last_scraped_at', 'scraping_status',
            'last_updated_at', 'created_at'
        ]
        read_only_fields = [
            'id', 'profile_completeness', 'last_scraped_at',
            'scraping_status', 'last_updated_at', 'created_at'
        ]
