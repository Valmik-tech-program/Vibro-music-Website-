import jwt from "jsonwebtoken";

const getTokenFromRequest = (req) => {
    const headerToken = req.headers.authorization?.startsWith("Bearer ")
        ? req.headers.authorization.split(" ")[1]
        : null;

    return headerToken || req.cookies?.token || null;
};

export const isUser = async (req, res, next) => {
    const token = getTokenFromRequest(req);

    try {
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};

export const isArtist = async (req, res, next) => {
    const token = getTokenFromRequest(req);

    try {
        if (!token) {
            return res.status(401).json({
                message: "Token not provided. You are not allowed to upload songs"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You are not an artist. You are not allowed to upload songs"
            });
        }

        req.user = decoded;

        next();
    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};