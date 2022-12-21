# Generated by Django 3.2.12 on 2022-11-25 09:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('image', models.FileField(null=True, upload_to='', verbose_name='image')),
                ('pictogram', models.CharField(max_length=2048, null=True, verbose_name='pictogram')),
                ('pictogram_description', models.CharField(max_length=250, null=True, verbose_name='pictogram description name')),
                ('start_date', models.DateTimeField(null=True, verbose_name='start date')),
                ('end_date', models.DateTimeField(verbose_name='end date')),
                ('is_done', models.BooleanField(default=False, verbose_name='is done')),
                ('pupil', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.pupil')),
            ],
        ),
        migrations.CreateModel(
            name='Step',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('position', models.PositiveSmallIntegerField(verbose_name='position in task')),
                ('title', models.CharField(max_length=50, null=True, verbose_name='title')),
                ('text', models.TextField(max_length=250, null=True, verbose_name='text')),
                ('pictogram', models.CharField(max_length=2048, null=True, verbose_name='pictogram')),
                ('pictogram_description', models.CharField(max_length=250, null=True, verbose_name='pictogram description name')),
                ('image', models.FileField(null=True, upload_to='', verbose_name='image')),
                ('video', models.FileField(null=True, upload_to='', verbose_name='video')),
                ('is_done', models.BooleanField(default=False, verbose_name='is done')),
                ('type', models.CharField(choices=[('text', 'Text'), ('image', 'Image'), ('picto', 'Picto'), ('video', 'Video')], default='text', max_length=75, verbose_name='type of step')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='steps', to='tasks.task', verbose_name='task')),
            ],
        ),
    ]