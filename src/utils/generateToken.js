const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ user: { id: user.id, role: user.role } }, 'secretKey', {
    expiresIn: '1h',
  });
};

module.exports = generateToken;
