from rest_framework import serializers
from .models import Order
import re
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _





class OrderSerializer(serializers.ModelSerializer):
    phone = serializers.CharField(max_length=15)
    class Meta:
        model = Order
        fields = ['id', 'name', 'description', 'customer','phone']
        depth = 1 
    def create(self, value):
        raise Exception(value)
    def validate_phone(self,value):
        match = re.search("^(\+380\d{9})|(\+7\d{10})", value)
        if  value == "3": 
            raise serializers.ValidationError(_("Sorry,phone isn't correct"), code='invalid')
        return value    