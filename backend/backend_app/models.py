from django.contrib.auth.models import User, AbstractUser
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth import get_user_model

#======================= USERS ============================
class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('admin', 'Admin'),
        ('host', 'Host'),
        ('renter', 'Renter'),
    )
    
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='renter')
    phone_number = models.IntegerField(default=0000)
    email = models.EmailField(unique=True)  
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)  
    
    def __str__(self):
        return self.username

#======================== PROPERTIES =======================
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
    bathroom_number = models.IntegerField(default=1)
    living_room = models.CharField(max_length=20,choices=BOOLEAN_CHOICES, default="No")
    bed_number = models.IntegerField(default=1)

    # open text
    description = models.CharField(max_length=1000, default="-")
    
    # rules
    smoking = models.CharField(max_length=20,choices=BOOLEAN_CHOICES, default="No")
    pets = models.CharField(max_length=20,choices=BOOLEAN_CHOICES, default="No")
    events = models.CharField(max_length=20,choices=BOOLEAN_CHOICES, default="No")
    min_number_reservation = models.IntegerField(default=1)

    #coordinates to give to openstreetmap --might have to change to decimal field
    lat = models.DecimalField(max_digits=18, decimal_places=5)
    lng = models.DecimalField(max_digits=18, decimal_places=5)

    #photos, owner info
    
    def __str__(self):
        return self.location


#============================ RESERVATIONS ==========================
class Reservation(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    renter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # reservation from-to
    start_date = models.DateField()
    end_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Reservation for {self.property} by {self.renter}"

    def overlap(self):
        # Check if there are overlapping reservations for the same property
        overlapping_reservations = Reservation.objects.filter(
            property=self.property,
            start_date__lte=self.end_date,
            end_date__gte=self.start_date,
        ).exclude(pk=self.pk)

        if overlapping_reservations.exists():
            raise ValidationError("This property is not available for the selected dates.")

#============================ RATINGS =============================
class Rating(models.Model):
    property = models.ForeignKey('Property', on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    def __str__(self):
        return f"{self.user.username}'s rating for {self.property}"

#============================ COMMENTS ==========================
class Comment(models.Model):
    property = models.ForeignKey('Property', on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author} on {self.property}"
