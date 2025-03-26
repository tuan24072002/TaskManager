import express from "express";
import {
    getNotificationsList,
    markNotificationRead
} from "../controllers/notification.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/notifications", protectRoute, getNotificationsList);
router.put("/read-noti", protectRoute, markNotificationRead);

export default router;