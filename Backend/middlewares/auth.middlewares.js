import jwt from 'jsonwebtoken'
import {ApiError} from '../utils/ApiError.js'
import {User} from '../models/user.models.js'
import {asyncHandler} from '../utils/asyncHandler.js'


const verifyJWT = asyncHandler(async(req,res,next)=>{

    const token = req.cookies?.accessToken;

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
    )

    const user = await User.findById(decodedToken._id)

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    req.user = user
    next();
})


export {verifyJWT}