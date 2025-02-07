from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import PasswordResetTokenGenerator

from core.custom_exceptions import CoreAPIException
from core.error_codes import ErrorCodes as EC
from .models import CUser, PasswordReset, ConfirmEmail

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CUser
        fields = ["full_name", "email", "email_verified"]
        read_only_fields = ['email_verified']

    def validate_username(self, value):
        if CUser.objects.filter(username=value).exclude(pk=self.instance.pk).exists():
            raise serializers.ValidationError("This username is already taken.")

        return value

    def validate_email(self, value):
        if "+" in value:
            raise serializers.ValidationError("Invalid email.")

        if CUser.objects.filter(username=value).exclude(pk=self.instance.pk).exists():
            raise serializers.ValidationError("This email is already taken.")

        return value


class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = CUser
        fields = ["full_name", "email", "username", "password", "country"]
        extra_kwargs = {
            'country': {'required': True,'allow_blank': False}
        }


    def create(self, validated_data):
        user = CUser.objects.create_user(**validated_data)
        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)

        ConfirmEmail.objects.create(user=user,
                                    email=user.email,
                                    token=token)
        return user


class SignInSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField(write_only=True)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Current password is incorrect.")
        return value

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def save(self):
        user = self.context['request'].user
        new_password = self.validated_data['new_password']
        user.set_password(new_password)
        user.save()
        return user


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class ResetPasswordSerializer(serializers.Serializer):
    token = serializers.CharField(write_only=True, required=True)
    new_password = serializers.CharField(write_only=True, required=True)

    def validate_token(self, value):
        try:
            password_reset = PasswordReset.objects.get(token=value)
            if password_reset.is_expired():
                password_reset.delete()
                raise serializers.ValidationError("Password reset link has expired")
        except PasswordReset.DoesNotExist:
            raise serializers.ValidationError("Invalid token")

        # Add the password_reset instance to the serializer context
        self.context['password_reset'] = password_reset
        return value

    def validate_new_password(self, value):
        validate_password(value)
        return value

    def save(self):
        # Retrieve the password_reset instance from the context
        password_reset = self.context['password_reset']

        # Retrieve the user associated with the password reset request
        user = password_reset.email  # Since `email` is a ForeignKey to `CUser`
        new_password = self.validated_data['new_password']

        # Set the new password for the user
        user.set_password(new_password)
        user.save()

        # Delete the password reset record to prevent reuse
        password_reset.delete()
        return user


class SendVerificationEmailSerializer(serializers.ModelSerializer):  
    class Meta:
        model = ConfirmEmail
        fields = ["user", "email", "token"]

    def validate_email(self, email):
        email_exists = CUser.objects.filter(email=email,
                                            email_verified=True).exists()
        if email_exists:
            raise CoreAPIException(
                    error_code=EC.RES_ALREADY_EXISTS.value,
                    message="Account with this email already exists!"
            )
        return email

