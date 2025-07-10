from products.models import Product
from category.models import Category

cat, _ = Category.objects.get_or_create(name="T-shirts")  # type: ignore

Product.objects.create(name="Áo thun 1", price=150, stock=10, category=cat)  # type: ignore
Product.objects.create(name="Áo thun 2", price=250, stock=5, category=cat)   # type: ignore
Product.objects.create(name="Áo thun 3", price=500, stock=8, category=cat)   # type: ignore
Product.objects.create(name="Áo thun 4", price=900, stock=2, category=cat)   # type: ignore
