from django.shortcuts import render
from django.http import HttpResponseRedirect
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import OrderSerializer
from .models import Order
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
# Create your views here.


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwags):
        order_data = request.data
        new_order = Order.objects.create(
            user = User.objects.get(id=order_data["user"]),
            name = order_data["name"],
            description = order_data["description"],
            customer = order_data["customer"],
            phone = order_data["phone"] )
        new_order.save()
        serializer = OrderSerializer(new_order)
        return Response(serializer.data)
