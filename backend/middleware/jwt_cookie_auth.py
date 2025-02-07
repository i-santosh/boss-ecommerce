from django.utils.deprecation import MiddlewareMixin
from constants import ACCESS_TOKEN_NAME

class JWTAuthCookieMiddleware(MiddlewareMixin):
    """
    Middleware to extract JWT from cookies and inject into the Authorization header.
    This makes DRF's JWTAuthentication class work seamlessly with tokens stored in cookies.
    """
    def process_request(self, request):
        # Optional: Skip middleware for certain paths or methods
        if request.path.startswith('/admin') or request.method in ['OPTIONS', 'HEAD']:
            return

        # Get the view's permission classes (requires DRF's `as_view` pattern)
        view = getattr(request, 'resolver_match', None)
        if view:
            # Check for permission classes or other conditions
            view_func = view.func
            if hasattr(view_func, 'cls'):
                permission_classes = getattr(view_func.cls, 'permission_classes', None)
                if permission_classes is None or len(permission_classes) == 0:
                    # Skip processing if no permission classes are defined
                    return

        # Extract the JWT token from the cookie
        jwt_token_cookie = request.COOKIES.get(ACCESS_TOKEN_NAME)

        if jwt_token_cookie:
            # Inject the token into the Authorization header
            request.META['HTTP_AUTHORIZATION'] = f'Bearer {jwt_token_cookie}'

