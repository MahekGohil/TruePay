const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Ensure `id` matches the payload structure
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}

module.exports = authenticateToken;
