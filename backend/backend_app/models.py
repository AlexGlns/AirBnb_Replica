from django.contrib.auth.models import User, AbstractUser
from django.db import models
from django.conf import settings

class Property(models.Model):
    BOOLEAN_CHOICES = (
        ('Yes', 'Yes'),
        ('No', 'No'),
        ('Unknown', 'Unknown')
    )

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    location = models.CharField(max_length=100)
    
    # price per night
    price = models.DecimalField(max_digits=8, decimal_places=2)
    
    # availability
    available_from = models.DateField()
    available_to = models.DateField()
    
    size = models.IntegerField(default=0)
    bed_number = models.IntegerField(default=1)
    bathroom_number = models.IntegerField(default=1)
    living_room = models.CharField(max_length=20,choices=BOOLEAN_CHOICES, default="No")

    # open text
    description = models.CharField(max_length=1000, default="-")
    
    # rules
    smoking = models.CharField(max_length=20,choices=BOOLEAN_CHOICES, default="No")
    pets = models.CharField(max_length=20,choices=BOOLEAN_CHOICES, default="No")
    events = models.CharField(max_length=20,choices=BOOLEAN_CHOICES, default="No")
    min_number_reservation = models.IntegerField(default=1)

    #coordinates to give to openstreetmap --might have to change to decimal field
    lat = models.IntegerField(default=0)
    lng = models.IntegerField(default=0)

    #photos, owner info
    

    def __str__(self):
        return self.location

class Reservation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    renter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # reservation from to
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"Reservation for {self.property} by {self.renter}"

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('host', 'Host'),
        ('renter', 'Renter'),
        #('anonymous', 'Anonymous'),
    )
    
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='renter')
    phone_number = models.IntegerField(default=0000)
    email = models.EmailField(unique=True)  
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)  
    
    def __str__(self):
        return self.username

