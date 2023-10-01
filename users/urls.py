from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name="token"),
    path('getUser/', getUser, name="getUser"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('getAllUsers/', getAllUsers, name='getAllUsers'),
    path('registerUser/', registerUser, name='registerUser'),
]
