from rest_framework import serializers
from .models import Property, Reservation, CustomUser, Rating, Comment

#============================ USERS =================================
class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'phone_number','user_type', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

#============================= RATING ================================

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['id', 'user', 'property', 'rating']

#=========================== PROPERTIES ==============================
class PropertyShortInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ['id', 'location', 'price', 'available_from', 'available_to']

class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'

#========================== RESERVATIONS ===============================
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'

#============================= COMMENTS =================================
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'