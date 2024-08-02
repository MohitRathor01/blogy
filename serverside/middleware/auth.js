const { verifyToken } = require('../utils/jwt');

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer <token>
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    req.userId = decoded.userId;
    next();
};

module.exports = { isAuthenticated };
