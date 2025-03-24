from django.db import models
from general_ledger.models import GeneralLedgerAccount
from journal_entry.models import JournalEntry

class JournalEntryLine(models.Model):
    entry_line_id = models.AutoField(primary_key=True)
    gl_account = models.ForeignKey(GeneralLedgerAccount, on_delete=models.CASCADE, db_column="gl_accounting_id", null=True, blank=True)
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, db_column="journal_id")
    debit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    credit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "journal_entry_lines"