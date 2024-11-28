import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';
import User from "../models/User.js";

// Initialize Google OAuth client
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Set your Google Client ID here

export const login = async (req, res) => {
    try {
        const { tokenId } = req.body; // tokenId is the ID token from the client-side (Google OAuth token)
        if (!tokenId) {
            return res.status(400).json({ error: "Token is required" });
        }
        // Verify the ID token with Google
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify the Client ID
        });

        // Extract the user information from the Google token
        const payload = ticket.getPayload();
        const { email, name } = payload;

        // Check if the user exists in the database
        let user = await User.findOne({ collegeId: email });

        if (!user) {
            // If the user doesn't exist, create a new user
            user = new User({
                fullname: name,
                collegeId: email,
                role: 'student', // Default role is 'student'
            });

            // Save the new user to the database
            await user.save();
        }
        console.log(user);
        // Create a JWT token for the logged-in user
        const jwtPayload = {
            userId: user._id,
            role: user.role,
        };

        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Respond with the JWT token and user data
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                fullname: user.fullname,
                collegeId: user.collegeId,
                role: user.role,
            },
        });
        console.log({
            message: "Login successful",
            token,
            user: {
                fullname: user.fullname,
                collegeId: user.collegeId,
                role: user.role,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};


export const registerUser = async (req, res) => {
    try {
        const { fullname, collegeId, role } = req.body;
        console.log(req.body);
        // Validate inputs
        if (!fullname || !collegeId || !role) {
            return res.status(400).json({ message: "All fields (fullname, collegeId, role) are required." });
        }

        // Check if a user with the same collegeId already exists
        const existingUser = await User.findOne({ collegeId });
        if (existingUser) {
            return res.status(400).json({ message: "User with this college ID already exists." });
        }

        // Create a new user
        const newUser = new User({
            fullname,
            collegeId,
            role,
        });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                fullname: newUser.fullname,
                collegeId: newUser.collegeId,
                role: newUser.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};
