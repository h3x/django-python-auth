from django.urls import include, path
from .views import return_data
from .views import return_weather_data
from .views import return_csv

urlpatterns = [
    path('data/', return_data),
    path('download_data/', return_csv),
    path('weather/', return_weather_data),
]
