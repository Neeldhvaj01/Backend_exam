const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    try {
        let token;

        // 1. First check Authorization header (Bearer token)
        const authHeader = req.headers["authorization"];

        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // 2. If no header token, check cookies
        if (!token && req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }

        // 3. If still no token, deny access
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // 4. Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 5. Attach user info to request object
        req.user = decoded;

        // 6. Continue to next middleware / route handler
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

module.exports = verifyToken;
