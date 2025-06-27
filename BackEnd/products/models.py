from django.db import models

# Create your models here.
class Product(models.Model):
    name = models.CharField(max_length=255 , null=True, blank=True)
    price = models.FloatField(null=True, blank=True)
    stock = models.IntegerField(null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)

class Meta:
    verbose_name = "Product"
    verbose_name_plural = "Products"