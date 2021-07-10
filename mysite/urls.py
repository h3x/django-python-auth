from django.contrib import admin
from django.urls import path, include,re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/users/', include('users.urls')),
    path('api/v1/synapse/', include('synapse.urls')),
    # match all other pages
    re_path(r'^(?:.*)/?$', include('frontend.urls')),
]