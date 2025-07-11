// Initialize database connection
require('./config/db');

// Import Express framework to build the application
const express = require('express');
const app = express();

// Import route handlers
const UserRouter = require('./routes/UserRoutes');
const authRouter = require('./routes/authRoutes');

// Import centralized error handler middleware
const errorHandler = require('./middlewares/errorHandler');

// Built-in middleware to parse incoming JSON payloads (req.body)
app.use(express.json());


// Protects against Cross-Site Scripting (XSS) attacks
// Cleans user input coming from POST, GET, and other requests to remove malicious HTML or JavaScript code
const sanitizeXSS = require('./middlewares/xssSanitizer');
app.use(sanitizeXSS);

const sanitizeRequest = require('./middlewares/sanitizeMiddleware');
app.use(sanitizeRequest);   // custom NoSQL injection sanitization


// Sets various secure HTTP headers to protect the app from well-known web vulnerabilities
// Includes protections against clickjacking, MIME sniffing, XSS, and more
const helmet = require("helmet");
app.use(helmet());

const performanceLogger = require('./middlewares/performanceLogger');
app.use(performanceLogger);


/**
 * Auth Routes (Signup, Login, Logout)
 * Example: POST /users/auth/signup
 */
app.use('/users/auth', authRouter);

/**
 * 👥 User Routes (CRUD operations on user resource)
 * All protected by JWT middleware
 * Example: GET /users/:id
 */
app.use('/users', UserRouter);

/**
 * Global Error Handler
 * Catches and formats any unhandled errors in the app
 */
app.use(errorHandler);

// Export the app instance to be used by the server file
module.exports = app;
