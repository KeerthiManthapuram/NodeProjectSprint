module.exports = (req, res, next) => {
    const start = Date.now();

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[PERF] ${req.method} ${req.originalUrl} took ${duration}ms`);
    });

    next();
};
