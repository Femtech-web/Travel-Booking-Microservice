# Payment Microservice

## Description

This service integrates with Stripe for payment processing.

> ## Content

> ## Payment

- [Get Payment](#get-payment)
- [Create Payment](#create-payment)
- [Update Payment](#update-payment)

## Get Payment

> **GET** /api/v1/payment/:id

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| param |              | Description |
| ----- | ------------ | ----------- |
| id    | **required** | payment id  |

#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "booking_id": "458b558347e789a91e9ee85b",
    "customer_id": "158b458347d889a31e9ee85a",
    "amount": "4000.00",
    "currency": "usd",
    "stripe_id": "358b458344d889a31e9ee85c",
    "stripe_status": "success",
    "createdAt": "2024-04-26T22:36:51Z",
  },
```

#### Possible Error message

```json
{
  "message": "Invalid token"
}
{
  "message": "unauthorized"
},
{
  "message": "internal server error"
}
```

---

## Create Payment

> **POST** /api/v1/payment

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| body        |              | Description              |
| ----------- | ------------ | ------------------------ |
| booking_id  | **required** | booking to pay for       |
| customer_id | **required** | customer to make payment |
| amount      | **required** | amount to pay            |
| card token  | **required** | payment card token       |
| currency    | **optional** | currency to pay          |

#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "booking_id": "458b558347e789a91e9ee85b",
    "customer_id": "158b458347d889a31e9ee85a",
    "amount": "4000.00",
    "currency": "usd",
    "stripe_id": "358b458344d889a31e9ee85c",
    "stripe_status": "success",
    "createdAt": "2024-04-26T22:36:51Z",
  },
```

#### Possible Error message

```json
{
  "message": "Invalid token"
}
{
  "message": "unauthorized"
},
{
  "message": "internal server error"
}
```

---

## Update Payment

> **PUT** /api/v1/payment

| Header        |              | Description  |
| ------------- | ------------ | ------------ |
| Authorization | **required** | Bearer Token |

| body        |              | Description              |
| ----------- | ------------ | ------------------------ |
| booking_id  | **required** | booking to pay for       |
| customer_id | **required** | customer to make payment |
| amount      | **required** | amount to pay            |
| card token  | **required** | payment card token       |
| currency    | **optional** | currency to pay          |

#### Sample Response

> Status : 200

```json
  {
    "_id": "658b558347e889a31e9ee85f",
    "booking_id": "458b558347e789a91e9ee85b",
    "customer_id": "158b458347d889a31e9ee85a",
    "amount": "4000.00",
    "currency": "usd",
    "stripe_id": "358b458344d889a31e9ee85c",
    "stripe_status": "success",
    "createdAt": "2024-04-26T22:36:51Z",
  },
```

#### Possible Error message

```json
{
  "message": "Invalid token"
}
{
  "message": "unauthorized"
},
{
  "message": "internal server error"
}
```

---
