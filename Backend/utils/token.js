import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };
    
    return jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

const generateRefreshToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };
    
    return jwt.sign(
        payload,
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export {
    generateAccessToken,
    generateRefreshToken
};