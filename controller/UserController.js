// Import the Mongoose UserModel schema
const UserModel = require("../models/UserModel");  

// Import generic CRUD operation factories for reuse across models
const {
    getAllFactory,
    getByIdFactory, 
    createElementFactory,
    updateByIdFactory,
    deleteByIdFactory
} = require('../utility/crudFactory');


/*********************************************
 *           📦 User Controller Functions
 * These functions are created by wrapping the 
 * UserModel with reusable factory logic to perform:
 *  - Create
 *  - Read (single & all)
 *  - Update
 *  - Delete
 *********************************************/

// Create a new user document
const createUser = createElementFactory(UserModel);

// Retrieve a user by their unique MongoDB ID
const getUserById = getByIdFactory(UserModel);

// Retrieve all users from the collection
const getAllUsers = getAllFactory(UserModel);

// Update a user by ID with the provided fields
const updateUser = updateByIdFactory(UserModel);

// Delete a user by their ID
const deleteUserById = deleteByIdFactory(UserModel);


// Export the controller functions to be used in the UserRoutes
module.exports = {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUserById
};
