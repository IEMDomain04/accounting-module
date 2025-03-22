from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import IntegrityError
from .models import ChartOfAccounts
from .serializers import ChartOfAccountsSerializer

@api_view(['GET', 'POST'])
def chart_of_accounts(request):
    if request.method == 'GET':
        return Response(ChartOfAccountsSerializer(ChartOfAccounts.objects.all(), many=True).data)

    # Handle POST with single check via database
    serializer = ChartOfAccountsSerializer(data=request.data)
    try:
        serializer.is_valid(raise_exception=True)  # Validate data
        serializer.save()  # Attempt to save; database will reject duplicates
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    except IntegrityError:  # Catch duplicate account_code or other DB errors
        return Response({"error": "Account code already exists"}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:  # Catch validation/serialization errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)