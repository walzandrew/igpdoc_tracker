from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend

from .models import Food, Region, Province
from .serializers import FoodSerializer, RegionSerializer, ProvinceSerializer, FoodIndexSerializer


from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Food
from .serializers import FoodSerializer
from .filters import AccentInsensitiveSearchFilter
from rest_framework.decorators import api_view
from rest_framework import renderers


class FoodViewSet(viewsets.ModelViewSet):
    """API for foods with filters, search, and update capabilities."""
    queryset = Food.objects.all().order_by("denomination").prefetch_related("regions", "provinces")
    serializer_class = FoodSerializer
    filter_backends = [AccentInsensitiveSearchFilter, DjangoFilterBackend]
    filterset_fields = {
        "category": ["exact"],
        "regions__reg_istat_code": ["exact"],
        "provinces__prov_istat_code": ["exact"],
    }
    search_fields = ["denomination"]
    pagination_class = None

@api_view(["GET"])
def food_index(request):
    qs = Food.objects.all().only("id", "denomination")
    serializer = FoodIndexSerializer(qs, many=True)
    return Response(serializer.data)


class RegionViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only API for Regions"""
    queryset = Region.objects.all()
    serializer_class = RegionSerializer
    renderer_classes = [renderers.JSONRenderer]
    pagination_class = None


class ProvinceViewSet(viewsets.ReadOnlyModelViewSet):
    """Read-only API for Provinces, filterable by parent region"""
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["parent_region"]
    renderer_classes = [renderers.JSONRenderer]
    pagination_class = None

