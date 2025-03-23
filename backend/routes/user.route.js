import express from "express";
import { isAdminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import {
    activateUserProfile,
    changeUserPassword,
    deleteUserProfile,
    getNotificationsList,
    getTeamList,
    loginUser,
    markNotificationRead,
    refreshToken,
    registerUser,
    updateUserProfile
} from "../controllers/user.controller.js";

const router = express.Router();

//PUBLIC-ROUTES
router.post("/register", registerUser);
router.post("/login", loginUser);

//PRIVATE-ROUTES
router.post("/refresh", refreshToken);
router.get("/notifications", protectRoute, getNotificationsList);
router.put("/profile", protectRoute, updateUserProfile);
router.put("/read-noti", protectRoute, markNotificationRead);
router.put("/change-password", protectRoute, changeUserPassword);

// //ADMIN-ROUTES
router.get("/get-team", protectRoute, isAdminRoute, getTeamList);
router.route("/:id")
    .put(protectRoute, isAdminRoute, activateUserProfile)
    .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;