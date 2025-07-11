// middlewares/xssSanitizer.js
const xss = require("xss");

const sanitizeXSS = (req, res, next) => {
    const sanitize = (obj) => {
        for (let key in obj) {
            if (typeof obj[key] === "string") {
                obj[key] = xss(obj[key]);
            } else if (typeof obj[key] === "object" && obj[key] !== null) {
                sanitize(obj[key]); // recursively sanitize nested objects
            }
        }
    };

    if (req.body) sanitize(req.body);
    if (req.query) sanitize(req.query);
    if (req.params) sanitize(req.params);

    next();
};

module.exports = sanitizeXSS;
