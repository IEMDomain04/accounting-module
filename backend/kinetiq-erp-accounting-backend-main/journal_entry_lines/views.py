from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from .models import JournalEntryLine
from .serializers import JournalEntryLineSerializer

class JournalEntryLineViewSet(viewsets.ModelViewSet):
    queryset = JournalEntryLine.objects.all()
    serializer_class = JournalEntryLineSerializer
    lookup_field = 'entry_line_id'

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)