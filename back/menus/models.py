from django.db import models

class Menu(models.Model):
    """ 
    This class refers to the daily menu
    """
    name = models.CharField(verbose_name='name', max_length=100, null=False, unique=True)

    class Meta:
        verbose_name = 'Menu'
        verbose_name_plural = 'Menu'
        ordering = ['name']

