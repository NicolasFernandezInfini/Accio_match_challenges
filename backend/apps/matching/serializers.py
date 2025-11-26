"""
Serializers for matching app
"""
from rest_framework import serializers
from .models import MatchingResult, Match
from apps.companies.serializers import CompanySerializer


class MatchSerializer(serializers.ModelSerializer):
    """Serializer for Match model"""

    company_details = CompanySerializer(source='company', read_only=True)

    class Meta:
        model = Match
        fields = '__all__'
        read_only_fields = ['id', 'created_at']


class MatchingResultSerializer(serializers.ModelSerializer):
    """Serializer for MatchingResult model"""

    matches = MatchSerializer(many=True, read_only=True)
    challenge_title = serializers.CharField(source='challenge.title', read_only=True)

    class Meta:
        model = MatchingResult
        fields = '__all__'
        read_only_fields = ['id', 'created_by', 'created_at', 'completed_at']
