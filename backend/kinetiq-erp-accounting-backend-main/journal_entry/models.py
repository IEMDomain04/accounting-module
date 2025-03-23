from django.db import models

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