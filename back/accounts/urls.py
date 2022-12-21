from django.conf.urls import include
from rest_framework import routers
from django.urls import re_path
from accounts import views as accounts_views

router = routers.DefaultRouter()
router.register(r'user', accounts_views.UserView, basename='user')
router.register(r'teacher', accounts_views.TeacherView, basename='teacher')
router.register(r'pupil', accounts_views.PupilView, basename='pupil')
router.register(r'admin', accounts_views.AdminView, basename='admin')

urlpatterns = [
    re_path(r'', include((router.urls, 'accounts'), namespace='accounts')),
]
