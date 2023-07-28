from django.contrib.auth.models import User, AbstractUser
from django.db import models
from django.conf import settings

class Property(models.Model):
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    size = models.IntegerField()
    #floor = models.IntegerField()
    #heating = models.BooleanField()
    price = models.DecimalField(max_digits=8, decimal_places=2)
    available_from = models.DateField()
    available_to = models.DateField()
    # Add other property attributes as needed

class Reservation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    renter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    # Add other reservation attributes as needed


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('host', 'Host'),
        ('renter', 'Renter'),
        ('anonymous', 'Anonymous'),
    )
    
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='renter')
    # Add other user attributes as needed

