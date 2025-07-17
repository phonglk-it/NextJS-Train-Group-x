from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255 , null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    stock = models.IntegerField(null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    category = models.ForeignKey('category.Category', on_delete=models.SET_NULL, null=True, blank=True)
    color = models.CharField(max_length=50, null=True, blank=True)
    size = models.CharField(max_length=20, null=True, blank=True)
    dress_style = models.CharField(max_length=50, null=True, blank=True)

class Meta:
    verbose_name = "Product"
    verbose_name_plural = "Products"