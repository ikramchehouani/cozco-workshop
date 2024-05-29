const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config();

const secretKey = crypto.randomBytes(32).toString('hex');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token is missing or has incorrect format' });
    }

    try {
        const verified = jwt.verify(token.split(' ')[1], secretKey);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token', error: error.message });
    }
};
