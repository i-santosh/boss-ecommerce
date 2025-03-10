from django.urls import path, include

from orders import views

app_name = 'orders'


urlpatterns = [
    path('place/', views.OrderCreateAPIView.as_view(), name='create-order'),
    path('list/', views.OrderListAPIView.as_view(), name='order-list'),
]

