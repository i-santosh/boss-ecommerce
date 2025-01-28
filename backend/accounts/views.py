from django.db import IntegrityError
from django.contrib.auth import authenticate
from django.shortcuts import get_object_or_404
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from rest_framework import status, permissions
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken

from constants import *
from core.views import CoreAPIView
from core.error_codes import ErrorCodes as EC
from utils.response import generate_api_response
from core.success_codes import SuccessCodes as SC
from core.custom_exceptions import CoreAPIException
from .models import CUser, PasswordReset, ConfirmEmail
from utils.calculate_jwt_age import calculate_jwt_expiry
from .serializers import (
    ChangePasswordSerializer, RequestPasswordResetSerializer,
    ResetPasswordSerializer, SignUpSerializer, SignInSerializer,
    UserProfileSerializer, SendVerificationEmailSerializer)
from core.throttles import SustainedRateThrottle, AuthRateThrottle


class UserProfileView(CoreAPIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [SustainedRateThrottle]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserProfileSerializer(user)
        data = serializer.data.copy()

        return generate_api_response(
            success=True,
            message="",
            code=SC.REQ_DATA_RETRIEVED.value,
            data=data,
            status_code=status.HTTP_200_OK
        )

    def patch(self, request, *args, **kwargs):
        user = get_object_or_404(CUser, pk=request.user.pk)
        serializer = UserProfileSerializer(instance=user,
                                           data=request.data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return generate_api_response(
            success=True,
            message="Profile updated successfully!",
            code=SC.UPD_PROFILE_UPDATED.value,
            data='',
            status_code=status.HTTP_200_OK
        )


class SignUpView(CoreAPIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthRateThrottle]

    def post(self, request, *args, **kwargs):
        data = request.data
        data['username'] = data.get('email')
        serializer = SignUpSerializer(data=data)

        try:

            serializer.is_valid(raise_exception=True)
            user = serializer.save()

            refresh_token = RefreshToken.for_user(user)
            access_token = refresh_token.access_token

            access_token_str = str(access_token)
            refresh_token_str = str(refresh_token)

            # Calculate attributes for cookies
            access_token_max_age, access_token_expires = (
                calculate_jwt_expiry(access_token_str)
            )
            refresh_token_max_age, refresh_token_expires = (
                calculate_jwt_expiry(refresh_token_str)
            )

            return generate_api_response(
                success=True,
                message={"Your Account has been created!"},
                code=SC.CRE_ACCOUNT_CREATED.value,
                data={
                ACCESS_TOKEN_NAME: {
                    'value': access_token_str,
                    'max_age': access_token_max_age,
                    'expires': access_token_expires,
                },
                REFRESH_TOKEN_NAME: {
                    'value': refresh_token_str,
                    'max_age': refresh_token_max_age,
                    'expires': refresh_token_expires,
                }
            },
                status_code=status.HTTP_200_OK,
                cookies={
                    ACCESS_TOKEN_NAME: {
                        'value': access_token_str,
                        'max_age': access_token_max_age,
                        'expires': access_token_expires,
                    },
                    REFRESH_TOKEN_NAME: {
                        'value': refresh_token_str,
                        'max_age': refresh_token_max_age,
                        'expires': refresh_token_expires,
                    }
                },
                extra_context={"action": "Redirecting.."}
            )

        except IntegrityError as e:
            raise CoreAPIException(
                error_code=EC.RES_ALREADY_EXISTS,
                message="A User with this username or email already exists",
                extra_context={"details": str(e.details)}
            )


class SignInView(CoreAPIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthRateThrottle]

    def post(self, request, *args, **kwargs):
        serializer = SignInSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        username_or_email = serializer.validated_data["username"]
        password = serializer.validated_data["password"]

        user = CUser.objects.filter(username=username_or_email).first()
        if not user:
            try:
                user = CUser.objects.get(email=username_or_email)
            except CUser.DoesNotExist:
                raise CoreAPIException(
                    error_code=EC.RES_NOT_FOUND,
                    message="We couldn't find account with this user!",
                    extra_context={"action": "Please check credentials and try again!"}
                )
        authenticated_user = authenticate(
            request,
            username=user.username,
            password=password
        )

        if not authenticated_user:
            raise CoreAPIException(
                error_code=EC.AUTH_INVALID_CREDENTIALS
            )

        refresh_token = RefreshToken.for_user(authenticated_user)
        access_token = refresh_token.access_token
        access_token_str = str(access_token)
        refresh_token_str = str(refresh_token)

        access_token_max_age, access_token_expires = calculate_jwt_expiry(access_token_str)
        refresh_token_max_age, refresh_token_expires = calculate_jwt_expiry(refresh_token_str)

        return generate_api_response(
            success=True,
            message={"Signed in successfully!"},
            code=SC.AUTH_LOGIN_SUCCESS.value,
            data={
                ACCESS_TOKEN_NAME: {
                    'value': access_token_str,
                    'max_age': access_token_max_age,
                    'expires': access_token_expires,
                },
                REFRESH_TOKEN_NAME: {
                    'value': refresh_token_str,
                    'max_age': refresh_token_max_age,
                    'expires': refresh_token_expires,
                }
            },
            status_code=status.HTTP_200_OK,
            cookies={
                ACCESS_TOKEN_NAME: {
                    'value': access_token_str,
                    'max_age': access_token_max_age,
                    'expires': access_token_expires,
                },
                REFRESH_TOKEN_NAME: {
                    'value': refresh_token_str,
                    'max_age': refresh_token_max_age,
                    'expires': refresh_token_expires,
                }
            },
            extra_context={"action": "Redirecting.."}
        )


class SendEmailVerificationLinkView(CoreAPIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [AuthRateThrottle]

    def post(self, request, *args, **kwargs):
        data = request.data.copy()

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(request.user)
        data["token"] = token
        data["user"] = request.user.pk
        serializer = SendVerificationEmailSerializer(data=data)

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return generate_api_response(
            success=True,
            message="Verification Link has been sent to your email.",
            code=SC.CRE_RESOURCE_CREATED.value,
            data="",
            status_code=status.HTTP_201_CREATED
        )


class VerifyEmailView(CoreAPIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthRateThrottle]

    def validate_token_and_get_email(self, token):
        try:
            confirm_email = ConfirmEmail.objects.select_related('user').get(token=token)

            # Check for token expiration
            if confirm_email.is_expired():
                confirm_email.delete()
                raise CoreAPIException(
                    error_code=EC.AUTH_TOKEN_EXPIRED,
                    message={"Email confirmation link has expired!"}
                )

            # Return the email associated with this confirmation token
            return confirm_email

        except ConfirmEmail.DoesNotExist:
            raise CoreAPIException(
                error_code=EC.RES_NOT_FOUND,
                message={"Invalid token or token is expired!"}
            )

    def get(self, request, *args, **kwargs):
        token = request.query_params.get('token')

        if not token:
            raise CoreAPIException(
                error_code=EC.VAL_FIELD_REQUIRED,
                message="Token is required"
            )

        try:
            confirm_email_instance = self.validate_token_and_get_email(
                token=token
            )
            email = confirm_email_instance.email
            user = confirm_email_instance.user

            if user.email_verified:
                raise CoreAPIException(
                    error_code=EC.PERM_ACTION_FORBIDDEN,
                    message="Your account has been already verified!"
                )

            # Find and activate the user
            user.email = email
            user.email_verified = True
            user.save()

            # send_email_confirmed_notification_task.delay(
            #     name=user.name,
            #     user_email=user.email
            # )

            # Delete the confirmation token after successful email verification
            confirm_email_instance.delete()

            return generate_api_response(
                success=True,
                message="Your email has been confirmed successfully!",
                code=SC.UPD_PROFILE_UPDATED.value,
                data="",
                status_code=status.HTTP_200_OK
            )

        except CUser.DoesNotExist:
            raise CoreAPIException(
                error_code=EC.RES_NOT_FOUND,
                message={"User doesn't exists!"}
            )


class RequestPasswordResetView(CoreAPIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthRateThrottle]

    def post(self, request, *args, **kwargs):
        serializer = RequestPasswordResetSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data.get('email')

        try:
            user = CUser.objects.get(email=email)

        except ObjectDoesNotExist:
            raise CoreAPIException(
                error_code=EC.RES_NOT_FOUND,
                message="We couldn't found an account with this email"
            )

        token_generator = PasswordResetTokenGenerator()
        token = token_generator.make_token(user)
        reset = PasswordReset(email=user, token=token)
        reset.save()

        reset_url = f"{PROJECT_WEBSITE_NAME_HTTPS}/accounts/password-reset/{token}"
        # send_password_reset_email_email_task.delay(email, reset_url)

        return generate_api_response(
            success=True,
            message="We have sent you a link on your registered \
                email to reset your password",
            code=SC.CRE_RESOURCE_CREATED.value,
            data="",
            status_code=status.HTTP_201_CREATED
        )


class VerifyTokenView(CoreAPIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthRateThrottle]

    def get(self, request):
        token = request.query_params.get('token')
        try:
            is_valid_token = PasswordReset.objects.get(token=token)
            if is_valid_token.is_expired():
                is_valid_token.delete()
                raise CoreAPIException(
                    error_code=EC.AUTH_TOKEN_EXPIRED,
                    message="Password reset link has expired! Try generating new one."
                )

            return generate_api_response(
                success=True,
                message="",
                code=SC.PRO_VALIDATION_PASSED.value,
                data="",
                status_code=status.HTTP_200_OK
            )
        except PasswordReset.DoesNotExist:
            raise CoreAPIException(
                error_code=EC.RES_NOT_FOUND,
                message="Invalid password reset link!"
            )


class ResetPasswordView(CoreAPIView):
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthRateThrottle]

    def post(self, request, *args, **kwargs):
        serializer = ResetPasswordSerializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return generate_api_response(
                success=True,
                message="Your password has been updated successfully!",
                code=SC.AUTH_PASSWORD_RESET.value,
                data="",
                status_code=status.HTTP_200_OK
            )

        except ValidationError:
            raise CoreAPIException(
                error_code=EC.RES_NOT_FOUND,
                message={"Invalid link or link is expired! \
                                  Try resending password reset link."}
            )


class MyCustomTokenRefreshView(TokenRefreshView,
                               CoreAPIView):
    """
    Custom token refresh view that includes the user 
    object in the response.
    """
    permission_classes = [permissions.AllowAny]
    throttle_classes = [AuthRateThrottle]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)

        access_token_str = response.data.get("access")
        refresh_token_str = response.data.get("refresh")

        if not access_token_str:
            raise CoreAPIException(
                error_code=EC.VAL_FIELD_REQUIRED,
                message={"Refresh token is misssing!"}
            )

        decoded_token = AccessToken(access_token_str)
        payload = decoded_token.payload
        get_object_or_404(CUser, uid=payload.get("user_id"))

        # Calculate attributes for cookies
        access_token_max_age, access_token_expires = calculate_jwt_expiry(
            access_token_str
        )
        refresh_token_max_age, refresh_token_expires = calculate_jwt_expiry(
            refresh_token_str
        )

        return generate_api_response(
            success=True,
            message="Your authentication token is refreshed!",
            code=SC.REQ_PROCESSED.value,
            data="",
            status_code=status.HTTP_200_OK,
            cookies={
                ACCESS_TOKEN_NAME: {
                    'value': access_token_str,
                    'max_age': access_token_max_age,
                    'expires': access_token_expires,
                },
                REFRESH_TOKEN_NAME: {
                    'value': refresh_token_str,
                    'max_age': refresh_token_max_age,
                    'expires': refresh_token_expires,
                }
            }
        )


class ChangePasswordView(CoreAPIView):
    permission_classes = [permissions.IsAuthenticated]
    throttle_classes = [AuthRateThrottle]

    def put(self, request, *args, **kwargs):
        serializer = ChangePasswordSerializer(data=request.data,
                                              context={'request': request})

        serializer.is_valid(raise_exception=True)
        serializer.save()

        return generate_api_response(
            success=True,
            message="",
            code=SC.AUTH_PASSWORD_RESET.value,
            data="",
            status_code=status.HTTP_200_OK
        )
    
