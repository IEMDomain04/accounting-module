from django.db import models

class ChartOfAccounts(models.Model):
    account_code = models.IntegerField(primary_key=True)  # account_code is primary key
    account_name = models.CharField(max_length=255)
    account_type = models.CharField(max_length=50, null=True, blank=True)  # nullable in DB

    class Meta:
        db_table = 'chart_of_accounts'
        managed = False  # Django won't manage this table

    def __str__(self):
        return self.account_name