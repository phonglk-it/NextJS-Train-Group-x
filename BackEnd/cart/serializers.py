# cart/serializers.py
from rest_framework import serializers
from .models import Cart
from products.models import Product


class ProductSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price']


class CartSerializer(serializers.ModelSerializer):
    product = ProductSimpleSerializer()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'product', 'quantity', 'created_at']


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = ['id', 'product', 'quantity']
