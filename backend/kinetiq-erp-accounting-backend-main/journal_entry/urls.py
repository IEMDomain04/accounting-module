from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet

# Create a router and register the ViewSet
router = DefaultRouter()
router.register(r'journal-entries', JournalEntryViewSet, basename='journal-entry')

# Include router URLs
urlpatterns = [
    path("", include(router.urls)),
]
