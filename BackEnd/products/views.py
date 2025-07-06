from django.shortcuts import render
from .models import Product
from .serializer import ProductSerializer, NewArrivalsProductSerializer, TopSellingProductSerializer
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    @action(detail=False, methods=['get'])
    def new_arrivals(self, request):
        products = Product.objects.order_by('-id')[:10]
        serializer = NewArrivalsProductSerializer(products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def top_selling(self, request):
        products = Product.objects.order_by('stock')[:10]
        serializer = TopSellingProductSerializer(products, many=True)
        return Response(serializer.data)
