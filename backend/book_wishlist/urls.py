from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('book_api/', include('book_api.urls', namespace='book_api')),
    path('users/', include('django.contrib.auth.urls')),
    path(r'', views.homepage, name="homepage"),
    path('token-auth/', obtain_jwt_token)
]
