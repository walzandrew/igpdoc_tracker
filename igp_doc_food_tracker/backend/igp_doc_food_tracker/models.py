from django.contrib.gis.db import models

class Region(models.Model):
    reg_istat_code = models.CharField(max_length=2, primary_key=True)
    reg_name = models.CharField(max_length=200)
    reg_acronym = models.CharField(max_length=2)
    reg_poly = models.MultiPolygonField(srid=4326, null=True, blank=True)
    reg_centroid = models.PointField(srid=4326, null=True, blank=True)

    def __str__(self):
        return self.reg_name


class Province(models.Model):
    prov_istat_code = models.CharField(max_length=3, primary_key=True)
    prov_name = models.CharField(max_length=200)
    prov_acronym = models.CharField(max_length=2)
    parent_region = models.ForeignKey(Region, on_delete=models.CASCADE, related_name="province")
    prov_poly = models.MultiPolygonField(srid=4326, null=True, blank=True)
    prov_centroid = models.PointField(srid=4326, null=True, blank=True)

    def __str__(self):
        return self.prov_name


class Food(models.Model):
    CATEGORY_CHOICES = [
        ("igp", "I.G.P."),
        ("dop", "D.O.P."),
        ("stg", "S.T.G."),
    ]

    denomination = models.CharField(max_length=200)
    category = models.CharField(max_length=3, choices=CATEGORY_CHOICES)
    food_type = models.CharField(max_length=500)
    food_type_eng = models.CharField(max_length=500, blank=True, null=True)
    regions = models.ManyToManyField(Region, blank=False, related_name="foods", )
    provinces = models.ManyToManyField(Province, blank=False, related_name="foods")
    recipe = models.CharField(max_length=1000, blank=True, null=True)
    image_fp = models.CharField(max_length=200, blank=True, null=True)
    notes = models.CharField(max_length=1000, blank=True, null=True)
    user_rating = models.FloatField(blank=True, null=True)
    eaten = models.BooleanField(default=False)
    loc_eaten = models.CharField(max_length=1000, blank=True, null=True)
    point_eaten = models.PointField(srid=4326, blank=True, null=True)

    def __str__(self):
        return self.denomination
