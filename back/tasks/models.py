from django.db import models
from accounts import models as accounts_models
from django.conf import settings

# Create your models here.

STEP_TYPE = (
    (settings.TEXT_STEP, "Text"),
    (settings.IMAGE_STEP, "Image"),
    (settings.PICTO_STEP, "Picto"),
    (settings.VIDEO_STEP, "Video"),
)

class Task(models.Model):
    title = models.CharField(max_length=100)
    image = models.FileField(null=True, verbose_name='image')  # ToDo add upload_to directory
    pictogram = models.CharField(null=True, verbose_name='pictogram', max_length=2048)
    pictogram_description = models.CharField(null=True, verbose_name='pictogram description name', max_length=250)
    start_date = models.DateTimeField(null=True, verbose_name='start date')
    end_date = models.DateTimeField(verbose_name='end date')
    is_done = models.BooleanField(default=False, verbose_name='is done')
    pupil = models.ForeignKey(accounts_models.Pupil, null=True, on_delete=models.SET_NULL)

class Step(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, verbose_name='task', related_name='steps')
    position = models.PositiveSmallIntegerField(verbose_name='position in task')
    title = models.CharField(max_length=50, verbose_name='title', null=True)
    text = models.TextField(max_length=250, verbose_name='text', null=True)
    pictogram = models.CharField(null=True, verbose_name='pictogram', max_length=2048)
    pictogram_description = models.CharField(null=True, verbose_name='pictogram description name', max_length=250)
    image = models.FileField(null=True, verbose_name='image')  # ToDo add upload_to directory
    video = models.FileField(null=True, verbose_name='video')  # ToDo add upload_to directory
    is_done = models.BooleanField(default=False, verbose_name='is done')
    type = models.CharField(choices=STEP_TYPE, default=settings.TEXT_STEP, verbose_name='type of step', max_length=75)

class Command(models.Model):
    title = models.CharField(max_length=100)
    pupil = models.ForeignKey(accounts_models.Pupil, null=True, on_delete=models.SET_NULL)
    pictogram = models.CharField(null=True, verbose_name='pictogram', max_length=2048)
    image = models.FileField(null=True, verbose_name='image')  # ToDo add upload_to directory
    start_date = models.DateTimeField(null=True, verbose_name='start date')
    end_date = models.DateTimeField(verbose_name='end date')
