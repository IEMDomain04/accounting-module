from rest_framework import viewsets
from .models import JournalEntry  # Ensure this is correct
from .serializers import JournalEntrySerializer  # Ensure this is correct

class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    lookup_field = 'journal_id'
