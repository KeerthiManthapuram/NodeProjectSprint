
/**
 * Generic CRUD factory functions to avoid code duplication.
 * These functions accept a Mongoose model and return route handlers for typical operations.
 */

// GET ALL: Fetch all documents in a collection
const getAllFactory = (ElementModel) => {
    return async function (request, response) {
        try {
            const elementDataStore = await ElementModel.find().select('id name email phoneNumber');

            // If no data is found, throw a custom error
            if (elementDataStore.length === 0) {
                throw new Error("No user data found");
            }

            // Send success response with data
            response.status(200).json({
                status: "success",
                message: elementDataStore
            });
        } catch (err) {
            // Send failure response with error message
            response.status(404).json({
                status: "failure",
                message: err.message
            });
        }
    };
};

// GET BY ID: Fetch a single document using its ID
const getByIdFactory = (ElementModel) => {
    return async function (request, response) {
        const elementId = request.params.id;
        try {
            const element = await ElementModel.findById(elementId);

            if (!element) {
                throw new Error("No user with specified Id");
            }

            console.log("requested id: ", element);
            response.status(200).json({
                status: "success",
                message: element
            });
        } catch (err) {
            response.status(404).json({
                status: "failure",
                message: err.message
            });
        }
    };
};

// CREATE: Create a new document in the database
const createElementFactory = (ElementModel) => {
    return async function (request, response) {
        try {
            const elementDetails = request.body;
            const element = await ElementModel.create(elementDetails);

            response.status(200).json({
                status: "success",
                message: "User added successfully",
                element
            });
        } catch (err) {
            response.status(404).json({
                status: "Failure",
                message: err.message
            });
        }
    };
};

// UPDATE: Update a document by ID
const updateByIdFactory = (ElementModel) => {
    return async function (request, response) {
        const elementId = request.params.id;
        const updatedFields = request.body;
        try {
            const updatedElement = await ElementModel.findByIdAndUpdate(
                elementId,
                updatedFields,
                {
                    new: true, // Return the updated document
                    runValidators: true // Run schema validations
                }
            );

            if (!updatedElement) {
                return response.status(404).json({
                    status: "Failure",
                    message: "No user with specified Id"
                });
            }

            response.status(200).json({
                status: "success",
                message: updatedElement
            });
        } catch (err) {
            response.status(500).json({
                status: "Failure",
                message: err.message
            });
        }
    };
};

// DELETE: Delete a document by ID
const deleteByIdFactory = (ElementModel) => {
    return async function (request, response) {
        const elementId = request.params.id;
        try {
            const element = await ElementModel.findByIdAndDelete(elementId);

            if (!element) {
                throw new Error("No user with specific Id");
            }

            response.status(200).json({
                status: "success",
                message: "User deleted successfully",
                element
            });
        } catch (err) {
            response.status(404).json({
                status: "failure",
                message: err.message
            });
        }
    };
};

// Export all factory functions for use in controllers
module.exports = {
    getAllFactory,
    getByIdFactory,
    createElementFactory,
    updateByIdFactory,
    deleteByIdFactory
};
