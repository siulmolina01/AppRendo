from rest_framework.response import Response
from rest_framework import status, mixins
from rest_framework import permissions
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import GenericViewSet

from menus import serializers as menus_serializers
from menus import models as menus_models

# Create your views here.

class MenuView(mixins.ListModelMixin,
               mixins.RetrieveModelMixin,
               mixins.CreateModelMixin,
               mixins.UpdateModelMixin,
               mixins.DestroyModelMixin,
               GenericViewSet
               ):
    queryset = menus_models.Menu.objects.all()
    serializer_class = menus_serializers.MenuSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = (SearchFilter,)
    #search_fields = ('title',)
    #search_fields = ('title',)

    


