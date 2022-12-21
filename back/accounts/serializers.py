from rest_framework import serializers

from accounts import models as accounts_models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts_models.User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'last_login',
                  'is_superuser', 'is_staff', 'is_active', 'date_joined', 'user_type',)
        read_only_fields = ('last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined',)


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts_models.Teacher
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'last_login',
                  'is_superuser', 'is_staff', 'is_active', 'date_joined', 'user_type',)
        read_only_fields = ('last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'user_type',)


class PupilSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts_models.Pupil
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'last_login',
                  'is_superuser', 'is_staff', 'is_active', 'date_joined', 'user_type', 'calculate_command_totals',
                  'type_of_view',)
        read_only_fields = ('last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'user_type',)


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = accounts_models.Admin
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'last_login',
                  'is_superuser', 'is_staff', 'is_active', 'date_joined', 'user_type',)
        read_only_fields = ('last_login', 'is_superuser', 'is_staff', 'is_active', 'date_joined', 'user_type',)
