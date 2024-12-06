// ./server/controllers/authController.js

// Author - Brett DeWitt
// Created - Friday, November 8, 2024, 2:19:49 PM
// Provides logic for '/auth' endpoints, handling user authentication via Google OAuth2
// and JWT token generation and verification for secure access

// ---------------------- Import Dependencies ----------------------
/**
 * Import required dependencies for authentication handling:
 * - JWT for token creation and verification
 * - OAuth2Client from google-auth-library for OAuth2 token verification
 * - User model for interacting with the user database
 */
const jwt = require("jsonwebtoken");
const {OAuth2Client} = require("google-auth-library");
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const { User } = require("../models");


// ---------------------- Verify OAuth2 Token ----------------------
/**
 * Verifies the OAuth2 token provided by Google and creates or fetches the user in the database.
 * - Accepts a Google ID token, verifies it, and generates a JWT for the user.
 * @param {Object} req - The request object containing the Google ID token.
 * @param {Object} res - The response object that will return the JWT or an error message.
 */
exports.verifyOauth2Token = async (req, res) => {
    const {idToken} = req.body;
    console.log(req.body);

    if (!idToken) {
        return res.status(400).json({error: 'ID token is required'});
    }

    try {
        // Verify the ID token
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID, // Replace with your Google Client ID
        });

        const payload = ticket.getPayload();
        console.log(payload);
        const googleId = payload['sub']; // Google user ID

        const userdata = {
            googleId: googleId,
            email: payload.email,
            name: payload.name
        }

        // Generate a JWT for the user
        const token = jwt.sign(userdata, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        console.log('User Model:', User);
        console.log('User Prototype Methods:', Object.keys(User.prototype));

        // If user does not exist in the db, create it
        let user = await User.findOne({ where: { googleId } });

        if (!user) {
            user = await User.create(userdata);
        }

        res.json({token});
    } catch (error) {
        res.status(401).json({error: 'Invalid ID token'});
        console.log(error);
        console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
        console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
    }
}


// ---------------------- Decode JWT and Map User ----------------------
/**
 * Decodes the JWT token and maps the user associated with the token.
 * - Extracts the JWT token from the authorization header, verifies it,
 *   and fetches the user from the database based on Google ID.
 * @param {Object} req - The request object containing the JWT token in the authorization header.
 * @param {Object} res - The response object that will return the user's internal ID or an error message.
 */
exports.decodeJWTAndMapUser = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Extract token from header
    if (!token) {
        console.log(`token: ${token}`);
        return res.status(400).json({ error: 'JWT token is required' });
    }

    try {
        // decode JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const googleId = decoded.googleId;

        // find user by Google ID
        const user = await User.findOne({ where: { googleId } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // return user's internal ID
        res.status(200).json({ userId: user.id });
    } catch (error) {
        console.error('Error decoding JWT or mapping user:', error);
        res.status(500).json({ error: 'Failed to process JWT' });
    }
};


// ---------------------- Verify JWT ----------------------
/**
 * Middleware to verify the JWT token for protected routes.
 * - Extracts and verifies the JWT token from the authorization header,
 *   and attaches the decoded user information to the request object.
 * @param {Object} req - The request object containing the JWT token in the authorization header.
 * @param {Object} res - The response object that will return an error message if the token is invalid.
 * @param {Function} next - The next middleware function to call if the token is valid.
 */
exports.verifyJWT = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    } else {
        console.log(token);
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Unauthorized: Invalid token' });
        }
        req.user = decoded;  // attaching the decoded user info to the request
        next();
    });
};
