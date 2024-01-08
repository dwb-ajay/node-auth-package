const { authenticate, setJwtSecret, genereateAccessToken } = require('./authMiddleware');

module.exports = { authenticate, genereateAccessToken, setJwtSecret };