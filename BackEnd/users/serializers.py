from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Nếu không có `username`, gán email làm `username`
        if 'username' not in validated_data:
            validated_data['username'] = validated_data['email']

        user = CustomUser.objects.create_user(**validated_data)
        return user

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long.")
        return value


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def authenticate_user(self, request, email, password):
        user = authenticate(request, email=email, password=password)
        return user