"""Snake3D URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from . import settings
from Snake3DWeb.views import Snake3D

#tresstogo api
from django.urls import include
from rest_framework import routers
from Snake3DWeb.views import api_email

router = routers.DefaultRouter()
router.register(r'email-api', api_email, basename='email-api')



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Snake3D.as_view(), name="snake3d"),
     path('email-api/',api_email,name="email-api"),
] + static(settings.STATIC_URL,document_root=settings.STATIC_ROOT)  # MEDIA_URL, MEDIA_ROOT
