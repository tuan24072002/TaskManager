import Task from "../models/task.model.js"
import Notification from "../models/notification.model.js"
import User from "../models/user.model.js";
import { formatDate } from "../utils/index.js";

export const createTask = async (req, res) => {
    try {
        const { userId } = req.user;
        const { title, team, stage, date, priority, assets, description } = req.body;

        let text = `New task has been assigned to you`;
        if (team?.length > 1) {
            text = text + ` and ${team?.length - 1} others.`;
        }
        const expiresIn = date ? formatDate(new Date(date)) : formatDate(new Date());
        text =
            text +
            ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${expiresIn}. Thank you!!!`;
        const formatTeam = Array.isArray(team) && team.length > 0 && typeof team[0] === 'object'
            ? team.map(member => member.id)
            : team;

        const task = await Task.create({
            title,
            team: formatTeam,
            stage: stage.toLowerCase(),
            date,
            priority: priority.toLowerCase(),
            assets,
            activities: [
                {
                    type: "assigned",
                    activity: text,
                    by: userId
                }
            ],
            description
        });

        await Notification.create({
            team: formatTeam,
            text,
            task: task._id
        });

        return res.status(200).json({
            success: true,
            message: "Task created successfully."
        })


    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const duplicateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);
        const newTask = await Task.create({
            ...task, title: `${task.title} - Duplicate`
        })

        await newTask.save();
        let text = `New task has been assigned to you`;
        if (team.length > 1) {
            text = text + ` and ${team?.length - 1} others.`;
        }
        text =
            text +
            ` The task priority is set a ${priority} priority, so check and act accordingly. The task date is ${new Date(
                date
            ).toDateString()}. Thank you!!!`;

        await Notification.create({
            team,
            text,
            task: newTask._id
        });

        return res.status(200).json({
            success: true,
            message: "Task duplicated successfully."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const postTaskActivity = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const { type, activity } = req.body;

        const task = await Task.findById(id);
        const data = {
            type,
            activity,
            by: userId
        }
        task.activities = data;
        await task.save();
        res.status(200).json({
            success: true,
            message: "Activity posted successfully."
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const dashboardStatistics = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;
        const allTasks = isAdmin ?
            await Task.find({
                isTrashed: false,
            }).populate({
                path: "team",
                select: "name role title email"
            }).sort({ _id: -1 }) :
            await Task.find({ isTrashed: false, team: { $all: [userId] } }).populate({
                path: "team",
                select: "name role title email"
            }).sort({ _id: -1 });

        const users = await User.find({ isActive: true })
            .select("name title role isAdmin isActive createdAt")
            .limit(10)
            .sort({ _id: -1 });

        // group task by stage and calculate counts
        const groupTasks = allTasks.reduce((result, task) => {
            const stage = task.stage;
            if (!result[stage]) {
                result[stage] = 1;
            } else {
                result[stage] += 1;
            }
            return result;
        }, {});
        // group task by priority
        const groupData = Object.entries(
            allTasks.reduce((result, task) => {
                const priority = task.priority;
                result[priority] = (result[priority] || 0) + 1;
                return result;
            }, {})
        ).map(([name, total]) => ({ name, total }))
        // calculate total tasks
        const totalTasks = allTasks.length;
        const last10Task = allTasks.slice(0, 10);

        const summary = {
            totalTasks,
            last10Task,
            users: isAdmin ? users : [],
            tasks: groupTasks,
            graphData: groupData // for chart
        }

        res.status(200).json({
            success: true,
            message: "Successfully",
            data: summary
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const getTasks = async (req, res) => {
    try {
        const { stage, isTrashed } = req.query;
        const { userId, isAdmin } = req.user;
        let query = { isTrashed: isTrashed ? true : false };
        if (stage) {
            query.stage = stage;
        }
        if (!isAdmin) {
            query.team = { $all: [userId] }
        }
        const tasks = await Task
            .find(query)
            .populate({
                path: "team",
                select: "name title role email"
            })
            .populate({
                path: "activities.by",
                select: "name",
            })
            .sort({ _id: -1 });

        res.status(200).json({
            success: true,
            message: "Get tasks successfully.",
            data: tasks
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const getTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id)
            .populate({
                path: "team",
                select: "name title role email",
            })
            .populate({
                path: "activities.by",
                select: "name",
            })
            .sort({ _id: -1 });

        res.status(200).json({
            success: true,
            message: "Get task successfully.",
            data: task,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const createSubTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, tag, date } = req.body;

        const newSubTask = {
            title,
            tag,
            date
        }
        const task = await Task.findById(id);
        task.subTasks.push(newSubTask);
        await task.save();

        res.status(200).json({
            success: true,
            message: "SubTask added successfully."
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { isAdmin } = req.user;
        const {
            title,
            date,
            team,
            stage,
            priority,
            assets,
            description
        } = req.body;
        const formatTeam = Array.isArray(team) && team.length > 0 && typeof team[0] === 'object'
            ? team.map(member => member.id || member._id)
            : team;

        const task = await Task.findById(id);
        if (isAdmin) {
            task.title = title;
            task.date = date;
            task.team = formatTeam;
            task.stage = stage.toLowerCase();
            task.priority = priority.toLowerCase();
            task.assets = assets;
            task.description = description;
        } else {
            task.stage = stage.toLowerCase();
        }
        await task.save();

        res.status(200).json({
            success: true,
            message: "Task duplicated successfully."
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const trashTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        task.isTrashed = true;

        await task.save();

        res.status(200).json({
            success: true,
            message: `Task trashed successfully.`,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const deleteRestoreTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { actionType } = req.query;

        if (actionType === "delete") {
            await Task.findByIdAndDelete(id);
        } else if (actionType === "softDelete") {
            await Task.findByIdAndUpdate(
                { _id: id },
                { isTrashed: true },
                { new: true }
            );
        } else if (actionType === "deleteAll") {
            await Task.deleteMany({ isTrashed: true });
        } else if (actionType === "restore") {
            const resp = await Task.findById(id);
            resp.isTrashed = false;
            resp.save();
        } else if (actionType === "restoreAll") {
            await Task.updateMany(
                { isTrashed: true },
                { $set: { isTrashed: false } }
            );
        }

        res.status(200).json({
            success: true,
            message: `Operation performed successfully.`,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}