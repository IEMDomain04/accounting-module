from rest_framework import serializers
from .models import OfficialReceipt

class OfficialReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = OfficialReceipt
        fields = '__all__'
