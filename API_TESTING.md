# API Testing Guide

Base URL:

- Local app: `http://localhost:3000`
- API prefix: read from `.env` via `API_PREFIX`
- Current local prefix in this repo: `/api/v1`

## Quick Smoke Check

Run the automated smoke tests:

```bash
npm test
```

These verify:

- `GET /`
- `GET /api/v1/health`
- Route wiring for categories, products, and inventory
- 404 behavior for unknown routes

## Endpoints

### Root

- `GET /`
- Expected: welcome JSON

### Health

- `GET /api/v1/health`
- Expected: `{ success: true, message: "OK" }`

### Categories

- `GET /api/v1/categories`
- `GET /api/v1/categories/:id`
- `POST /api/v1/categories`
- `PATCH /api/v1/categories/:id`
- `DELETE /api/v1/categories/:id`

Example body:

```json
{
  "name": "Electronics",
  "description": "Electronic goods"
}
```

### Products

- `GET /api/v1/products`
- `GET /api/v1/products/:id`
- `POST /api/v1/products`
- `PATCH /api/v1/products/:id`
- `DELETE /api/v1/products/:id`

Example body:

```json
{
  "categoryId": "1",
  "createdById": "2",
  "name": "Wireless Mouse",
  "sku": "MOUSE-001",
  "barcode": "1234567890",
  "price": 25.5,
  "imageUrl": "https://example.com/mouse.png"
}
```

Notes:

- `categoryId` is required.
- `createdById` is required and must exist in the `users` table.
- `price` must be a non-negative number.
- `sku` is auto-generated if omitted.
- `sku` and `barcode` must be unique.

### Inventory

- `GET /api/v1/inventory`
- `GET /api/v1/inventory/:id`
- `POST /api/v1/inventory`
- `PATCH /api/v1/inventory/:id`
- `DELETE /api/v1/inventory/:id`

Example body:

```json
{
  "productId": "10",
  "warehouseLocation": "A-01",
  "quantity": 12
}
```

Notes:

- `quantity` must be a non-negative number.
- `status` is optional and is auto-derived from `quantity` when omitted.

## Useful QA Checks

1. Try invalid IDs on `GET /:id`, `PATCH /:id`, and `DELETE /:id`.
2. Send negative `price` or `quantity` values and confirm you get a 400.
3. Send duplicate `sku` or `barcode` for products and confirm you get a 409.
4. Search and pagination:
   - `?page=1&limit=10`
   - `?search=mouse`
5. Confirm responses follow the common shape:
   - `success`
   - `message`
   - `data`
   - `meta` when applicable

