const { authenticate, setJwtSecret, generateAccessToken } = require('./authMiddleware');

module.exports = { authenticate, generateAccessToken, setJwtSecret };