from django.db import models
from general_ledger.models import GeneralLedgerAccount

class JournalEntry(models.Model):
    journal_id = models.AutoField(primary_key=True)
    journal_date = models.DateField(default='2025-01-01')
    description = models.TextField()
    total_debit = models.DecimalField(max_digits=15, decimal_places=2)
    total_credit = models.DecimalField(max_digits=15, decimal_places=2)
    invoice_id = models.IntegerField(blank=True, null=True)
    currency_id = models.IntegerField()

    class Meta:
        db_table = "journal_entries"  
        app_label = "journal_entry" 

class JournalEntryLine(models.Model):
    entry_line_id = models.AutoField(primary_key=True)
    journal_entry = models.ForeignKey(JournalEntry, on_delete=models.CASCADE, db_column="journal_id")
    gl_account = models.ForeignKey(GeneralLedgerAccount, on_delete=models.CASCADE, db_column="gl_account_id", null=True, blank=True)
    debit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    credit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "journal_entry_lines" 
        app_label = "journal_entry"
