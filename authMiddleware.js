const jwt = require('jsonwebtoken');

class JwtService {
  constructor(secret) {
    this.secret = secret;
  }

  authenticate() {
    return (req, res, next) => {
      const authHeader = req.header('Authorization');

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized - Missing or invalid token' });
      }

      const token = authHeader.substring(7);

      try {
        const { userId, gender } = jwt.verify(token, this.secret);
        if(gender!== "male" && gender!== "female") {
          return res.status(401).json({ message: 'Something went wrong, gender missing!' });
        }
        req.userId = userId;
        req.gender = gender;
        next();
      } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
      }
    };
  }

  generateAccessToken(payload) {
    if (!this.secret) {
      throw new Error('JWT secret not set. Provide a secret in the constructor or call setSecret() before generating tokens.');
    }

    const token = jwt.sign(payload, this.secret, { expiresIn: '15d' });
    if (!token) return null;
    return token;
  }
}

module.exports = {
  JwtService
};
