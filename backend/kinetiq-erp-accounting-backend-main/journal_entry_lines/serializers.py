# serializers.py
from rest_framework import serializers
from .models import JournalEntryLine

class JournalEntryLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntryLine
        fields = ['entry_line_id', 'journal_entry', 'gl_account', 'debit_amount', 'credit_amount', 'description']
        # Optionally, make entry_line_id read-only since it's an AutoField
        read_only_fields = ['entry_line_id']