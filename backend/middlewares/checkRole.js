import jwt from "jsonwebtoken";

// Function to verify and decode the JWT token
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                reject(err); // Token verification failed
            } else {
                resolve(decoded); // Token verified and decoded
            }
        });
    });
};

// Middleware to check if the user is a student
export const isStudent = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = await verifyToken(token);
        if (!decoded.role.includes(1)) {
            return res.status(403).json({ message: "Access denied. User is not a student" });
        }
        req.user = decoded; // Store the decoded user information in the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to check if the user is an HOD
export const isHOD = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = await verifyToken(token);
        if (!decoded.role.includes(3)) {
            return res.status(403).json({ message: "Access denied. User is not an HOD" });
        }
        req.user = decoded; // Store the decoded user information in the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to check if the user is a professor
export const isProfessor = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = await verifyToken(token);
        if (!decoded.role.includes(2)) {
            return res.status(403).json({ message: "Access denied. User is not a Professor" });
        }
        req.user = decoded; // Store the decoded user information in the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// Middleware to check if the user is an Academic Coordinator
export const isAcademicCoordinator = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(403).json({ message: "No token provided" });
    }

    try {
        const decoded = await verifyToken(token);
        if (!decoded.role.includes(4)) {
            return res.status(403).json({ message: "Access denied. User is not an Academic Coordinator" });
        }
        req.user = decoded; // Store the decoded user information in the request object
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
