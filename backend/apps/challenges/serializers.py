"""
Serializers for challenges app
"""
from rest_framework import serializers
from .models import Challenge


class ChallengeSerializer(serializers.ModelSerializer):
    """Serializer for Challenge model"""

    class Meta:
        model = Challenge
        fields = '__all__'
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']
