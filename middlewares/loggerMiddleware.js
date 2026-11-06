const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] METHOD: ${req.method} - ENDPOINT: ${req.originalUrl}`);
    next();
};

module.exports = loggerMiddleware;