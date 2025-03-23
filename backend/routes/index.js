import express from "express";
import userRoutes from "./user.route.js";
import taskRoutes from "./task.route.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/task", taskRoutes);

export default router;