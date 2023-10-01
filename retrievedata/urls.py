from django.urls import path
from .views import *


urlpatterns = [
    # path('get_data/', get_data, name="get_data"),
    # path('list_homes/', list_homes, name="list_homes"),
    path('list_homes_api/', list_homes_api, name="list_homes_api"),
    path('get_data_api/', get_data_api, name="get_data_api"),
]
