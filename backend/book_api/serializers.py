from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from . import models


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Book
        fields = ('title', 'authors', 'published', 'description', 'user', 'imageURL', 'id')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.CustomUser
        fields = ('username', 'email', 'pk')


class UserSerializerWithToken(serializers.ModelSerializer):
    # Custom method
    token = serializers.SerializerMethodField()
    # Password set to write only so that it is not in the returned JSON
    password = serializers.CharField(write_only=True)

    # Handles the manual creation of a new token
    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = models.CustomUser
        fields = ('token', 'username', 'email', 'password', 'pk')
