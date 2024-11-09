// ./server/controllers/authController.js


const jwt = require("jsonwebtoken");
const {OAuth2Client} = require("google-auth-library");
const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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
        const userId = payload['sub']; // Google user ID

        // Generate a JWT for the user
        const token = jwt.sign({userId, email: payload.email}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({token});
    } catch (error) {
        res.status(401).json({error: 'Invalid ID token'});
    }
}

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
