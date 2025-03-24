from rest_framework import serializers
from .models import JournalEntryLine

class JournalEntryLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntryLine
        fields = '__all__'  # Include all fields in API
