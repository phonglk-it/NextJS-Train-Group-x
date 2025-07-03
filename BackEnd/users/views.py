from rest_framework import viewsets
from .models import CustomUser
from .serializer import UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer