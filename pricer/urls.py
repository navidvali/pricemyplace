from django.urls import path
from .views import *


urlpatterns = [
    # path('guess_the_price/', guess_the_price, name="guess_the_price"),
    path('guess_the_price_api/', guess_the_price_api, name="guess_the_price_api"),
    path('costume_guess_the_price_api/', costume_guess_the_price_api, name="costume_guess_the_price_api"),
]
