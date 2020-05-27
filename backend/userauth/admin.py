from django.contrib import admin
from .models import User
from order.models import Order

admin.site.register(Order)

# Register your models here.
