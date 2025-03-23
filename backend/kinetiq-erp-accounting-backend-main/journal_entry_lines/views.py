from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import JournalEntryLine
from .serializers import JournalEntryLineSerializer

class JournalEntryLineViewSet(viewsets.ModelViewSet):
    queryset = JournalEntryLine.objects.all()
    serializer_class = JournalEntryLineSerializer

    def create(self, request, *args, **kwargs):
        # Check if the request data is a list (bulk creation)
        if isinstance(request.data, list):
            serializer = self.get_serializer(data=request.data, many=True)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        # Fallback to single object creation
        return super().create(request, *args, **kwargs)