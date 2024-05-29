// Middleware to check user roles
module.exports = function(roles) {
    return function(req, res, next) {
        // Si l'utilisateur est un site ou un backoffice, autorisez la requête
        if (roles.includes('site') || roles.includes('backoffice')) {
            next();
        } else {
            // Sinon, renvoyer une erreur d'autorisation
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
    };
};
