from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# API Versions
API_V1 = 'api/v1/'

urlpatterns = [
    path('admin/', admin.site.urls),
    path(API_V1, include([
        path('accounts/', include('accounts.urls')),

        # # Razorpay Webhook Handler
        # path('razorpay/webhooks/', razorpay_webhook, name='razorpay-webhook'),

    ])),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
