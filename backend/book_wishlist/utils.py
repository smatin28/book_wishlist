from book_api.serializers import UserSerializer


def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        # Adds a new user field with its serialized data
        'user': UserSerializer(user, context={'request': request}).data
    }
