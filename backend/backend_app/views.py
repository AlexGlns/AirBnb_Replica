from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework import generics
from .models import Property, Reservation, CustomUser, Rating, Comment
from .serializers import CommentSerializer, RatingSerializer, LoginSerializer, PropertySerializer, ReservationSerializer, CustomUserSerializer, PropertyShortInfoSerializer
from rest_framework.response import Response
from datetime import datetime
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication  
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render, redirect
from .forms import ImageForm
import mimetypes
import os
from wsgiref.util import FileWrapper

#======================= PROPERTIES ==============================

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

#========================== RESERVATIONS ===========================

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

# delete reservation
@api_view(['DELETE'])
def delete_reservation(request, user_id, reservation_id):
    try:
        # Check if the reservation exists and belongs to the user
        reservation = Reservation.objects.get(id=reservation_id, renter_id=user_id)
    except Reservation.DoesNotExist:
        return Response({"message": "Reservation not found"}, status=status.HTTP_404_NOT_FOUND)

    # Delete the reservation
    reservation.delete()
    return Response({"message": "Reservation deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


# reservations per user
class ReservationsUserView(generics.ListAPIView):
    serializer_class = ReservationSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        user = get_object_or_404(get_user_model(), id=user_id)

        # Filter reservations for the specified user
        return Reservation.objects.filter(renter=user)

#========================== USERS ==============================

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
@authentication_classes([JWTAuthentication])  
@permission_classes([IsAuthenticated])
class AllUsersView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

@authentication_classes([JWTAuthentication]) 
@permission_classes([IsAuthenticated])
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

# host admission process
@api_view(['POST'])
@permission_classes([IsAdminUser])
def admit_host(request, user_id):
    try:
        user = get_user_model().objects.get(id=user_id)
    except get_user_model().DoesNotExist:
        return Response({"message": "User not found"}, status=status.HTTP_404_NOT_FOUND)

    user.is_host = True
    user.save()

    return Response({"message": "User admitted as a host"}, status=status.HTTP_200_OK)


#============================ RATINGS ===========================
# create rating
class CreateRatingView(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

# list all ratings
class RatingListView(generics.ListAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

# list all ratings for a property
class PropertyRatingsListView(generics.ListAPIView):
    serializer_class = RatingSerializer

    def get_queryset(self):
        # Get the property_id from the URL parameter
        property_id = self.kwargs['property_id']
        
        # Filter ratings by the specified property_id
        queryset = Rating.objects.filter(property_id=property_id)
        return queryset

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

#=========================== COMMENTS ============================

class CommentCreateView(generics.CreateAPIView):
    serializer_class = CommentSerializer

class CommentListView(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        property_id = self.kwargs['property_id']
        queryset = Comment.objects.filter(property_id=property_id)
        return queryset

#============================ IMAGES ===========================
def upload_image(request):
    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('image-list')  # Redirect to a page where you list all images
    else:
        form = ImageForm()
    return render(request, 'upload_image.html', {'form': form})

class ImageView(generics.ListAPIView):
    def get(self, request, image_name):
        try:
            image_path = os.path.join(settings.MEDIA_ROOT, image_name)
            with open(image_path, 'rb') as image_file:
                content_type, encoding = mimetypes.guess_type(image_path)
                content_type = content_type or 'application/octet-stream'
                response = HttpResponse(image_file, content_type=content_type)
                response['Content-Disposition'] = f'inline; filename="{image_name}"'
                return response
        except FileNotFoundError:
            return HttpResponse('Image not found', status=404)
