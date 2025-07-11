const mongoSanitize = require('mongo-sanitize');

const sanitizeMongo = (req, res, next) => {
    const sanitize = (obj) => {
        for (let key in obj) {
            obj[key] = mongoSanitize(obj[key]);
        }
    };

    if (req.body) sanitize(req.body);
    if (req.query) sanitize(req.query);
    if (req.params) sanitize(req.params);

    next();
};

module.exports = sanitizeMongo;
