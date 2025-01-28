class LogRequestMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        print(f"Host: {request.get_host()}, Path: {request.path}")
        return self.get_response(request)
    