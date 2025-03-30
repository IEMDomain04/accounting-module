# official_receipts/views.py
from rest_framework import generics
from .models import OfficialReceipt
from .serializers import OfficialReceiptSerializer

class OfficialReceiptListCreateView(generics.ListCreateAPIView):
    queryset = OfficialReceipt.objects.all()
    serializer_class = OfficialReceiptSerializer

class OfficialReceiptRetrieveUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = OfficialReceipt.objects.all()
    serializer_class = OfficialReceiptSerializer
    lookup_field = 'or_id'