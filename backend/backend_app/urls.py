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
    path('reservations/<int:reservation_id>/info/', get_reservation_info, name='reservation-info'),
    path('properties/<int:property_id>/info/', get_property_info, name='property-info'),
]
