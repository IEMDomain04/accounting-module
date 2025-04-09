from rest_framework import serializers
from journal_entry.models import JournalEntry
from journal_entry_lines.models import JournalEntryLine
from django.db.models import Max
from datetime import datetime

class JournalEntryLineSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalEntryLine
        fields = ['entry_line_id', 'gl_account_id', 'journal_id', 'debit_amount', 'credit_amount', 'description']
        read_only_fields = ['entry_line_id']  # Make it read-only

class JournalEntrySerializer(serializers.ModelSerializer):
    transactions = JournalEntryLineSerializer(many=True, required=False)

    class Meta:
        model = JournalEntry
        fields = ['journal_id', 'journal_date', 'description', 'total_debit', 'total_credit', 'invoice_id', 'currency_id', 'transactions']

    def update(self, instance, validated_data):
        # Update JournalEntry fields
        instance.journal_date = validated_data.get('journal_date', instance.journal_date)
        instance.description = validated_data.get('description', instance.description)
        instance.total_debit = validated_data.get('total_debit', instance.total_debit)
        instance.total_credit = validated_data.get('total_credit', instance.total_credit)
        instance.invoice_id = validated_data.get('invoice_id', instance.invoice_id)
        instance.currency_id = validated_data.get('currency_id', instance.currency_id)
        instance.save()

        # Handle transactions
        transactions_data = validated_data.pop('transactions', [])
        # Delete existing lines for this journal_id
        JournalEntryLine.objects.filter(journal_id=instance.journal_id).delete()

        # Generate new entry_line_id values
        current_year = datetime.now().year
        latest_id = JournalEntryLine.objects.filter(
            entry_line_id__startswith=f'ACC-JEL-{current_year}-XZ'
        ).aggregate(Max('entry_line_id'))['entry_line_id__max']
        last_num = int(latest_id.split('-XZ')[1]) if latest_id else 0

        # Create new transaction lines with generated entry_line_id
        for idx, transaction in enumerate(transactions_data, start=1):
             entry_line_id = f'ACC-JEL-{current_year}-XZ{(last_num + idx):04d}'
             JournalEntryLine.objects.create(
                 entry_line_id=entry_line_id,
                 gl_account_id=transaction['gl_account_id'],
                 journal_id=instance,  # ForeignKey instance, not string
                 debit_amount=transaction['debit_amount'],
                 credit_amount=transaction['credit_amount'],
                 description=transaction['description']
            )
        return instance