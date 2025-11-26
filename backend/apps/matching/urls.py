"""
URL configuration for matching app
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MatchingResultViewSet, MatchViewSet

router = DefaultRouter()
router.register(r'results', MatchingResultViewSet, basename='matching-result')
router.register(r'matches', MatchViewSet, basename='match')

urlpatterns = [
    path('', include(router.urls)),
]
