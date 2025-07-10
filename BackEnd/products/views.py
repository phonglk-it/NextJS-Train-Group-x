from django.shortcuts import render
from .models import Product
from .serializer import ProductSerializer
from rest_framework import viewsets

# Create your views here.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all() # type: ignore
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        color = self.request.query_params.get('color')
        size = self.request.query_params.get('size')
        dress_style = self.request.query_params.get('dress_style')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if category:
            queryset = queryset.filter(category__name__iexact=category)
        if color:
            queryset = queryset.filter(color__icontains=color)
        if size:
            queryset = queryset.filter(size__icontains=size)
        if dress_style:
            queryset = queryset.filter(dress_style__icontains=dress_style)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        return queryset
