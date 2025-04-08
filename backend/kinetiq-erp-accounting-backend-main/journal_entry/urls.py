from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JournalEntryViewSet
from journal_entry_lines.views import JournalEntryLineViewSet

# Create a router and register the ViewSet
router = DefaultRouter()
router.register(r'journal-entries', JournalEntryViewSet, basename='journal-entry')
router.register(r'journal-entry-lines', JournalEntryLineViewSet, basename='journal-entry-line')

from django.db import connection
from rest_framework.views import APIView
from rest_framework.response import Response

class GeneralLedgerJELView(APIView):
    def get(self, request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM accounting.general_ledger_jel_view")
            columns = [col[0] for col in cursor.description]
            result = [dict(zip(columns, row)) for row in cursor.fetchall()]
        return Response(result)
    
# Include router URLs
urlpatterns = [
    path("", include(router.urls)),
    path("general-ledger-jel-view/", GeneralLedgerJELView.as_view(), name="general-ledger-jel-view"),
]
