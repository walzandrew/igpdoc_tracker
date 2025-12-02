from django.contrib import admin
from django.contrib.gis.admin import GISModelAdmin
from .models import Region, Province, Food


@admin.register(Region)
class RegionAdmin(GISModelAdmin):
    list_display = ("reg_istat_code", "reg_name")
    search_fields = ("reg_istat_code", "reg_name")
    list_filter = ("reg_name",)
    ordering = ("reg_istat_code",)
    default_zoom = 6
    default_lon = 12.5  # roughly central Italy
    default_lat = 42.8
    map_width = 800
    map_height = 500
    map_template = "gis/admin/custom_map.html"
    modifiable = False


@admin.register(Province)
class ProvinceAdmin(GISModelAdmin):
    search_fields = ("prov_istat_code", "prov_name", "prov_acronym")
    list_filter = ("parent_region",)
    ordering = ("prov_istat_code",)
    default_zoom = 6
    default_lon = 12.5
    default_lat = 42.8
    map_width = 800
    map_height = 500
    map_template = "gis/custom_map.html"
    modifiable = False


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = (
        "denomination",
        "category",
        "food_type",
        "eaten",
        "user_rating",
    )
    list_filter = ("category", "eaten", "regions", "provinces")
    search_fields = ("denomination", "food_type", "notes")
    ordering = ("category", "denomination")
    filter_horizontal = ("regions", "provinces")

    fieldsets = (
        ("Basic Information", {
            "fields": ("denomination", "category", "food_type")
        }),
        ("Geographic Information", {
            "fields": ("regions", "provinces", "loc_eaten", "point_eaten")
        }),
        ("User Data", {
            "fields": ("eaten", "user_rating", "notes", "image_fp", "recipe")
        }),
    )

