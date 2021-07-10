from django.urls import include, path
from .views import return_data
from .views import return_weather_data

urlpatterns = [
    path('data/', return_data),
    path('weather/', return_weather_data),
]
