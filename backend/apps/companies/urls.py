"""
URL configuration for companies app
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CompanyViewSet, DocumentViewSet, CompanyProfileViewSet

router = DefaultRouter()
router.register(r'', CompanyViewSet, basename='company')
router.register(r'documents', DocumentViewSet, basename='document')
router.register(r'profiles', CompanyProfileViewSet, basename='company-profile')

urlpatterns = [
    path('', include(router.urls)),
]
