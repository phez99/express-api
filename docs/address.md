# Address API Spec

## Create address API

Endpoint : `POST` /api/contacts/:contactId/addresses

Header :

- Authorization : token

Request Body :

```json
{
  "street": "jalan apa",
  "city": "kota apa",
  "province": "provinsi apa",
  "country": "negara apa",
  "postal_code": "41253"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required!"
}
```

## Update address API

Endpoint : `PUT` /api/contacts/:contactId/addresses/:addressId

Header :

- Authorization : token

Request Body :

```json
{
  "street": "jalan apa",
  "city": "kota apa",
  "province": "provinsi apa",
  "country": "negara apa",
  "postal_code": "kode pos"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Country is required!"
}
```

## Get address API

Endpoint : `GET` /api/contacts/:contactId/addresses/:addressId

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "street": "jalan apa",
    "city": "kota apa",
    "province": "provinsi apa",
    "country": "negara apa",
    "postal_code": "kode pos"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found!"
}
```

## List addresses API

Endpoint : `GET` /api/contacts/:contactId/addresses

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "street": "jalan apa",
      "city": "kota apa",
      "province": "provinsi apa",
      "country": "negara apa",
      "postal_code": "kode pos"
    },
    {
      "id": 1,
      "street": "jalan apa",
      "city": "kota apa",
      "province": "provinsi apa",
      "country": "negara apa",
      "postal_code": "kode pos"
    }
  ]
}
```

Response Body Error :

## Remove address API

Endpoint : `DELETE` /api/contacts/:contactId/addresses/:addressId

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": "Ok"
}
```

Response Body Error :

```json
{
  "errors": "Address is not found!"
}
```
