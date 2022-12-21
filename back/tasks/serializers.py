from rest_framework import serializers
from django.conf import settings

from tasks import models as tasks_models
from accounts import models as accounts_models


class TaskSerializer(serializers.ModelSerializer):
    pupil_name = serializers.SerializerMethodField(read_only=True)
    #tasks = StepSerializer(source='task', many=True, read_only=True)
    steps = serializers.SerializerMethodField(read_only=True)
    image = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = tasks_models.Task
        fields = ('id', 'title', 'start_date', 'end_date', 'image', 'pictogram', 'pictogram_description', 'is_done',
                  'pupil', 'pupil_name', 'steps',)
#        read_only_fields = ('is_done',)

    def get_image(self, instance):
        if instance.image != '':
            return 'http://api.abelriosgonzalez.com:8000/' + str(instance.image)
        else:
            return None

    def get_pupil_name(self, instance):
        if instance.pupil is not None:
            return instance.pupil.first_name + ' ' + instance.pupil.last_name
        else:
            return None

    def get_steps(self, instace):
        steps = tasks_models.Step.objects.filter(task=instace)
        return StepSerializer(steps, many=True).data


class StepSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(read_only=True)
    video = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = tasks_models.Step
        fields = ('id', 'task', 'type', 'title', 'position', 'text', 'pictogram', 'pictogram_description', 'image', 'video', 'is_done',)
#        read_only_fields = ('is_done',)
    def get_image(self, instance):
        if instance.image != '':
            return settings.DOMAIN_URL + str(instance.image)
        else:
            return None
    def get_video(self, instance):
        if instance.video != '':
            return settings.DOMAIN_URL + str(instance.video)
        else:
            return None

class CommandSerializer(serializers.ModelSerializer):
    class Meta:
        model = tasks_models.Command
        fields = '__all__'

    def get_image(self, instance):
        if instance.image != '':
            return 'http://api.abelriosgonzalez.com:8000/' + str(instance.image)
        else:
            return None

    def get_pupil_name(self, instance):
        if instance.pupil is not None:
            return instance.pupil.first_name + ' ' + instance.pupil.last_name
        else:
            return None