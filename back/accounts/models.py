from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

ROLES_TYPE = (
    (settings.ADMIN_ROLE_KEY, "Admin"),
    (settings.PUPIL_ROLE_KEY, "Pupil"),
    (settings.TEACHER_ROLE_KEY, "Teacher"),
)

TYPES_OF_VIEW = (
    (settings.TEXT_STEP, "Text"),
    (settings.IMAGE_STEP, "Image"),
    (settings.PICTO_STEP, "Picto"),
    (settings.VIDEO_STEP, "Video"),
)


class User(AbstractUser):
    email = models.EmailField(max_length=254, unique=True, verbose_name='email')
    user_type = models.CharField(max_length=48, choices=ROLES_TYPE, default=settings.PUPIL_ROLE_KEY)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []


class Teacher(User):
    def save(self, *args, **kargws):
        self.user_type = settings.TEACHER_ROLE_KEY
        return super().save(*args, **kargws)


class Pupil(User):
    # Some students need to have the totals calculated for them
    calculate_command_totals = models.BooleanField(default=False, verbose_name='calculate command totals')
    type_of_view = models.CharField(max_length=48, choices=TYPES_OF_VIEW, default=settings.TEXT_STEP)

    def save(self, *args, **kargws):
        self.user_type = settings.PUPIL_ROLE_KEY
        return super().save(*args, **kargws)


class Admin(User):
    def save(self, *args, **kargws):
        self.user_type = settings.ADMIN_ROLE_KEY
        self.is_superuser = True
        self.is_staff = True
        return super().save(*args, **kargws)
