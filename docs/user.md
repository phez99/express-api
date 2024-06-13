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

Header :

- Authorization : token

Request Body :

```json
{
  "username": "pzn 1", //optional
  "password": "new password" //optional
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
  "errors": "Name length max 100"
}
```

## Get User API

Endpoint : `GET` /api/users/current

Header :

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "username": "pzn",
    "name": "codehpez"
  }
}
```

Response Body Error :

```json
{
  "errors": "Unauthorize"
}
```

## Logout User API

Endpoint : `DELETE` /api/users/logout

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
  "errors": "Unauthorize"
}
```
