from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Category, DealOfTheDay
from .serializers import ProductSerializer, CategorySerializer, DealOfTheDaySerializer
from utils.response import generate_api_response
from core.success_codes import SuccessCodes as SC


class ProductList(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return generate_api_response(
            success=True,
            message="",
            data=serializer.data,
            code=SC.REQ_DATA_RETRIEVED.value,
            status_code=status.HTTP_200_OK
        )


class ProductDetail(APIView):
    def get_object(self, pk):
        try:
            return Product.objects.get(pk=pk)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        product = self.get_object(pk)
        serializer = ProductSerializer(product)
        return generate_api_response(
            success=True,
            message="",
            data=serializer.data,
            code=SC.REQ_DATA_RETRIEVED.value,
            status_code=status.HTTP_200_OK
        )


class CategoryList(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return generate_api_response(
            success=True,
            message="",
            data=serializer.data,
            code=SC.REQ_DATA_RETRIEVED.value,
            status_code=status.HTTP_200_OK
        )


class CategoryDetail(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)




class DealOfTheDayView(APIView):
    def get(self, request):
        deals = DealOfTheDay.objects.filter(
            is_active=True,
            start_date__lte=timezone.now(),
            end_date__gte=timezone.now()
        )
        serializer = DealOfTheDaySerializer(deals, many=True)
        return generate_api_response(
            success=True,
            message="Active deals retrieved successfully",
            data=serializer.data,
            code=SC.REQ_DATA_RETRIEVED.value,
            status_code=status.HTTP_200_OK
        )
