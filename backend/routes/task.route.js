import express from "express";
import {
    createSubTask,
    createTask,
    dashboardStatistics,
    deleteRestoreTask,
    duplicateTask,
    getTask,
    getTasks,
    postTaskActivity,
    trashTask,
    updateTask,
} from "../controllers/task.controller.js";
import { protectRoute, isAdminRoute } from "../middlewares/auth.middleware.js";
import multer from "multer";
const upload = multer({ dest: "./uploads" });

const router = express.Router();

router.post("/create", protectRoute, isAdminRoute, upload.array("file"), createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);

router.get("/dashboard", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.get("/:id", protectRoute, getTask);

router.put("/create-subtask/:id", protectRoute, isAdminRoute, createSubTask);
router.put("/update/:id", protectRoute, upload.array("file"), updateTask);
router.put("/:id", protectRoute, isAdminRoute, trashTask);

router.delete("/delete-restore/:id?", protectRoute, isAdminRoute, deleteRestoreTask);

export default router;
