from rest_framework import serializers
from .models import GeneralLedgerAccount

class GeneralLedgerAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralLedgerAccount
        fields = '__all__'  # This ensures all fields are included in the API response
