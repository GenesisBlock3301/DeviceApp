from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework import permissions, status
from .serializers import DeviceSerializer
from rest_framework.response import Response
from .models import Device
from django.shortcuts import get_object_or_404
from rest_framework import filters
from django.db.models import Q


class DeviceAddView(APIView):
    permission_classes = (permissions.AllowAny,)

    # def get(self, request):
    #     devices = Device.objects.all()
    #     print(">>>>>>>>>>>>>", devices)
    #     serializer = DeviceSerializer(devices, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        serializer = DeviceSerializer(data=request.data)
        print("ADDDDDDDDDDDDDDDDDDDDDDDDDDDD", serializer)
        if serializer.is_valid():
            # serializer.data['status'] = serializer.data['status']
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class DeviceUpdateView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, pk):
        device = get_object_or_404(Device, pk=pk)
        serializer = DeviceSerializer(device, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


class DeviceDeleteView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, pk):
        device = get_object_or_404(Device, pk=pk)
        device.delete()
        return Response("Deleted", status=status.HTTP_200_OK)


class DeviceList(ListAPIView):
    queryset = Device.objects.order_by('-created_at')
    permission_classes = (permissions.AllowAny,)
    serializer_class = DeviceSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'device_type', 'status']


class DeviceView(APIView):
    def get(self, request, pk):
        user = get_object_or_404(Device, pk=pk)
        # print(">>>>>>>>>>>>>>>", user)
        serializer = DeviceSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChangeView(APIView):
    def post(self, request, pk):
        device = Device.objects.get(pk=pk)
        if device.status:
            device.status = False
        else:
            device.status = True
        device.save()
        # print(">>>>>>>>>>>>>>>", device.status)
        return Response("Change status")

