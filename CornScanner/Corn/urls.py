from django.urls import path, include
from .views import (
    Corn_view,get_corn_details
)

urlpatterns = [
    path('', include([
        path('', Corn_view.as_view({
            'get': 'list',
            'post': 'create',
        })),
        path('<int:pk>/', Corn_view.as_view({
            'put': 'update',
            'delete': 'destroy',
        })),
    ])),
    path('corn_details/<str:corn_name>/', get_corn_details, name='get_corn_details'),
]