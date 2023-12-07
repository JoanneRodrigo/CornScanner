from rest_framework import serializers
from .models import Corn
class CornSerializer(serializers.ModelSerializer):
    class Meta:
        model = Corn
        fields = '__all__'