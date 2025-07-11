// Import Express to define routes
const express = require('express');

// Create a new router instance specifically for user-related routes
const UserRouter = express.Router();

// Import controller functions to handle business logic for users
const {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUserById
} = require('../controller/UserController');

// Import authentication middleware to protect private routes
const { protectRouteMiddleware } = require('../middlewares/auth');

// Import middleware to validate input data before proceeding
const { checkInput } = require('../middlewares/validateRequest');


/***************************************
 * 👥 User Routes
 * All routes below are protected by JWT authentication middleware.
 * CRUD operations are supported: Create, Read, Update, Delete
 ****************************************/

/**
 * Route: POST /users/
 * Description: Create a new user (requires JWT + body data)
 */
UserRouter.post("/", protectRouteMiddleware, checkInput, createUser);

/**
 * Route: GET /users/:id
 * Description: Retrieve a specific user by ID (requires JWT)
 */
UserRouter.get("/:id", protectRouteMiddleware, getUserById);

/**
 * Route: GET /users/
 * Description: Retrieve a list of all users (requires JWT)
 */
UserRouter.get("/", protectRouteMiddleware, getAllUsers);

/**
 * Route: PATCH /users/:id
 * Description: Update user information by ID (requires JWT + body data)
 */
UserRouter.patch("/:id", protectRouteMiddleware, checkInput, updateUser);

/**
 * Route: DELETE /users/:id
 * Description: Delete a user by ID (requires JWT)
 */
UserRouter.delete("/:id", protectRouteMiddleware, deleteUserById);


// Export the configured user router to use in app.js
module.exports = UserRouter;
