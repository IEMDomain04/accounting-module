from django.db import models

class GeneralLedgerAccount(models.Model):
    gl_account_id = models.CharField(primary_key=True, max_length=255)
    account_name = models.CharField(max_length=255)
    account_code = models.CharField(max_length=255)
    account_id = models.CharField(max_length=255, null=True, blank=True)
    status = models.CharField(max_length=50)  # Assuming status_enum is handled as a CharField
    created_at = models.DateTimeField()

    class Meta:
        db_table = "general_ledger_accounts"
        app_label = "general_ledger"
