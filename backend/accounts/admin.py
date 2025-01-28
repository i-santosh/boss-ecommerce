from django.contrib import admin
from .models import CUser, PasswordReset, ConfirmEmail


@admin.register(CUser)
class CUserAdmin(admin.ModelAdmin):
    list_display = ["username", "name"]


@admin.register(PasswordReset)
class PasswordResetAdmin(admin.ModelAdmin):
    list_display = ["email", "token", "created_at", "expires_at"]


admin.site.register(ConfirmEmail)

