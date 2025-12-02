# 🧭 IGP/DOC Food Tracker — Backend Setup Guide

## 🏗️ Overview

The **IGP/DOC Food Tracker** is a Django + PostGIS backend that manages regional food data for Italian IGP, DOP, and STG products.  
It supports geospatial features, RESTful endpoints, and an admin dashboard for managing region, province, and food data.

---

## ⚙️ Environment Setup

### 1. Create the Conda Environment

This project already includes an `environment.yml` file that specifies all required dependencies.

To create and activate the environment:

```bash
conda env create -f environment.yml
conda activate igpdoc
```

✅ This installs:
- Django  
- Django REST Framework  
- Django Filter  
- Django REST Framework GIS  
- psycopg2-binary  
- python-dotenv  
- and all other dependencies required for this backend.

> 💡 **Note:** PostgreSQL and PostGIS are installed system-wide, not in the Conda environment.

---

## 🗺️ Database Setup (PostgreSQL + PostGIS)

This backend uses a **system-wide installation** of PostgreSQL with PostGIS extensions enabled.

1. **Confirm PostgreSQL and PostGIS installation**

```bash
psql --version
postgis_full_version
```

If PostGIS is missing:
```bash
sudo apt install postgresql postgis postgresql-15-postgis-3
```

2. **Create a new database and user**

Run:
```bash
sudo -u postgres psql
CREATE DATABASE igpdoc;
CREATE USER awalz WITH PASSWORD 'your_secure_password';
ALTER ROLE awalz SET client_encoding TO 'utf8';
ALTER ROLE awalz SET default_transaction_isolation TO 'read committed';
ALTER ROLE awalz SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE igpdoc TO awalz;
\q
```

3. **Enable PostGIS in your database**

```bash
psql -d igpdoc -U awalz -h localhost
CREATE EXTENSION postgis;
\q
```

4. **Create a local `.env` file**

Define your credentials and connection settings locally:
```bash
DATABASE_NAME=igpdoc
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

> ⚠️ **Do not commit your `.env` file** — it should stay in your local environment and be added to `.gitignore`.

---

## 🚀 Django Initialization

### 1. Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### 2. Create a Superuser

```bash
python manage.py createsuperuser
```

### 3. Run the Development Server

```bash
python manage.py runserver
```

Then visit:  
🌐 http://127.0.0.1:8000/admin/ — to access the admin dashboard.

---

## 📦 Data Loading

### 1. Load Regions and Provinces (GeoJSON)

```bash
python manage.py load_regions --reset
python manage.py load_provinces --reset
```

### 2. Load Foods (CSV)

```bash
python manage.py load_foods --reset --verbose
```

Your CSV should be located at:
```
data/PDFPlumber_DOP_IGC_Cleaned_Codified_Italian07112025.csv
```

---

## 🌍 API Endpoints

### **Base URL**
```
http://127.0.0.1:8000/api/
```

### **Available Endpoints**

| Resource | Endpoint | Description |
|-----------|-----------|-------------|
| Regions | `/api/regions/` | List or retrieve all Italian regions |
| Provinces | `/api/provinces/` | List or retrieve provinces |
| Foods | `/api/foods/` | List, search, and filter food data |

### **Filtering & Searching**

| Example | URL |
|----------|-----|
| All foods in region `01` | `/api/foods/?regions__reg_istat_code=01` |
| All foods in province `034` | `/api/foods/?provinces__prov_istat_code=034` |
| All DOP foods | `/api/foods/?category=dop` |
| Search foods | `/api/foods/?search=prosciutto` |
| Filter eaten foods | `/api/foods/?eaten=true` |

---

## 🧠 Developer Notes

- Environment setup is fully managed via `environment.yml`.  
- PostgreSQL + PostGIS are **system-managed** for stability and performance.  
- The backend uses **Django REST Framework** with filtering and search support.  
- All spatial fields use **EPSG:4326 (WGS84)** coordinates.  
- The admin interface supports geographic visualization of `Region` and `Province` models.  
- The `Food` model is ready for user-driven updates via the API or frontend app (e.g., marking foods as eaten or adding map points).

---

## 🧾 Related Files

| File | Description |
|------|--------------|
| `environment.yml` | Conda environment configuration |
| `load_regions.py` | Imports regional GeoJSON data |
| `load_provinces.py` | Imports provincial GeoJSON data |
| `load_foods.py` | Imports food data CSV and links to regions/provinces |
| `Food_Tracker_Model_Summary.md` | Text-based ERD and API documentation |
