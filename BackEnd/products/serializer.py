from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class NewArrivalsProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class TopSellingProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
