# models.py
from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True, null=True)  # Field for thumbnail image
    images = models.ManyToManyField('ProductImage', related_name='products', blank=True)  # Field for additional images
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/')  # Field for image
    alt_text = models.CharField(max_length=255, blank=True, null=True)  # Alternative text for the image

    def __str__(self):
        return self.alt_text if self.alt_text else str(self.image)
