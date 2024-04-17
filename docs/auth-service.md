# Auth Microservice

## Description

This service is in charge of all Authentication and Authorization activities and functions

> ## Content

> ## Auth

- [User Signup](#user-signup)
- [User Signin](#user-signin)
- [Refresh Access](#refresh-access)
- [User Logout](#user-logout)
- [Confirm Email](#confirm-email)
- [Forget Password](#forgot-password)
- [Reset User Password](#reset-user-password)
- [Change User Password](#change-user-password)

## User Signup

> **POST** /api/v1/auth/sign-up

| Body      |              | Description                                             |
| --------- | ------------ | ------------------------------------------------------- |
| name      | **required** | fullname of the account to be created                   |
| email     | **required** | email address of the account to be created              |
| Password1 | **required** | password of the account to be created                   |
| Password2 | **required** | repeated(confirm) password of the account to be created |

#### Sample Response

> Status : 201 Created

```json
{
  "message": "User Registration successful"
}
```

### Possible error message

```json
{
  "message": "User already exist or input validation error ",
  "errors": [
    {
      "name": "name is required"
    },
    {
      "Email": "Email is required"
    },
    {
      "Password": "Not a valid password format, must contain a number, uppercase and symbol"
    }
  ]
}
```

---

## User Signin

> **POST** /api/v1/auth/sign-in

| Body     |              | Description                                |
| -------- | ------------ | ------------------------------------------ |
| email    | **required** | email address of the account to be created |
| Password | **required** | password of the account to be created      |

## Sample Response

> Status: 200 Ok

```json
{
  "user": {
    "id": "658b558347e889a31e9ee85f",
    "name": "John Doe",
    "email": "JohnDoe@gmail.com",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImZhbnRhY29rZUBnbWFpbC5jb20iLCJGaXJzdF9uYW1lIjoiRmFudGEiLCJMYXN0X25hbWUiOiJDb2tlIiwiVWlkIjoiNjU4YjU1ODM0N2U4ODlhMzFlOWVlODVmIiwiVXNlcl90eXBlIjoiQURNSU4iLCJleHAiOjE3MDM3NTcxNjB9.L0HiRH399fEF1EssIUGrymV9lmeth3OJtbEu0QqIt-4"
}
```

### Possible error messages

```json
  {
    "message":"user does not exist"}
   "error" :[
    {
      "email":"Invalid email address",
    },
    {
      "Password":"Invalid password"
    }
   ]

```

---

## Refresh Access

> **POST** /api/v1/auth/refresh-access

| request |              | Description                                          |
| ------- | ------------ | ---------------------------------------------------- |
| cookies | **required** | the refresh token stored by the server on the cookie |
| origin  | **optional** | the request origin                                   |

## Sample Response

> Status: 200 Ok

```json
{
  "user": {
    "id": "658b558347e889a31e9ee85f",
    "name": "John Doe",
    "email": "JohnDoe@gmail.com",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImZhbnRhY29rZUBnbWFpbC5jb20iLCJGaXJzdF9uYW1lIjoiRmFudGEiLCJMYXN0X25hbWUiOiJDb2tlIiwiVWlkIjoiNjU4YjU1ODM0N2U4ODlhMzFlOWVlODVmIiwiVXNlcl90eXBlIjoiQURNSU4iLCJleHAiOjE3MDM3NTcxNjB9.L0HiRH399fEF1EssIUGrymV9lmeth3OJtbEu0QqIt-4"
}
```

### Possible error messages

```json
  {
    "message":"invalid token"
  },
  {
    "message":"internal server error"
  }

```

---

## User Logout

> **POST** /api/v1/auth/logout

| request |              | Description                                          |
| ------- | ------------ | ---------------------------------------------------- |
| cookies | **required** | the refresh token stored by the server on the cookie |

## Sample Response

> Status: 200 Ok

```json
{
  "message": "Logout successful"
}
```

### Possible error messages

```json
  {
    "message":"invalid token"
  },
  {
    "message":"internal server error"
  }

```

---

## Confirm Email

> **POST** /api/v1/auth/confirm-email

| Body              |              | Description                     |
| ----------------- | ------------ | ------------------------------- |
| confirmationToken | **required** | confirmation token sent by mail |

| request |              | Description    |
| ------- | ------------ | -------------- |
| origin  | **optional** | request origin |

## Sample Response

> Status: 200 Ok

```json
{
  "user": {
    "id": "658b558347e889a31e9ee85f",
    "name": "John Doe",
    "email": "JohnDoe@gmail.com",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImZhbnRhY29rZUBnbWFpbC5jb20iLCJGaXJzdF9uYW1lIjoiRmFudGEiLCJMYXN0X25hbWUiOiJDb2tlIiwiVWlkIjoiNjU4YjU1ODM0N2U4ODlhMzFlOWVlODVmIiwiVXNlcl90eXBlIjoiQURNSU4iLCJleHAiOjE3MDM3NTcxNjB9.L0HiRH399fEF1EssIUGrymV9lmeth3OJtbEu0QqIt-4"
}
```

### Possible error messages

```json
  {
    "message":"invalid token"
  },
  {
    "message":"token expired"
  },
  {
    "message":"internal server error"
  }

```

---

## Forgot Password

> **POST** /api/v1/auth/forgot-password

| Body  |              | Description       |
| ----- | ------------ | ----------------- |
| email | **required** | email of the user |

| request |              | Description    |
| ------- | ------------ | -------------- |
| origin  | **optional** | request origin |

## Sample Response

> Status: 200 Ok

```json
{
  "message": "Reset password email sent"
}
```

### Possible error messages

```json
  {
    "message":"invalid email"
  },
  {
    "message":"internal server error"
  }

```

---

## Reset User Password

> **POST** /api/v1/auth/reset-password

| Body       |              | Description                       |
| ---------- | ------------ | --------------------------------- |
| resetToken | **required** | reset password token sent by mail |

## Sample Response

> Status: 200 Ok

```json
{
  "message": "Password reset successfull"
}
```

### Possible error messages

```json
  {
    "message":"invalid token"
  },
  {
    "message":"token expired"
  },
  {
    "message":"internal server error"
  }

```

---

## Change User Password

> **PATCH** /api/v1/auth/update-password

| Body     |              | Description                |
| -------- | ------------ | -------------------------- |
| password | **required** | password of user to update |

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| request |              | Description    |
| ------- | ------------ | -------------- |
| origin  | **optional** | request origin |

## Sample Response

> Status: 200 Ok

```json
{
  "user": {
    "id": "658b558347e889a31e9ee85f",
    "name": "John Doe",
    "email": "JohnDoe@gmail.com",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJFbWFpbCI6ImZhbnRhY29rZUBnbWFpbC5jb20iLCJGaXJzdF9uYW1lIjoiRmFudGEiLCJMYXN0X25hbWUiOiJDb2tlIiwiVWlkIjoiNjU4YjU1ODM0N2U4ODlhMzFlOWVlODVmIiwiVXNlcl90eXBlIjoiQURNSU4iLCJleHAiOjE3MDM3NTcxNjB9.L0HiRH399fEF1EssIUGrymV9lmeth3OJtbEu0QqIt-4"
}
```

### Possible error messages

```json
  {
    "message":"invalid password"
  },
  {
    "message":"unauthorized"
  },
  {
    "message":"internal server error"
  }

```

---
