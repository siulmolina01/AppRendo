from django.conf.urls import include
from rest_framework import routers
from django.urls import re_path
from tasks import views as tasks_views

router = routers.DefaultRouter()
router.register(r'task', tasks_views.TaskView, basename='task')
router.register(r'step', tasks_views.StepView, basename='step')
router.register(r'command', tasks_views.CommandView, basename='command')

urlpatterns = [
    re_path(r'', include((router.urls, 'tasks'), namespace='tasks')),
]
