from django.db import models

class GeneralLedgerAccount(models.Model):
    gl_account_id = models.AutoField(primary_key=True)
    account_name = models.CharField(max_length=255)
    account_code = models.IntegerField()
    account_id = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "general_ledger_accounts"
        app_label = "general_ledger"

