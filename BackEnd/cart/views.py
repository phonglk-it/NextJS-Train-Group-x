from rest_framework import viewsets, permissions
from .models import Cart
from .serializers import CartSerializer, CartItemSerializer, CartCreateSerializer

class CartViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'create':
            return CartCreateSerializer
        return CartSerializer

    def perform_create(self, serializer):
        user = self.request.user
        product = serializer.validated_data['product']
        quantity = serializer.validated_data['quantity']

        existing_cart = Cart.objects.filter(user=user, product=product).first()
        if existing_cart:
            existing_cart.quantity += quantity
            existing_cart.save()
        else:
            serializer.save(user=user)
