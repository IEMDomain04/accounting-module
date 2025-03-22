from django.urls import path
from .views import chart_of_accounts

urlpatterns = [
    path("chart-of-accounts/", chart_of_accounts, name="chart-of-accounts"),
]
