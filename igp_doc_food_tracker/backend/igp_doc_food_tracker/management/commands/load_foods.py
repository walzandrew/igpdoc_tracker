import ast
import csv
import os
from collections import Counter
from django.core.management.base import BaseCommand
from igp_doc_food_tracker.models import Food, Region, Province

def get_english_type(typ: str):
    '''
    This function will be used to define the English type of the food
    based on a translation lookup table whose key is the Italian type
    and value is the english type equivalent
    '''
    eng_translation_lookup = {
        "Altri prodotti dell'allegato I del trattato": "Other Plant Products",
        "Altri prodotti dell'allegato I del trattato (spezie, ecc.) e Prodotti di panetteria, pasticceria, confetteria o biscotteria": "Other Plant Products",
        "Altri prodotti di origine animale": "Other Animal Products",
        "Carni fresche (e frattaglie)": "Fresh Meats",
        "Cioccolato e prodotti derivati": "Chocolate Products",
        "Formaggi": "Cheeses",
        "Oli e grassi": "Oils and Fats",
        "Olio essenziale": "Essential Oils",
        "Ortofrutticoli e cereali": "Fruits, Vegetables and Grains",
        "Pasta alimentare": "Pasta Products",
        "Pesci, molluschi, crostacei freschi": "Fresh Seafood (Fish, Shellfish, Mollusks)",
        "Piatti pronti": "Prepared Meals",
        "Prodotti a base di carne": "Meat Products",
        "Prodotti di panetteria, pasticceria": "Bread and Pastry Products",
        "Prodotti di panetteria, pasticceria, confetteria o biscotteria e Pasta alimentare": "Bread and Pastry Products",
        "Sale": "Salt",
        "Vini aromatizzati": "Aromatized Wines",
    }

    try:
        curr_english_type = eng_translation_lookup.get(typ)
        return curr_english_type
    except KeyError:
        print(f"English type for {typ} not found in lookup table")
        return "Unknown"

class Command(BaseCommand):
    help = "Load DOP/IGP/STG food data from CSV and link to Region/Province models."

    def add_arguments(self, parser):
        parser.add_argument(
            "--file",
            type=str,
            default="data/PDFPlumber_DOP_IGC_Cleaned_Codified_Italian07112025.csv",
            help="Path to the cleaned food data CSV file.",
        )
        parser.add_argument(
            "--reset",
            action="store_true",
            help="Delete all existing Food entries before import.",
        )
        parser.add_argument(
            "--verbose",
            action="store_true",
            help="Print detailed progress during import.",
        )

    def handle(self, *args, **options):
        file_path = options["file"]
        reset = options["reset"]
        verbose = options["verbose"]

        if not os.path.exists(file_path):
            self.stderr.write(self.style.ERROR(f"❌ File not found: {file_path}"))
            return

        if reset:
            Food.objects.all().delete()
            self.stdout.write(self.style.WARNING("⚠️ All existing Food entries deleted."))

        created_count = 0
        skipped_count = 0
        category_counter = Counter()

        with open(file_path, newline="", encoding="utf-8") as csvfile:
            reader = csv.DictReader(csvfile)
            total_rows = sum(1 for _ in open(file_path, encoding="utf-8")) - 1  # minus header
            csvfile.seek(0)
            next(reader)  # skip header

            for i, row in enumerate(reader, start=1):
                denom = (row.get("Denominazione") or "").strip()
                cat = (row.get("Cat.") or "").strip().lower().replace(".", "")
                typ = (row.get("Tipologia") or "").strip()

                if not denom or not cat:
                    skipped_count += 1
                    self.stderr.write(self.style.WARNING(f"Skipping incomplete record (row {i}): missing fields"))
                    continue

                if cat not in ["dop", "igp", "stg"]:
                    skipped_count += 1
                    self.stderr.write(self.style.WARNING(f"Unknown category '{cat}' for {denom}, skipping."))
                    continue

                if typ:
                    type_eng = get_english_type(typ)
                    self.stdout.write(self.style.SUCCESS(f"✅ {denom} ({type_eng})"))
                else:
                    self.stderr.write(self.style.WARNING(f"Incomplete record (row {i}): missing type"))
                    type_eng = "Unknown"
                    

                # Create new Food instance
                food = Food.objects.create(
                    denomination=denom,
                    category=cat,
                    food_type=typ,
                    food_type_eng = type_eng,
                )

                # Parse ISTAT codes
                prov_codes, reg_codes = [], []
                try:
                    prov_codes = ast.literal_eval(row.get("prov_istat", "[]"))
                    reg_codes = ast.literal_eval(row.get("reg_istat", "[]"))
                except (ValueError, SyntaxError):
                    ## Handle the STG special case
                    if cat == "stg":
                        prov_codes = [row.get("prov_istat", "[]")]
                        reg_codes = [row.get("reg_istat", "[]")]
                    else:
                        self.stderr.write(self.style.WARNING(f"Invalid ISTAT format for {denom}"))
                        skipped_count += 1
                        continue

                # Link Provinces
                provinces = Province.objects.filter(prov_istat_code__in=prov_codes)
                if provinces.exists():
                    food.provinces.set(provinces)
                else:
                    self.stderr.write(self.style.WARNING(f"No matching provinces for {denom} ({prov_codes})"))

                # Link Regions
                regions = Region.objects.filter(reg_istat_code__in=reg_codes)
                if regions.exists():
                    food.regions.set(regions)
                else:
                    self.stderr.write(self.style.WARNING(f"No matching regions for {denom} ({reg_codes})"))

                created_count += 1
                category_counter[cat] += 1

                if verbose:
                    self.stdout.write(
                        f"[{i}/{total_rows}] Added {denom} ({cat.upper()}) with "
                        f"{len(reg_codes)} region(s), {len(prov_codes)} province(s)."
                    )

        # --- Summary ---
        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS("✅ Import Summary"))
        self.stdout.write(self.style.SUCCESS(f"   Created: {created_count}"))
        self.stdout.write(self.style.WARNING(f"   Skipped: {skipped_count}"))
        self.stdout.write("")

        if category_counter:
            self.stdout.write(self.style.SUCCESS("📊 Category Breakdown:"))
            for cat, count in category_counter.items():
                self.stdout.write(f"   {cat.upper():<5} → {count}")
        else:
            self.stdout.write(self.style.WARNING("No valid categories processed."))

        self.stdout.write("")
        self.stdout.write(self.style.SUCCESS("🍽️ Food data import complete."))
