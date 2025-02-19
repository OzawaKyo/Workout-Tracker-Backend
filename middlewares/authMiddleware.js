import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded;
        // console.log("Decoded User:", decoded); // 🔍 Vérification ici
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
    }
};

export default authMiddleware;
