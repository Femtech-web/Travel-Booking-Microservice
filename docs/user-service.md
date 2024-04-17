# User Microservice

## Description

This service is in charge of user management and functions

> ## Content

> ## User

- [Get Current User](#get-current-user)
- [Get All Users](#get-all-users)
- [Get User By ID](#get-user)
- [Update User](#update-user)
- [Update User Email](#update-user-email)
- [Delete User](#delete-user)

## Get Current User

> **GET** /api/v1/user/me

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200

```json
  {
    "id": "658b558347e889a31e9ee85f",
    "name": "John Doe",
    "email": "JohnDoe@gmail.com",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "Invalid token"
}
{
  "message": "unauthorized"
}
```

---

## Get All Users

> **GET** /api/v1/user

| Query   |              | Description             |
| ------- | ------------ | ----------------------- |
| page    | **optional** | pagination number       |
| perPage | **optional** | amount to send per page |

#### Sample Response

> Status : 200

```json
[
  {
    "id": "658b558347e889a31e9ee85f",
    "name": "John Doe",
    "email": "JohnDoe@gmail.com",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
  {
    "id": "558b558347e439a31e9ee85b",
    "name": "Amari tank",
    "email": "AmariTank@gmail.com",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  }
]
```

### Possible error message

```json
{
  "error": "Internal server error"
}
```

---

## Get User

> **GET** /api/v1/user/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Param |              | Description |
| ----- | ------------ | ----------- |
| id    | **required** | user Id     |

#### Sample Response

> Status : 200

```json
{
  "id": "558b558347e439a31e9ee85b",
  "name": "Amari tank",
  "email": "AmariTank@gmail.com",
  "createdAt": "2024-04-26T22:36:51Z",
  "updatedAt": "2024-04-27T09:52:40Z"
}
```

#### Possible Error message

```json
{
  "message": "Invalid id"
},
{
  "message": "unauthorized"
},
{
  "message": "internal server error"
}
```

---

## Update User

> **PATCH** /api/v1/user

| Body |              | Description                |
| ---- | ------------ | -------------------------- |
| name | **required** | name of the user to update |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200 Ok

```json
{
  "id": "558b558347e439a31e9ee85b",
  "name": "Amari tank",
  "email": "AmariTank@gmail.com",
  "createdAt": "2024-04-26T22:36:51Z",
  "updatedAt": "2024-04-27T09:52:40Z"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
  {
    "message": "unauthorized"
  },
```

---

## Update User Email

> **PATCH** /api/v1/user/email

| Body     |              | Description                    |
| -------- | ------------ | ------------------------------ |
| email    | **required** | email of the user to update    |
| password | **required** | password of the user to update |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200 Ok

```json
{
  "id": "558b558347e439a31e9ee85b",
  "name": "Amari tank",
  "email": "AmariTank@gmail.com",
  "createdAt": "2024-04-26T22:36:51Z",
  "updatedAt": "2024-04-27T09:52:40Z"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
  {
    "message": "unauthorized"
  },
  {
    "message": "invalid password"
  },
```

---

## Update User

> **PATCH** /api/v1/user

| Body |              | Description                |
| ---- | ------------ | -------------------------- |
| name | **required** | name of the user to update |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200 Ok

```json
{
  "id": "558b558347e439a31e9ee85b",
  "name": "Amari tank",
  "email": "AmariTank@gmail.com",
  "createdAt": "2024-04-26T22:36:51Z",
  "updatedAt": "2024-04-27T09:52:40Z"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
  {
    "message": "unauthorized"
  },
```

---

## Delete User

> **DELETE** /api/v1/user

| Body     |              | Description                    |
| -------- | ------------ | ------------------------------ |
| password | **required** | password of the user to delete |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

#### Sample Response

> Status : 200 Ok

```json
{
  "id": "558b558347e439a31e9ee85b",
  "name": "Amari tank",
  "email": "AmariTank@gmail.com",
  "createdAt": "2024-04-26T22:36:51Z",
  "updatedAt": "2024-04-27T09:52:40Z"
}
```

#### Possible error message

```json
  {
    "message":"Internal server error",

  },
  {
    "message": "unauthorized"
  },
  {
    "message": "invalid password"
  },
```

---
