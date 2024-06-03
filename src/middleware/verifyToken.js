const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

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
