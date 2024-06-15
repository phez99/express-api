# Contact API Spec

## Create Contact API

Endpoint : `POST` /api/contacts
Header :

- Authorization : token

Request Body :

```json
{
  "first_name": "asep",
  "last_name": "tian",
  "email": "asep@tian.com",
  "phone": "123456789"
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "asep",
    "last_name": "tian",
    "email": "asep@tian.com",
    "phone": "123456789"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Update Contact API

Endpoint : `PUT` /api/contacts/:contactid

Header :

- Authorization : token

Request Body :

```json
{
  "data": {
    "id": 1,
    "first_name": "asep",
    "last_name": "tian",
    "email": "asep@tian.com",
    "phone": "123456789"
  }
}
```

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "asep",
    "last_name": "tian",
    "email": "asep@tian.com",
    "phone": "123456789"
  }
}
```

Response Body Error :

```json
{
  "errors": "Email is not valid format"
}
```

## Get Contact API

Endpoint : `GET` /api/contacts/:id

Header :

- Authorization : token

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "first_name": "asep",
    "last_name": "tian",
    "email": "asep@tian.com",
    "phone": "123456789"
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found!"
}
```

## Search Contact API

Endpoint : `GET` /api/contacts

Header :

- Authorization : token

Query params :

- name : Search by first_name or last_name using like, (optional)
- email : Search by email using like, (optional)
- phone : Search by phone using like, (optional)
- page : Number of page, default 1
- size : Size per page, default 10

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "first_name": "asep",
      "last_name": "tian",
      "email": "asep@tian.com",
      "phone": "123456789"
    },
    {
      "id": 2,
      "first_name": "asep2",
      "last_name": "tian2",
      "email": "asep2@tian.com",
      "phone": "126789"
    }
  ],
  "paging": {
    "page": 1,
    "total_page": 3,
    "total_item": 30
  }
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found!"
}
```

## Remove Contact API

Endpoint : `DELETE` /api/contacts/:id

Header :

- Authorization : token

Response Body Success:

```json
{
  "data": "Ok"
}
```

Response Body Error :

```json
{
  "errors": "Contact is not found!"
}
```
