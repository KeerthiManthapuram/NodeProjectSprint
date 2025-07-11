# Comprehensive API Development and Management

This project demonstrates a fully-featured RESTful API built using Node.js, Express, and MongoDB. It includes CRUD operations, authentication, error handling, performance optimizations, and a basic security audit.

---

## Features
- Full CRUD operations for user resource
- JWT-based authentication
- MongoDB with Mongoose
- Middleware for validation, sanitization, XSS protection
- Global error handling
- HTTPS enforcement for production
- Modular architecture
- Swagger/Postman documentation

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-project-folder>

-> Install dependencies:
    npm install

-> Create a .env file:
    PORT=3000
    DB_USER=<your_db_username>
    DB_PASSWORD=<your_db_password>
    JWT_SECRET=<your_jwt_secret>
    NODE_ENV=development

-> Start the server:
    npm start

-> Authentication:
    Use /users/auth/signup to register and /users/auth/login to receive a JWT token.
    Token should be sent in the Authorization header as:
        Bearer <your_token>

-> API Documentation:
    Full API documentation is available here: docs/API_DOCUMENTATION.md

-> Security Audit:
    Findings are documented in docs/SECURITY_AUDIT.md

-> Performance Optimization Report
    See docs/PERFORMANCE_REPORT.md for analysis and results.

---

## `docs/API_DOCUMENTATION.md`

### **Purpose**
To describe each endpoint with examples, request parameters, and responses.

### **Content:**

```markdown
# API Documentation

Base URL: `/users`

---

## Authentication Routes

### POST `/users/auth/signup`
Registers a new user.

**Request Body**
```json
{
  "id": "u3234",
  "name": "Henry",
  "email": "henry@gmail.com",
  "password": "securepass123",
  "confirmPassword": "securepass123",
  "phoneNumber": "9876543210"
}
Response:
    201 Created: User registered successfully.

### POST `/users/auth/login`
Logs in a user and returns a JWT.

Request body:
    {
        "email": "keerthi@example.com",
        "password": "securepass123"
    }
Response:
    200 OK: JWT token in cookie and response body.


### POST `/users/auth/logout`
    Clears JWT token.


User Routes (Protected):
    GET `/users`
        Returns a list of users.
        Requires JWT token.

    GET `/users/:id`
        Returns user by ID.
        Requires JWT token.

    POST `/users`
        Create a new user (duplicate of signup but useful for internal creation).
        Requires JWT token.

    PATCH `/users/:id`
        Update user by ID.
        Requires JWT token.

    Example:
    {
        "name": "New Name"
    }

    DELETE `/users/:id`
        Delete user by ID.
        Requires JWT token.

###Status Codes
200 OK: Successful request

201 Created: Resource created

400 Bad Request: Missing or invalid input

401 Unauthorized: Invalid or missing token

404 Not Found: User or resource not found

500 Internal Server Error: Server-side 


###Headers Required

Authorization: Bearer <JWT Token>
Content-Type: application/json


---

## `docs/SECURITY_AUDIT.md`

### **Purpose**
Lists the security vulnerabilities considered and measures taken.

### **Content:**

```markdown
# Security Audit Report

## Measures Implemented

### 1. XSS Protection
- Used `xss` module to sanitize user input.

### 2. NoSQL Injection
- Used `mongo-sanitize` to prevent query injection.

### 3. Password Hashing
- Passwords are hashed using `bcrypt` before saving.

### 4. HTTPS Enforcement
- Middleware enforces HTTPS in production environments.

### 5. HTTP Headers Hardening
- Used `helmet` to set secure HTTP headers.

### 6. JWT Authentication
- Tokens are signed with secret and stored in HTTP-only cookies.

---

## Findings & Recommendations

| Vulnerability       | Status   | Recommendation                                |
|---------------------|----------|-----------------------------------------------|
| SQL/NoSQL Injection | Secured  | Continue using mongo-sanitize and validation. |
| XSS Attacks         | Secured  | Ensure nested inputs are sanitized.           |
| JWT Handling        | Secured  | Consider rotating secrets periodically.       |
| Password Handling   | Secured  | Follow strong hashing (bcrypt 12+ salt).      |



