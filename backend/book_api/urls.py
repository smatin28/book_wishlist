from django.urls import path, include

from rest_framework import routers

from . import views


app_name = "book_api"


router = routers.DefaultRouter()
router.register('book', views.BookView)

urlpatterns = [
    path('api/', include(router.urls)),
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
]
