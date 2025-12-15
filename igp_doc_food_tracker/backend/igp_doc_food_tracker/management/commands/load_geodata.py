import json
from pathlib import Path
from django.conf import settings
from django.core.management.base import BaseCommand
from django.contrib.gis.geos import GEOSGeometry
from igp_doc_food_tracker.models import Region, Province


class Command(BaseCommand):
    help = "Load Italian region and province data (with geometry) into the database."

    def add_arguments(self, parser):
        parser.add_argument(
            "--regions",
            type=str,
            help="Path to the regions GeoJSON file (defaults to BASE_DIR/data/Regioni_IT_4326.geojson)",
        )
        parser.add_argument(
            "--provinces",
            type=str,
            help="Path to the provinces GeoJSON file (defaults to BASE_DIR/data/Province_IT_4326_Simp_100m.geojson)",
        )
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Clear existing Region and Province data before loading new data.",
        )
        parser.add_argument(
            "--verbose",
            action="store_true",
            help="Display detailed logs for each record processed.",
        )

    def handle(self, *args, **options):
        # --- Resolve file paths ---
        base_data_dir = Path(settings.BASE_DIR) / "data"

        regions_path = Path(options["regions"]) if options["regions"] else base_data_dir / "Regioni_IT_4326.geojson"
        provinces_path = Path(options["provinces"]) if options["provinces"] else base_data_dir / "Province_IT_4326_Simp_100m.geojson"

        # Log absolute paths
        self.stdout.write(self.style.HTTP_INFO("=== GeoJSON File Paths ==="))
        self.stdout.write(self.style.HTTP_INFO(f"Regions file:   {regions_path.resolve()}"))
        self.stdout.write(self.style.HTTP_INFO(f"Provinces file: {provinces_path.resolve()}"))
        self.stdout.write("")

        if not regions_path.exists() or not provinces_path.exists():
            raise FileNotFoundError(
                f"❌ Could not find one or both GeoJSON files:\n"
                f"  Regions:   {regions_path}\n"
                f"  Provinces: {provinces_path}\n"
                f"Make sure they exist or provide explicit --regions / --provinces paths."
            )

        reset = options["reset"]
        verbose = options["verbose"]

        if reset:
            self.stdout.write(self.style.WARNING("Reset flag detected — clearing existing data..."))
            self.stdout.write(self.style.WARNING(f"{Region}"))
            Province.objects.all().delete()
            Region.objects.all().delete()
            self.stdout.write(self.style.SUCCESS("✅ All existing Region and Province records deleted.\n"))

        created_regions = 0
        created_provinces = 0

        # --- Load Regions ---
        self.stdout.write(self.style.MIGRATE_HEADING("Loading regions..."))
        with open(regions_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            total_regions = len(data["features"])
            for i, feature in enumerate(data["features"], start=1):
                props = feature["properties"]
                geom = GEOSGeometry(json.dumps(feature["geometry"]), srid=4326)

                reg_code_raw = props.get("COD_REG")
                reg_name = props.get("DEN_REG")

                if not reg_code_raw or not reg_name:
                    if verbose:
                        self.stdout.write(self.style.WARNING(f"[{i}/{total_regions}] Skipping region with missing fields"))
                    continue

                reg_code = str(reg_code_raw).zfill(2)

                Region.objects.create(
                    reg_istat_code=reg_code,
                    reg_name=reg_name,
                    reg_poly=geom,
                    reg_centroid=geom.centroid,
                )

                created_regions += 1

                if verbose:
                    self.stdout.write(self.style.SUCCESS(f"[{i}/{total_regions}] Created region: {reg_name} ({reg_code})"))

        # --- Load Provinces ---
        self.stdout.write("\n" + self.style.MIGRATE_HEADING("Loading provinces..."))
        with open(provinces_path, "r", encoding="utf-8") as f:
            data = json.load(f)
            total_provs = len(data["features"])
            for i, feature in enumerate(data["features"], start=1):
                props = feature["properties"]
                geom = GEOSGeometry(json.dumps(feature["geometry"]), srid=4326)

                prov_code_raw = props.get("COD_UTS")
                prov_name = props.get("DEN_UTS")
                prov_acronym = props.get("SIGLA")
                reg_code_raw = props.get("COD_REG")

                if not prov_code_raw or not reg_code_raw or not prov_name:
                    if verbose:
                        self.stdout.write(self.style.WARNING(f"[{i}/{total_provs}] Skipping province with missing fields"))
                    continue

                prov_code = str(prov_code_raw).zfill(3)
                reg_code = str(reg_code_raw).zfill(2)

                parent_region = Region.objects.filter(reg_istat_code=reg_code).first()
                if not parent_region:
                    if verbose:
                        self.stdout.write(
                            self.style.WARNING(
                                f"[{i}/{total_provs}] ⚠ Skipping province '{prov_name}' (code {prov_code}) — region {reg_code} not found."
                            )
                        )
                    continue

                Province.objects.create(
                    prov_istat_code=prov_code,
                    prov_name=prov_name,
                    prov_acronym=prov_acronym,
                    parent_region=parent_region,
                    prov_poly=geom,
                    prov_centroid=geom.centroid,
                )

                created_provinces += 1

                if verbose:
                    self.stdout.write(self.style.SUCCESS(f"[{i}/{total_provs}] Created province: {prov_name} ({prov_code})"))

        # --- Summary ---
        self.stdout.write("\n" + self.style.HTTP_INFO("=== Import Summary ==="))
        self.stdout.write(self.style.SUCCESS(f"Regions created:  {created_regions}"))
        self.stdout.write(self.style.SUCCESS(f"Provinces created: {created_provinces}"))
        self.stdout.write(self.style.SUCCESS("✅ Region and province import complete!\n"))
