from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Property, Reservation, CustomUser
from .serializers import LoginSerializer, PropertySerializer, ReservationSerializer, CustomUserSerializer, PropertyShortInfoSerializer
from rest_framework.response import Response
from datetime import datetime
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework import status

#======================= Properties ==============================

class PropertyListCreateView(generics.ListCreateAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

class PropertyDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    lookup_field = 'id'

class PropertyShortInfo(generics.RetrieveAPIView):
    serializer_class = PropertyShortInfoSerializer
    queryset = Property.objects.all()
    lookup_field = 'id'

# property info json
class PropertyExtensiveInfo(generics.ListAPIView):
    serializer_class = PropertySerializer
    
    def get_queryset(self):
        queryset = Property.objects.all()
        lookup_field = 'id'
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

#========================== Reservations ===========================

class ReservationListCreateView(generics.ListCreateAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

class ReservationDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

# reservation info json
class ReservationInfo(generics.ListAPIView):
    serializer_class = ReservationSerializer
    
    def get_queryset(self):
        queryset = Reservation.objects.all()
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

#========================== Users ==============================

class UserInfoView(generics.RetrieveAPIView):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()
    lookup_field = 'username'

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

# Login attempt
class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']

        user = authenticate(username=username, password=password)

        if user:
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)



#=========================== SEARCH =============================

# get all rooms in certain location
class RoomsLocationView(generics.ListAPIView):
    serializer_class = PropertySerializer
    
    def get_queryset(self):
        location = self.kwargs['location']
        queryset = Property.objects.filter(location__icontains=location).order_by('-price')
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response_data = {
            'message': f'Results for rooms in {self.kwargs["location"]}',
            'results': serializer.data
        }
        return Response(response_data)

# get all rooms in certain location available in the date range
class RoomLocationDateView(generics.ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        location = self.kwargs['location']
        start_date = datetime.strptime(self.kwargs['start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(self.kwargs['end_date'], '%Y-%m-%d')

        queryset = Property.objects.filter(
            location__icontains=location,
            available_from__lte=end_date,
            available_to__gte=start_date
        ).order_by('-price')

        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response_data = {
            'message': f'Results for rooms in {self.kwargs["location"]} from {self.kwargs["start_date"]} to {self.kwargs["end_date"]}',
            'results': serializer.data
        }
        return Response(response_data)

class RoomLocationDateBedsView(generics.ListAPIView):
    serializer_class = PropertySerializer
    
    def get_queryset(self):
        location = self.kwargs['location']
        start_date = datetime.strptime(self.kwargs['start_date'], '%Y-%m-%d')
        end_date = datetime.strptime(self.kwargs['end_date'], '%Y-%m-%d')
        bed_number = self.kwargs['bed_number']
        
        queryset = Property.objects.filter(
            location__icontains=location,
            available_from__lte=end_date,
            available_to__gte=start_date,
            bed_number__gte=bed_number
        ).order_by('-price')
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        response_data = {
            'message': f'Results for rooms in {self.kwargs["location"]} from {self.kwargs["start_date"]} to {self.kwargs["end_date"]} for {self.kwargs["bed_number"]} people',
            'results': serializer.data
        }
        return Response(response_data)

#============================================================================

