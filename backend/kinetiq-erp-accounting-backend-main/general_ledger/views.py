from rest_framework import viewsets
from .models import GeneralLedgerAccount
from .serializers import GeneralLedgerAccountSerializer

class GeneralLedgerAccountViewSet(viewsets.ModelViewSet):
    queryset = GeneralLedgerAccount.objects.all()
    serializer_class = GeneralLedgerAccountSerializer
