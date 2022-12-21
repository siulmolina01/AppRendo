from rest_framework import serializers

from menus import models as menus_models

class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = menus_models.Menu
        fields = ('__all__')
        