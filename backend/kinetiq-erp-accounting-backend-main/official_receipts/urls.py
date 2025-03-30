# official_receipts/urls.py
from django.urls import path
from .views import OfficialReceiptListCreateView, OfficialReceiptRetrieveUpdateDeleteView

urlpatterns = [
    path('official-receipts/', OfficialReceiptListCreateView.as_view()),
    path('official-receipts/<str:or_id>/', OfficialReceiptRetrieveUpdateDeleteView.as_view()),
]