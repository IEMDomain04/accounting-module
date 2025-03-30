# official_receipts/models.py
from django.db import models

class OfficialReceipt(models.Model):
    or_id = models.CharField(max_length=255, primary_key=True)
    invoice_id = models.CharField(max_length=255)
    customer_id = models.CharField(max_length=255)
    or_date = models.DateField()
    settled_amount = models.DecimalField(max_digits=10, decimal_places=2)  # Added missing field
    remaining_amount = models.DecimalField(max_digits=15, decimal_places=2)
    payment_method = models.CharField(max_length=50)
    reference_number = models.CharField(max_length=100, blank=True, null=True)
    created_by = models.CharField(max_length=255)

    class Meta:
        db_table = "official_receipts"  # Matches your assumed table name
        app_label = "official_receipts"  # Adjust based on your app name

    def __str__(self):
        return f"OR {self.or_id} - {self.customer_id}"