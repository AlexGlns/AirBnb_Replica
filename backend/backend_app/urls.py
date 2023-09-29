"""backend_airbnb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [
    #======================= JWT =========================
    # obtain token pair
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # refresh token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # verify token
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    #====================== USERS ========================
    # creates user
    path('users/create/', CustomUserCreateView.as_view(), name='user-create'),
    # users info based on id
    path('users/<int:id>/', UserDetailsView.as_view(), name='user-details'),
    # admin only - get all users and their info
    path('users/all/', AllUsersView.as_view(), name='all-users'),
    # returns user's information from username --for login
    path('users/search/<str:username>/', UserInfoView.as_view(), name='user-search'),
    # login path
    path('users/login/', LoginView.as_view(), name='login'),
    # host admission - must be admin
    path('users/<int:user_id>/admit-host/', admit_host, name='admit-host'),

    #====================== PROPERTIES ======================
    # creates property --needs already created user
    path('properties/create/', PropertyListCreateView.as_view(), name='property-list'),
    # returns info on property with certain id
    path('properties/<int:id>/', PropertyDetailView.as_view(), name='property-detail'),
    # get extensive info for a property
    path('properties/<int:id>/ext-info/', PropertyExtensiveInfo.as_view(), name='property-ext-info'),
    # get basic info for a property
    path('properties/<int:id>/short-info/', PropertyShortInfo.as_view(), name='property-short-info'),

    #===================== RESERVATIONS ===================== 
    # creates reservations --needs already created propertty to base the reservation
    path('reservations/create/', ReservationListCreateView.as_view(), name='reservation-list'),
    # returns info on reservation with certain id 
    path('reservations/<int:pk>/', ReservationDetailView.as_view(), name='reservation-detail'),
    # get functions for info in json format
    path('reservations/<int:reservation_id>/info/', ReservationInfo.as_view(), name='reservation-info'),
    # get all reservations of a user
    path('reservations/users/<int:user_id>/', ReservationsUserView.as_view(), name='user-reservations'),
    # delete reservation with id and user id (to narrow it down)
    path('reservations/users/<int:user_id>/<int:reservation_id>/delete/', delete_reservation, name='reservation-delete'),
    
    #====================== SEARCH =========================
    # get all rooms in certain location
    path('room-search/<str:location>/', RoomsLocationView.as_view(), name='rooms-in-location'),
    # get all rooms in certain location with date range
    path('room-search/<str:location>/<str:start_date>/<str:end_date>/', RoomLocationDateView.as_view(), name='rooms-in-location-date'),
    # get all rooms in certain location with date range and people limit
    path('room-search/<str:location>/<str:start_date>/<str:end_date>/<int:bed_number>/', RoomLocationDateBedsView.as_view(), name='rooms-in-location-date-people'),

    #====================== RATINGS ========================
    # create rating -- THIS PATH OR /API/PROPERTY/RATING???
    path('properties/<int:property_id>/ratings/create/', CreateRatingView.as_view(), name='create-rating'),
    # get all ratings
    path('ratings/list/', RatingListView.as_view(), name='list-all-ratings'),
    # get all ratings for a specific property
    path('ratings/<int:property_id>/list/', PropertyRatingsListView.as_view(), name='ratings-for-property'),

    #======================= IMAGES ======================
    path('upload/', upload_image, name='upload-image'),

    #===================== UPDATES =======================
    path('change-username/', ChangeUsername.as_view(), name='change-username'),
]
