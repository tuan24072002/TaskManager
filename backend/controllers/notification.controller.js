import Notification from "../models/notification.model.js";

export const getNotificationsList = async (req, res) => {
    try {
        const { userId } = req.user;

        const notice = await Notification
            .find({
                team: { $in: [userId] },
            })
            .populate("task")
            .sort({ createdAt: -1 });

        res.status(201).json({
            success: true,
            message: "Get notifications successfully!",
            data: notice
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export const markNotificationRead = async (req, res) => {
    try {
        const { userId } = req.user;
        const { isReadAll, id } = req.body;

        if (isReadAll) {
            await Notification.updateMany(
                { team: userId, isRead: { $nin: [userId] } },
                { $push: { isRead: userId } },
                { new: true }
            )
        } else {
            await Notification.findOneAndUpdate(
                { _id: id, isRead: { $nin: [userId] } },
                { $push: { isRead: userId } },
                { new: true }
            )
        }

        const notice = await Notification
            .find({
                team: { $in: [userId] },
            })
            .populate("task")
            .sort({ createdAt: -1 });
        return res.status(201).json({
            success: true,
            data: notice,
            message: "Done"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}