# User Api Spec

## Register User API

Endpoint : `POST` /api/users

Request body :

```json
{
  "username": "pzn",
  "password": "rahasia",
  "name": "codephez"
}
```

Response Body Success :

```json
{
  "data": {
    "username": "pzn",
    "name": "codephez"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username already registered"
}
```

## Login User API

Endpoint : `POST` /api/users/login

Request Body :

```json
{
  "username": "pzn",
  "password": "rahasia"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "unique token"
  }
}
```

Response Body Error :

```json
{
  "errors": "Username or password wrong!"
}
```

## Update User API

Endpoint : `PATCH` /api/users/current

Request Body :

```json
{
  "username": "pzn 1", //optional
  "password": "new password" //optional
}
```

## Get User API

## Logout User API
