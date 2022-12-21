# Generated by Django 3.2.12 on 2022-11-29 19:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_pupil_type_of_view'),
        ('tasks', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Command',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('pictogram', models.CharField(max_length=2048, null=True, verbose_name='pictogram')),
                ('image', models.FileField(null=True, upload_to='', verbose_name='image')),
                ('start_date', models.DateTimeField(null=True, verbose_name='start date')),
                ('end_date', models.DateTimeField(verbose_name='end date')),
                ('pupil', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.pupil')),
            ],
        ),
    ]
