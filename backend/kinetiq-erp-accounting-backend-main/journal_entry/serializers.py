from rest_framework import serializers
from .models import JournalEntry

class JournalEntryLineSerializer(serializers.Serializer):
    entry_line_id = serializers.CharField(max_length=255)
    gl_account_id = serializers.CharField(max_length=255, allow_null=True)
    debit_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    credit_amount = serializers.DecimalField(max_digits=15, decimal_places=2)
    description = serializers.CharField(max_length=255, allow_null=True)

class JournalEntrySerializer(serializers.ModelSerializer):
    transactions = JournalEntryLineSerializer(many=True, required=False)

    class Meta:
        model = JournalEntry
        fields = ['journal_id', 'journal_date', 'description', 'total_debit', 'total_credit', 'invoice_id', 'currency_id', 'transactions']

    def update(self, instance, validated_data):
        transactions = validated_data.pop('transactions', [])
        instance = super().update(instance, validated_data)
        # Custom logic to handle transactions (e.g., update a separate table)
        return instance
