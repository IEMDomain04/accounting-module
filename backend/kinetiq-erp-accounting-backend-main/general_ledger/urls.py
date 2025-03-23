from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GeneralLedgerAccountViewSet

router = DefaultRouter()
router.register(r'general-ledger-accounts', GeneralLedgerAccountViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
