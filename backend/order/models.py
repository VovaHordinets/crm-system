from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Order(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE,null=True)
    name = models.CharField(max_length=30)
    description = models.TextField()
    customer = models.CharField(max_length=50)
    phone = models.CharField(max_length=31)
    created_at = models.DateTimeField(auto_now_add=True)
