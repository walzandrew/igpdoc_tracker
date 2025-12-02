from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from .models import Food, Region, Province
import django_filters

class RegionSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Region
        geo_field = "reg_poly"
        fields = ("reg_istat_code", "reg_name", "reg_acronym", "reg_centroid")


class ProvinceSerializer(GeoFeatureModelSerializer):
    class Meta:
        model = Province
        geo_field = "prov_poly"
        fields = (
            "prov_istat_code",
            "prov_name",
            "prov_acronym",
            "parent_region",
            "prov_centroid",
        )

class FoodSerializer(serializers.ModelSerializer):
    regions = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="reg_istat_code"
    )
    provinces = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="prov_istat_code"
    )

    class Meta:
        model = Food
        fields = "__all__"

class FoodIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ("id", "denomination")