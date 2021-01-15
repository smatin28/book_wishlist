from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.conf import settings

# Create your models here.


class Book(models.Model):
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255, blank=True)
    published = models.DateField(_("Date (YYYY-MM-DD)"), blank=True, null=True)
    description = models.TextField(blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    imageURL = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title


class CustomUser(AbstractUser):
    pass

    def __str__(self):
        return self.username
