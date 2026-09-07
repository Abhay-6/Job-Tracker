import {Router} from "express";
import {
    registerUser,
    loginUser,
    getCurrentUser,
    logoutUser,
    refreshAccessToken,
    updatePassword,
    updateAccountDetails,
    deleteAccount
} from "../controllers/user.controllers.js";

import {verifyJWT} from '../middlewares/auth.middlewares.js'


const router =Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get('/current-user',verifyJWT,getCurrentUser)
router.post("/logout", verifyJWT, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.patch("/update-password", verifyJWT, updatePassword);
router.patch("/update-details", verifyJWT, updateAccountDetails);
router.delete("/delete-account", verifyJWT, deleteAccount);
export default router;
