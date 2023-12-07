from django.shortcuts import render
from .serializers import CornSerializer
from rest_framework.viewsets import ModelViewSet
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Corn
# Create your views here.


class Corn_view(ModelViewSet):
    serializer_class = CornSerializer

    def get_queryset(self):
        return self.serializer_class.Meta.model.objects.all()
    

def get_corn_details(request, corn_name):
    corn = get_object_or_404(Corn, corn_name=corn_name)

    corn_details = {
        'corn_name': corn.corn_name,
        'corn_desc': corn.corn_desc,
        'corn_disease': corn.corn_disease,
        'corn_cure': corn.corn_cure,
    }

    return JsonResponse(corn_details)