from django.db import models
from journal_entry.models import JournalEntry
from general_ledger.models import GeneralLedgerAccount

class JournalEntryLine(models.Model):
    entry_line_id = models.AutoField(primary_key=True)
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, db_column="journal_id")
    gl_account = models.ForeignKey(GeneralLedgerAccount, on_delete=models.CASCADE, db_column="gl_account_id", null=True, blank=True)
    debit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    credit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "accounting.journal_entry_lines"  # Include schema if needed
        app_label = "journal_entry"
