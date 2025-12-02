from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import FoodViewSet, RegionViewSet, ProvinceViewSet, food_index

router = DefaultRouter()
router.register(r"foods", FoodViewSet, basename="food")
router.register(r"regions", RegionViewSet)
router.register(r"provinces", ProvinceViewSet)

urlpatterns = [
    ## CUSTOM ROUTES MUST COME BEFORE DEFAULT ROUTES!!!
    path("foods/index/", food_index, name="food-index"),
    path("", include(router.urls)),
]