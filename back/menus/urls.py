from django.conf.urls import include
from rest_framework import routers
from django.urls import re_path
from menus import views as menu_views

router = routers.DefaultRouter()
router.register(r'menu', menu_views.MenuView, basename='menu')

urlpatterns = [
    re_path(r'', include((router.urls, 'menu'), namespace='menus')),
]
