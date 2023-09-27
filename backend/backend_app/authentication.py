from django.contrib.auth import get_user_model
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed
from djangorestframework-simplejwt.tokens import AccessToken

# jwt authentication class
class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        header = authentication.get_authorization_header(request).split()
        if not header or header[0].lower() != b'bearer':
            return None

        if len(header) != 2:
            raise AuthenticationFailed('Authorization header is invalid.')

        token = header[1]
        user = self.authenticate_token(token)
        return (user, None)

    # need more
    def authenticate_token(self, token):
        try:
            payload = AccessToken(token)
            user = get_user_model().objects.get(id=payload['user_id'])
            if not user.is_active:
                raise AuthenticationFailed('User is inactive.')
            return user
        except Exception as e:
            raise AuthenticationFailed('Invalid token.')