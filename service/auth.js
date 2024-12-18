require("dotenv").config();

const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

function setUser(user) {
    const payload = {
        _id: user._id,
        email: user.email,
    };
    return jwt.sign(payload, secretKey);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        console.error("Invalid or expired token:", error.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};
