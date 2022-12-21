from rest_framework.response import Response
from rest_framework import status, mixins
from rest_framework import permissions
from rest_framework.viewsets import GenericViewSet
from accounts import models as accounts_models
from accounts import serializers as accounts_serializers


# Create your views here.

class UserView(mixins.ListModelMixin,
               mixins.RetrieveModelMixin,
               mixins.CreateModelMixin,
               mixins.UpdateModelMixin,
               mixins.DestroyModelMixin,
               GenericViewSet
               ):
    queryset = accounts_models.User.objects.all()
    serializer_class = accounts_serializers.UserSerializer
    permission_classes = [permissions.AllowAny]


class AdminView(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.CreateModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                GenericViewSet):
    queryset = accounts_models.Admin.objects.all()
    serializer_class = accounts_serializers.AdminSerializer
    permission_classes = [permissions.AllowAny]


class PupilView(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.CreateModelMixin,
                mixins.UpdateModelMixin,
                mixins.DestroyModelMixin,
                GenericViewSet):
    queryset = accounts_models.Pupil.objects.all()
    serializer_class = accounts_serializers.PupilSerializer
    permission_classes = [permissions.AllowAny]


class TeacherView(mixins.ListModelMixin,
                  mixins.RetrieveModelMixin,
                  mixins.CreateModelMixin,
                  mixins.UpdateModelMixin,
                  mixins.DestroyModelMixin,
                  GenericViewSet):
    queryset = accounts_models.Teacher.objects.all()
    serializer_class = accounts_serializers.TeacherSerializer
    permission_classes = [permissions.AllowAny]
