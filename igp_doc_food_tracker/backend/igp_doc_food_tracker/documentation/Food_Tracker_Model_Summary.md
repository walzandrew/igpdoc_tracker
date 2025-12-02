
# 🍽️ IGP/DOC Food Tracker — Django/PostGIS Backend Model

## 🧱 Core Models

```
 ┌───────────────────────────┐
 │        Region             │
 │───────────────────────────│
 │ reg_istat_code (PK)  CHAR(2)
 │ reg_name             VARCHAR(200)
 │ reg_acronym          CHAR(2)
 │ reg_poly             POLYGON (SRID 4326)
 │ reg_centroid         POINT (SRID 4326)
 └───────────────┬───────────┘
                 │ 1:N
                 │
 ┌───────────────▼───────────┐
 │        Province           │
 │───────────────────────────│
 │ prov_istat_code (PK) CHAR(3)
 │ prov_name          VARCHAR(200)
 │ prov_acronym       CHAR(2)
 │ parent_reg_istat_code → Region (FK)
 │ prov_poly          POLYGON (SRID 4326)
 │ prov_centroid      POINT (SRID 4326)
 └───────────────┬───────────┘
                 │ N:M
                 │
 ┌───────────────▼───────────┐
 │          Food             │
 │───────────────────────────│
 │ id (PK)              SERIAL
 │ denomination         VARCHAR(200)
 │ category             CHAR(3)  → {igp, dop, stg}
 │ food_type            VARCHAR(100)
 │ recipe               VARCHAR(1000)
 │ image_fp             VARCHAR(200)
 │ notes                VARCHAR(1000)
 │ user_rating          FLOAT
 │ eaten                BOOLEAN
 │ loc_eaten            VARCHAR(1000)
 │ point_eaten          POINT (SRID 4326)
 │───────────────────────────│
 │ M:N → Region (regions)
 │ M:N → Province (provinces)
 └───────────────────────────┘
```

---

## 🧠 Relationship Summary

| Relationship | Type | Description |
|---------------|------|-------------|
| **Region → Province** | 1:N | One region contains many provinces |
| **Province → Region** | N:1 (FK) | Each province belongs to one region |
| **Food ↔ Region** | M:N | Foods can belong to multiple regions |
| **Food ↔ Province** | M:N | Foods can belong to multiple provinces |

---

## 🌍 Spatial Fields

| Model | Field | Type | SRID |
|--------|--------|------|------|
| `Region` | `reg_poly` | PolygonField | 4326 |
| `Region` | `reg_centroid` | PointField | 4326 |
| `Province` | `prov_poly` | PolygonField | 4326 |
| `Province` | `prov_centroid` | PointField | 4326 |
| `Food` | `point_eaten` | PointField | 4326 |
