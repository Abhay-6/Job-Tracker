import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {generateAccessToken,generateRefreshToken} from "../utils/token.js"


// token generation
const generateAccessAndRefreshToken = async (userId) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};


// cookie options
const options = {
    httpOnly: true,
    secure: false
};

//register
const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new ApiError(400, "All fields are mandatory");
    }

    const user = await User.findOne({
        $or: [
            { email },
            { username }
        ]
    });

    if (user) {
        throw new ApiError(409, "User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (!newUser) {
        throw new ApiError(
            500,
            "User not created, something went wrong"
        );
    }

    const createdUser = await User
        .findById(newUser._id)
        .select("-password -refreshToken");

    return res
        .status(201)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "User registered successfully"
            )
        );
});


// login krlo
const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(
            400,
            "Email and password are required"
        );
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "User authentication failed"
        );
    }

    const { accessToken, refreshToken } =
        await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User
        .findById(user._id)
        .select("-password -refreshToken");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser
                },
                "User logged in successfully"
            )
        );
});


//fetch current user
const getCurrentUser = asyncHandler(async (req, res) => {

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                req.user,
                "Current user fetched successfully"
            )
        );
});


//logout
const logoutUser = asyncHandler(async (req, res) => {

    req.user.refreshToken = undefined;

    await req.user.save({
        validateBeforeSave: false
    });

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        );
});


// refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {

    const incomingRefreshToken =
        req.cookies?.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(
            401,
            "Refresh token is required"
        );
    }

    let decodedToken;

    try {

        decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

    } catch (error) {

        throw new ApiError(
            401,
            "Invalid or expired refresh token"
        );
    }

    const user = await User.findById(decodedToken._id);

    if (!user) {
        throw new ApiError(
            401,
            "Invalid refresh token"
        );
    }

    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(
            401,
            "Refresh token is invalid or expired"
        );
    }

    const payload = {
        _id: user._id,
        email: user.email,
        username: user.username
    };

    const newAccessToken = generateAccessToken(user);

    return res
        .status(200)
        .cookie(
            "accessToken",
            newAccessToken,
            options
        )
        .json(
            new ApiResponse(
                200,
                {},
                "Access token refreshed successfully"
            )
        );
});


//change old password
const updatePassword = asyncHandler(async (req, res) => {

    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new ApiError(
            400,
            "Old password and new password are required"
        );
    }

    const isPasswordCorrect = await bcrypt.compare(
        oldPassword,
        req.user.password
    );

    if (!isPasswordCorrect) {
        throw new ApiError(
            401,
            "Old password is incorrect"
        );
    }

    const hashedPassword = await bcrypt.hash(
        newPassword,
        10
    );

    req.user.password = hashedPassword;

    await req.user.save({
        validateBeforeSave: false
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Password updated successfully"
            )
        );
});


//update account
const updateAccountDetails = asyncHandler(async (req, res) => {

    const { username, email } = req.body;

    if (!username && !email) {
        throw new ApiError(
            400,
            "At least one field is required"
        );
    }

    if (email) {

        const existingEmail = await User.findOne({
            email,
            _id: { $ne: req.user._id }
        });

        if (existingEmail) {
            throw new ApiError(
                409,
                "Email already exists"
            );
        }

        req.user.email = email;
    }

    if (username) {

        const existingUsername = await User.findOne({
            username,
            _id: { $ne: req.user._id }
        });

        if (existingUsername) {
            throw new ApiError(
                409,
                "Username already exists"
            );
        }

        req.user.username = username;
    }

    await req.user.save();

    const updatedUser = await User
        .findById(req.user._id)
        .select("-password -refreshToken");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                updatedUser,
                "Account details updated successfully"
            )
        );
});


//delete account
const deleteAccount = asyncHandler(async (req, res) => {

    await User.findByIdAndDelete(req.user._id);

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "Account deleted successfully"
            )
        );
});


export {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    refreshAccessToken,
    updatePassword,
    updateAccountDetails,
    deleteAccount
};