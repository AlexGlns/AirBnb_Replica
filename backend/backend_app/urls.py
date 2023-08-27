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

urlpatterns = [
    # creates user
    path('users/create/', CustomUserCreateView.as_view(), name='user-create'),
    # users info based on id
    path('users/<int:id>/', UserDetailsView.as_view(), name='user-details'),
    # creates property --needs already created user
    path('properties/create/', PropertyListCreateView.as_view(), name='property-list'),
    # returns info on property with certain id
    path('properties/<int:pk>/', PropertyDetailView.as_view(), name='property-detail'),
    # creates reservations --needs already created propertty to base the reservation
    path('reservations/create/', ReservationListCreateView.as_view(), name='reservation-list'),
    # returns info on reservation with certain id 
    path('reservations/<int:pk>/', ReservationDetailView.as_view(), name='reservation-detail'),
    # get functions for info in json format
    path('reservations/<int:reservation_id>/info/', ReservationInfo.as_view(), name='reservation-info'),
    path('properties/<int:property_id>/info/', PropertyExtensiveInfo.as_view(), name='property-info'),
    # admin only - get all users and their info
    path('users/all/', AllUsersView.as_view(), name='all-users'),
    # basic info request - before click on room

    # extensive info - after click on room

    #====================== SEARCH =========================
    # get all rooms in certain location
    path('room-search/<str:location>/', RoomsInLocationView.as_view(), name='rooms-in-location'),
    # get all rooms in certain location with date range
    path('room-search/<str:location>/<str:start_date>/<str:end_date>/', RoomSearchView.as_view(), name='rooms-in-location-date'),
    # get all rooms in certain location with date range and people limit
    path('room-search/<str:location>/<str:start_date>/<str:end_date>/<int:bed_number>/', RoomSearchView.as_view(), name='rooms-in-location-date-people'),
]
