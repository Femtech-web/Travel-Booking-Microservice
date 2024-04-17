# Booking Microservice

## Description

This service is in charge of booking related functionality

> ## Content

> ## Booking

- [Get Single Booking](#get-single-booking)
- [Create Booking](#create-booking)
- [Update Booking](#update-booking)
- [Delete Booking](#delete-booking)

## Get Single Booking

> **GET** api/v1/booking/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Param |              | Description |
| ----- | ------------ | ----------- |
| id    | **required** | booking Id  |

#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "customer_id": "798b558347e589a31e9ee85d",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "Invalid id"
}
{
  "message": "unauthorized"
},
{
  "message": "token expired"
}
```

---

## Create Booking

> **POST** api/v1/booking

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Body        |              | Description                |
| ----------- | ------------ | -------------------------- |
| customer_id | **required** | customer to make a booking |

#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "customer_id": "798b558347e589a31e9ee85d",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "Invalid id"
}
{
  "message": "unauthorized"
},
{
  "message": "token expired"
}
```

---

## Update Booking

> **PUT** api/v1/booking/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| Body        |              | Description                   |
| ----------- | ------------ | ----------------------------- |
| customer_id | **required** | customer to update booking to |

#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "customer_id": "798b558347e589a31e9ee85d",
    "createdAt": "2024-04-26T22:36:51Z",
    "updatedAt": "2024-04-27T09:52:40Z"
  },
```

#### Possible Error message

```json
{
  "message": "Invalid id"
}
{
  "message": "unauthorized"
},
{
  "message": "token expired"
}
```

---

## Delete Booking

> **DELETE** api/v1/booking/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| param |              | Description       |
| ----- | ------------ | ----------------- |
| id    | **required** | booking to delete |

#### Sample Response

> Status : 200

```json
  {
   "response": "booking deleted successfully"
  },
```

#### Possible Error message

```json
{
  "message": "Invalid id"
}
{
  "message": "unauthorized"
},
{
  "message": "token expired"
}
```

---
