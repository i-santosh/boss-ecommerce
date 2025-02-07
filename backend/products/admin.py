from django.contrib import admin
from .models import Category, Product, ProductImage


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "description"]


@admin.register(Product)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "description", "price", "category", "updated_at"]


@admin.register(ProductImage)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["image", "alt_text"]
