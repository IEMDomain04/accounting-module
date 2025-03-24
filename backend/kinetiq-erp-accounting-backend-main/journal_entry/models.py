from django.db import models

class JournalEntry(models.Model):
    journal_id = models.CharField(primary_key=True, max_length=255)
    journal_date = models.DateField(default='2025-01-01')
    description = models.CharField(max_length=255)
    total_debit = models.DecimalField(max_digits=15, decimal_places=2)
    total_credit = models.DecimalField(max_digits=15, decimal_places=2)
    invoice_id = models.CharField(max_length=255, blank=True, null=True)
    currency_id = models.CharField(max_length=255, default='1')

    class Meta:
        db_table = "journal_entries"  
        app_label = "journal_entry" 