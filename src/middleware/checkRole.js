module.exports = function(roles) {
    return function(req, res, next) {
        if (req.user && roles.includes(req.user.roles)) {
            next();
        } else {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
    };
};
