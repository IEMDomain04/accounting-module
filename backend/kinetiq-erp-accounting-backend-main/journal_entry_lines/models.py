# journal_entry_lines/models.py
from django.db import models

class JournalEntryLine(models.Model):
    entry_line_id = models.CharField(max_length=255, primary_key=True)
    gl_account_id = models.CharField(max_length=255, null=True, blank=True)
    account_name = models.CharField(max_length=255, null=True, blank=True)
    journal_id = models.CharField(max_length=255, null=True, blank=True)
    debit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    credit_amount = models.DecimalField(max_digits=15, decimal_places=2)
    description = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        db_table = "general_ledger_jel_view"  # Match the view name
        managed = False  # Views are unmanaged by Django