from django.urls import path, include
from .views import DeviceAddView, DeviceUpdateView, DeviceDeleteView, DeviceList, DeviceView, ChangeView

urlpatterns = [
    path('api/add/', DeviceAddView.as_view()),
    path('api/update/<pk>/', DeviceUpdateView.as_view()),
    path('api/delete/<pk>/', DeviceDeleteView.as_view()),
    path('api/devices/', DeviceList.as_view()),
    path('api/device/<pk>/', DeviceView.as_view()),
    path('api/status/<pk>/', ChangeView.as_view()),
]
