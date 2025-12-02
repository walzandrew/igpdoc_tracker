from django.apps import AppConfig


class IgpDocFoodTrackerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'igp_doc_food_tracker'

    def ready(self):
        from django.contrib.postgres import lookups
