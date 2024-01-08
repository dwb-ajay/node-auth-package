const jwt = require('jsonwebtoken');

const setJwtSecret = (secret) => {
  jwt.secret = secret;
};

const authenticate = (secret) => (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized - Missing or invalid token' });
  }

  const token = authHeader.substring(7); 

  try {
    const { userId } = jwt.verify(token, secret);
    req.userId = userId; 
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const generateAccessToken = (secret, payload) => {
    const token = jwt.sign(payload, secret, { expiresIn: '15d' });
    if(!token) return null;
    return token;
};

module.exports = { authenticate, generateAccessToken, setJwtSecret };
