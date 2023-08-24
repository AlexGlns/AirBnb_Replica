from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Property, Reservation, CustomUser
from .serializers import PropertySerializer, ReservationSerializer, CustomUserSerializer

#### Properties ####

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

#### Reservations ####

class ReservationListCreateView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

#### Users ####
class CustomUserCreateView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

class UserDetailsView(generics.RetrieveAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'id'

# Admin property -> get all users and their info
class AllUsersView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

#==================================================

# reservation info json
def get_reservation_info(request, reservation_id):
    try:
        reservation = Reservation.objects.select_related('property', 'renter').get(id=reservation_id)
        reservation_data = serializers.serialize('json', [reservation], use_natural_primary_keys=True)
        
        return JsonResponse(reservation_data, safe=False)
        
    except Reservation.DoesNotExist:
        return JsonResponse({'error': 'Reservation not found'}, status=404)

# property info json
def get_property_info(request, property_id):
    try:
        property_obj = Property.objects.get(id=property_id)
        
        property_info = {
            'id': property_obj.id,
            'location': property_obj.location,
            'size': property_obj.size,
            'floor': property_obj.floor,
            'heating': property_obj.heating,
            'price': property_obj.price,
            'available_from': property_obj.available_from,
            'available_to': property_obj.available_to,
            # Add other property attributes as needed
        }
        
        return JsonResponse(property_info)
        
    except Property.DoesNotExist:
        return JsonResponse({'error': 'Property not found'}, status=404)
