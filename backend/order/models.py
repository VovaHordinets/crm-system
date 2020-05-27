from django.db import models
from django.contrib.auth.models import User
from .validators import validate_phone

# Create your models here.

class Order(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE,null=True)
    name = models.CharField(max_length=30)
    description = models.TextField()
    customer = models.CharField(max_length=50)
    phone = models.CharField(max_length=15,validators=[validate_phone])
    created_at = models.DateTimeField(auto_now_add=True)

