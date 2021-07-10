import requests
from django.http import JsonResponse
from .utils import get_data, weather_data
from django.views.decorators.csrf import csrf_exempt
import json


@csrf_exempt
def return_data(request):
    data = get_data()
    return JsonResponse(data)


@csrf_exempt
def return_weather_data(request):
    data = weather_data()
    return JsonResponse(data)
