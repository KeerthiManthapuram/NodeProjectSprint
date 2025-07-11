# Postman API Testing Guide

This guide helps you understand how to use the provided Postman collection to test all API endpoints in this project.

---

## How to Import the Collection

1. Open **Postman**.
2. Click on `Import` in the top left.
3. Select the file `postman_collection.json` from the `/docs` folder.
4. The collection named **"User API Collection"** will appear in your Postman sidebar.

---

## 🌐 Set Up Postman Environment (Optional)

Create an environment in Postman with the following variables:

| Variable | Example Value           | Description              |
|----------|-------------------------|--------------------------|
| baseUrl  | http://localhost:3000   | Your local server URL    |
| jwt      | (Paste JWT token here)  | Used for Authorization   |

Then, replace URLs like:
    {baseUrl}}/users
And use a header like:
    Authorization: Bearer {{jwt}}

---

## AUTHENTICATION ROUTES

> All requests listed below are under the `/users/auth` path.

---

### 📝 POST `/signup` — Register New User

**Request URL:**
    {{baseUrl}}/users/auth/signup

**Request Body:**

```json
{
  "id": "user123",
  "name": "robinhood",
  "email": "robin@example.com",
  "password": "Secure1238!",
  "confirmPassword": "Secure1238!",
  "phoneNumber": "9876543310"
}

Success Response:
    201 Created

JWT is not returned here but user is created.

###POST /login — Login and Get JWT Token
Request URL:
    {{baseUrl}}/users/auth/login

Request Body:
    {
    "email": "robin@example.com",
    "password": "Secure1238!"
    }
Success Response:
    200 OK

Response contains:
{
  "status": "success",
  "token": "JWT_TOKEN_HERE",
  "message": "User logged in"
}
Also sets a JWT cookie

###POST /logout — Log Out
Request URL:
    {{baseUrl}}/users/auth/logout
Success Response:
    200 OK with message: User logged out successfully.

###USER CRUD ROUTES (Protected)
All routes below require a valid JWT in the Authorization header:
    Authorization: Bearer {{jwt}}
Base route for all endpoints below is /users

📄 GET /users — Get All Users
Request URL:
    {{baseUrl}}/users
Headers:
    Authorization: Bearer {{jwt}}
Success Response:
{
  "status": "success",
  "message": [
    {
      "id": "user123",
      "name": "Keerthi",
      "email": "keerthi@example.com",
      "phoneNumber": "9876543210",
      ...
    }
  ]
}


###GET /users/:id — Get User by ID
Request URL:
    {{baseUrl}}/users/user123
Headers:
    Authorization: Bearer {{jwt}}
Success Response:
{
  "status": "success",
  "message": {
    "id": "user123",
    "name": "Keerthi",
    "email": "keerthi@example.com",
    ...
  }
}
###POST /users — Create User (Internal Use)
Request URL:
    {{baseUrl}}/users
Request Body:
```json
{
  "id": "user789",
  "name": "Sita",
  "email": "sita@example.com",
  "password": "Secure456!",
  "confirmPassword": "Secure456!",
  "phoneNumber": "9999999999"
}
Headers:
    Authorization: Bearer {{jwt}}
Success Response:
{
  "status": "success",
  "message": "User added successfully",
  "element": {
    "id": "user789",
    "name": "Sita",
    ...
  }
}
###PATCH /users/:id — Update User
Request URL:
    {{baseUrl}}/users/user123
Request Body Example:
{
  "name": "Keerthi Updated"
}
Headers:
    Authorization: Bearer {{jwt}}
Success Response:
{
  "status": "success",
  "message": {
    "id": "user123",
    "name": "Keerthi Updated",
    ...
  }
}


###DELETE /users/:id — Delete User
Request URL:
    {{baseUrl}}/users/user123
Headers:
    Authorization: Bearer {{jwt}}
Success Response:
{
  "status": "success",
  "message": "User deleted successfully",
  "element": {
    "id": "user123",
    "name": "Keerthi",
    ...
  }
}

##COMMON STATUS CODES
Code:	Description
200:	OK
201:	Created
400:	Bad Request (e.g., missing field)
401:	Unauthorized (missing/invalid token)
404:    Not Found
500:	Internal Server Error


##Data Validation & Sanitization
Mongo Injection is prevented using mongo-sanitize

XSS attacks are blocked using the xss module

Inputs are validated using middleware: validateRequestBody and checkInput

##Notes
Passwords must be at least 8 characters.

confirmPassword is only used during creation and never stored.

JWT expires in 1 hour.

HTTP-only cookie is also set on login for extra security.

##Postman Collection File
The complete testable Postman collection is saved in:
docs/postman_collection.json
You can import it and test the full API.


---










Ask ChatGPT
You said:
yes generate actual postman collection.json


ChatGPT said:
✅ Here's your generated Postman collection file:
Click to download postman_collection.json

You can import it into Postman and start testing your API immediately.

Let me know if you'd like me to generate environment files or include token automation. 








Do you like this personality?




