from rest_framework import serializers
from .models import ChartOfAccounts  # Ensure this model exists

class ChartOfAccountsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChartOfAccounts
        fields = '__all__'
