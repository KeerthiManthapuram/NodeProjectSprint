# 📘 API Documentation

**Project**: Comprehensive API Development and Management  
**Technology Stack**: Node.js, Express, MongoDB, Mongoose, JWT  
**Author**: Keerthi Manthapuram  
**Base URL**: `http://localhost:3000` (local)  
**Authentication**: Bearer JWT (in `Authorization` header or HTTP-only cookie)

---

## Overview

This RESTful API allows you to manage users through the following operations:

- Create, read, update, and delete users.
- Authenticate users using JSON Web Tokens (JWT).
- Secured with input validation, XSS & NoSQL injection sanitization, HTTPS enforcement.

---

## Authentication Endpoints

### `POST /users/auth/signup`
Register a new user.

#### Request Body (JSON)
```json
{
  "id": "user001",
  "name": "Keerthi",
  "email": "keerthi@example.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123",
  "phoneNumber": "9876543210"
}
Response:
{
  "status": "success",
  "message": "User created successfully",
  "user": { ... }
}

### POST `/users/auth/login`
Authenticate a user and return JWT.

Request Body:
{
  "email": "keerthi@example.com",
  "password": "SecurePass123"
}
Response:
{
  "status": "success",
  "token": "<JWT_TOKEN>",
  "message": "User logged in"
}
Token is also sent in an HTTP-only cookie.

### POST `/users/auth/logout`
Logout by clearing JWT cookie.

Response:
{
  "status": "success",
  "message": "User logged out successfully."
}

###User Endpoints (Protected with JWT)
All these endpoints require a valid Bearer token in the Authorization header:
Authorization: Bearer <your_token>
### GET /users
Get all users.

Response:
{
  "status": "success",
  "message": [ { "id": "...", "name": "...", ... }, ... ]
}
###GET `/users/:id`
Get user by ID.

Example
GET /users/user001

Response:
{
  "status": "success",
  "message": {
    "id": "user001",
    "name": "Keerthi",
    ...
  }
}
###POST `/users`
Create a new user.

Request Body:
{
  "id": "user002",
  "name": "Sita",
  "email": "sita@example.com",
  "password": "SecurePass456",
  "confirmPassword": "SecurePass456",
  "phoneNumber": "9876509876"
}
Response:
{
  "status": "success",
  "message": "User added successfully",
  "element": { ... }
}

### PATCH `/users/:id`
Update an existing user.

Request Body (example: updating name)
{
  "name": "Sita Updated"
}

Response:
{
  "status": "success",
  "message": {
    "id": "user002",
    "name": "Sita Updated",
    ...
  }
}

### DELETE `/users/:`id`
Delete a user by ID.

Response:
{
  "status": "success",
  "message": "User deleted successfully",
  "element": { ... }
}


 Error Responses:
Status	Message Example	Reason
400	Missing required fields: name, email	Validation error
401	Invalid or expired token.	Unauthorized access
404	No user with specified Id	Resource not found
500	Internal Server Error	Unexpected server failure


Middleware & Security Summary
protectRouteMiddleware: Verifies JWTs.

sanitizeXSS, sanitizeMongo: Prevents XSS & NoSQL injection.

helmet: Sets secure HTTP headers.

forceHttps: Redirects to HTTPS in production.

errorHandler: Handles all app-wide errors.

Notes:
All sensitive data (e.g., passwords) is hashed and never returned to clients.

Use tools like Postman to test these endpoints.

Ensure .env includes:
    PORT=3000
    JWT_SECRET=your-secret-key
    DB_USER=your-db-username
    DB_PASSWORD=your-db-password

License:
This project is protected by applicable laws and is for educational purposes only.

