from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryLineViewSet

router = DefaultRouter()
router.register(r'journal-entry-lines', JournalEntryLineViewSet)

urlpatterns = [
    path('', include(router.urls)),
]