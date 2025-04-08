# journal_entry_lines/models.py
from django.db import models
from journal_entry.models import JournalEntry  # Import to establish ForeignKey

class JournalEntryLine(models.Model):
    entry_line_id = models.CharField(max_length=255, primary_key=True)
    gl_account_id = models.ForeignKey(
        'general_ledger.GeneralLedgerAccount',  # Reference across apps
        on_delete=models.CASCADE,
        to_field='gl_account_id',
        db_column='gl_account_id',
        null=True,
        blank=True,
        related_name='journal_lines'
    )
    journal_id = models.ForeignKey(
        JournalEntry,
        on_delete=models.CASCADE,
        to_field='journal_id',
        db_column='journal_id',
        related_name='lines'
    )
    debit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    credit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "journal_entry_lines"  # Point to the actual table
        app_label = "journal_entry"

