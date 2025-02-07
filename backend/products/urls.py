from django.urls import path, include

from products import views

app_name = 'products'


urlpatterns = [
    # Product URLs
    path('products/', include([
        path('', views.ProductList.as_view(), name='product-list'),
        path('<int:pk>/', views.ProductDetail.as_view(), name='product-detail'),
    ])),
    
    # Category URLs
    path('categories/', include([
        path('', views.CategoryList.as_view(), name='category-list'),
        path('<int:pk>/', views.CategoryDetail.as_view(), name='category-detail'),
    ]))
]

