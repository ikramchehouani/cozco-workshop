const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function(req, res, next) {
    const token = req.headers['authorization'];
    const role = req.headers['role']; // Extrayez le rôle des en-têtes de la demande

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Token is missing or has incorrect format' });
    }

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        req.role = role; // Passez le rôle à travers la demande
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token', error: error.message });
    }
};
