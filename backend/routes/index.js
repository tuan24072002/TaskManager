import express from "express";
import userRoutes from "./user.route.js";
import taskRoutes from "./task.route.js";
import notificationRoutes from "./notification.route.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/notification", notificationRoutes);

export default router;