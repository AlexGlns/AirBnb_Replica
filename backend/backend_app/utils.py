from djangorestframework-simplejwt.utils import jwt_payload_handler

def custom_jwt_payload_handler(user):
    payload = jwt_payload_handler(user)
    payload['id'] = user.id
    payload['username'] = user.username
    payload['user_type'] = user.user_type

    return payload
