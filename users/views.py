from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import UserSerializer, UserSerializerWithToken


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUser(request):
    user = request.user
    serialized = UserSerializer(user, many=False)

    return Response({"user": serialized.data})


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getAllUsers(request):
    user = User.objects.all()
    serialized = UserSerializer(user, many=True)
    return Response({"usera": serialized.data})


@api_view(['POST'])
def registerUser(request):
        data = request.data

        try:
            user = User.objects.create(
                    first_name=data["first_name"],
                    username=data["email"],
                    email=data["email"],
                    password=make_password(data["password"])
                )

            serializers = UserSerializerWithToken(user)

            return Response({"user": serializers.data})

        except Exception as e:
            print(e)
            message = {"detail": "user already exists!"}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializers = UserSerializerWithToken(self.user).data
        for k, v in serializers.items():
            data[k] = v
        data["ok"] = True
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

