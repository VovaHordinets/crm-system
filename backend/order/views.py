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
class IsAuthenticatedOwner(permissions.BasePermission):
    def has_permission(self, request, view):
        # work when your access /item/
        if request.user and request.user.is_authenticated:
                return True   
        else:
            return False

    def has_object_permission(self, request, view, obj):
        # work when your access /item/item_id/
        # Instance must have an attribute named `user`.
        return obj.user == request.user

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticatedOwner,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    def get_queryset(self):
        return self.queryset.filter(user=self.request.user) 
    def create(self, request, *args, **kwags):
        order_data = request.data
        new_order = Order.objects.create(
            user = request.user,
            name = order_data["name"],
            description = order_data["description"],
            customer = order_data["customer"],
            phone = order_data["phone"] )
        new_order.save()
        serializer = OrderSerializer(new_order)
        return Response(serializer.data)