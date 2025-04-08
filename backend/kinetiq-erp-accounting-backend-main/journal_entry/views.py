# journal_entry/views.py
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import JournalEntry
from .serializers import JournalEntrySerializer

class JournalEntryViewSet(viewsets.ModelViewSet):
    queryset = JournalEntry.objects.all()
    serializer_class = JournalEntrySerializer
    lookup_field = 'journal_id'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)  # Handle PATCH vs PUT
        instance = self.get_object()  # Get the JournalEntry instance
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)