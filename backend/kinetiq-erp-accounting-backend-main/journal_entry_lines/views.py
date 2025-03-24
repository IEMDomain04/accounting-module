from rest_framework import viewsets
from .models import JournalEntryLine
from .serializers import JournalEntryLineSerializer

class JournalEntryLineViewSet(viewsets.ModelViewSet):
    queryset = JournalEntryLine.objects.all()
    serializer_class = JournalEntryLineSerializer