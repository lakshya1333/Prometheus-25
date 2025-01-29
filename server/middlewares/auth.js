import jwt from "jsonwebtoken"

export function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) res.status(403).json({ message: "Unauthorized" });
        req.userId = decoded.userId;
        next();
    })
}