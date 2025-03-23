import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    team: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
    text: String,
    task: { type: mongoose.Schema.ObjectId, ref: "Task" },
    notiType: { type: String, default: "alert", enum: ["alert", "message"] },
    isRead: [{ type: mongoose.Schema.ObjectId, ref: "User" }]
}, { timestamps: true })
const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;