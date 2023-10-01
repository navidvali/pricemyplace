from django.shortcuts import render
from bs4 import BeautifulSoup
import requests
from unidecode import unidecode
from .models import Places
from django.core.paginator import Paginator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .serializers import PlacesSerializer
# from datetime import datetime
# from jwt.exceptions import ExpiredSignatureError
# from rest_framework_simplejwt.tokens import AccessToken
#
#
# def is_token_expired(token):
#     try:
#         # Decode the token to extract the payload
#         decoded_token = AccessToken(token)
#         expiration_timestamp = decoded_token.payload['exp']
#         expiration_datetime = datetime.fromtimestamp(expiration_timestamp)
#
#         # Compare the expiration time with the current time
#         if expiration_datetime < datetime.now():
#             return True  # Token has expired
#         else:
#             return False  # Token is still valid
#
#     except ExpiredSignatureError:
#         return True  # Token has expired and cannot be decoded


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def list_homes_api(request):
    # auth_header = request.headers.get('Authorization', '')
    # if auth_header.startswith('Bearer '):
    #     token = auth_header[7:]
    # else:
    #     token = None
    # is_token_expired
    # print(request)
    p = Paginator(Places.objects.order_by("-created_on"), 5)
    page = request.GET.get('page')
    places_paginated = p.get_page(page)
    num_all_pages = places_paginated.paginator.num_pages
    data = PlacesSerializer(places_paginated, many=True)

    return Response({"places": data.data, "num": num_all_pages})

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdminUser])
def get_data_api(request):
    x = requests.get('https://divar.ir/s/tehran/real-estate')
    count = 0
    # souped = [1]
    soup = BeautifulSoup(x.text, 'html.parser')
    souped = soup.find_all('div', attrs={"class": ["post-card-item-af972", "kt-col-6-bee95", "kt-col-xxl-4-e9d46"]}, limit=200)
    for i in souped:
        try:
            # print("==================================================================================")
            a_tag = i.find('a')
            link = a_tag.get('href')
            # link = "/v/۱۷۵متر-۳-خواب-۳راه-منظریه-جنوبی_آپارتمان_تهران_اختیاریه_دیوار/wYWHWDmG"
            y = requests.get("https://divar.ir"+link)
            details_soup =  BeautifulSoup(y.text, 'html.parser')
            details_souped = details_soup.find_all('span', attrs={"class": "kt-group-row-item__value"})
            pricenfloor_souped = details_soup.find_all('p', attrs={"class": "kt-unexpandable-row__value"})
            is_vadie = details_soup.find_all('p', attrs={"class": ["kt-base-row__title", "kt-unexpandable-row__title"]})
            pricepre = pricenfloor_souped[0].text.replace("تومان", "")
            if "ودیعه" in is_vadie[0].text:
                continue
            tmp = unidecode(details_souped[2].text)
            try:
                rooms = int(tmp)
            except:
                rooms = 0
            meter = int(unidecode(details_souped[0].text))
            year = int(unidecode(details_souped[1].text))
            price = int(unidecode(pricepre).replace(",", "").strip())
            floor = int(pricenfloor_souped[-1].text.strip()[0])
            code = link.split("/")[-1]
        except Exception as e:
            # print("https://divar.ir"+link)
            print(e)
            continue

        try:
            if not Places.objects.filter(code=code):
                Places.objects.create(meters=meter, year=year, rooms=rooms, price=price, floor=floor, url="https://divar.ir"+link, code=code)
                # print("created!")
                count += 1
        except Exception as e:
            # print("https://divar.ir" + link)
            print(e)
            continue
    # print("==================================================================================")
    places_added = Places.objects.all().order_by('-created_on')[:count]
    data = PlacesSerializer(places_added, many=True)
    print(count)
    if count == 0:
        return Response({"status": False, "msg": "No data recieved!"})
    return Response({"status": True, "places": data.data})


# def get_data(request):
#     x = requests.get('https://divar.ir/s/tehran/real-estate')
#     count = 0
#     # souped = [1]
#     soup = BeautifulSoup(x.text, 'html.parser')
#     souped = soup.find_all('div', attrs={"class": ["post-card-item-af972", "kt-col-6-bee95", "kt-col-xxl-4-e9d46"]}, limit=200)
#     for i in souped:
#         print("==================================================================================")
#         a_tag = i.find('a')
#         link = a_tag.get('href')
#         # link = "/v/۱۷۵متر-۳-خواب-۳راه-منظریه-جنوبی_آپارتمان_تهران_اختیاریه_دیوار/wYWHWDmG"
#         y = requests.get("https://divar.ir"+link)
#         details_soup =  BeautifulSoup(y.text, 'html.parser')
#         details_souped = details_soup.find_all('span', attrs={"class": "kt-group-row-item__value"})
#         pricenfloor_souped = details_soup.find_all('p', attrs={"class": "kt-unexpandable-row__value"})
#         is_vadie = details_soup.find_all('p', attrs={"class": ["kt-base-row__title", "kt-unexpandable-row__title"]})
#         try:
#             pricepre = pricenfloor_souped[0].text.replace("تومان", "")
#             if "ودیعه" in is_vadie[0].text:
#                 continue
#             tmp = unidecode(details_souped[2].text)
#             try:
#                 rooms = int(tmp)
#             except:
#                 rooms = 0
#             meter = int(unidecode(details_souped[0].text))
#             year = int(unidecode(details_souped[1].text))
#             price = int(unidecode(pricepre).replace(",", "").strip())
#             floor = int(pricenfloor_souped[-1].text.strip()[0])
#             code = link.split("/")[-1]
#         except Exception as e:
#             print("https://divar.ir"+link)
#             print(e)
#             continue
#
#         try:
#
#             if not Places.objects.filter(code=code):
#                 Places.objects.create(meters=meter, year=year, rooms=rooms, price=price, floor=floor, url="https://divar.ir"+link, code=code)
#                 print("created!")
#                 count += 1
#         except Exception as e:
#             print("https://divar.ir" + link)
#             print(e)
#             continue
#     print("==================================================================================")
#     places_added = Places.objects.all().order_by('-created_on')[:10][::-1]
#
#     return render(request, "retrievedata/get_data.html", {"places": places_added})
#
#
# def list_homes(request):
#     p = Paginator(Places.objects.order_by("-created_on"), 5)
#     page = request.GET.get('page')
#     places_paginated = p.get_page(page)
#
#     return render(request, "retrievedata/list_homes.html", {"places": places_paginated})
