import { Server as SocketServer } from "socket.io";

/**
 * Khởi tạo và cấu hình Socket.io.
 * @param {http.Server} server - Instance của HTTP server được tạo từ Express.
 * @returns {SocketServer} Instance của Socket.io.
 */
export default function initSocket(server) {
    const io = new SocketServer(server, {
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            methods: ["GET", "POST"]
        }
    });
    const userRooms = new Map();
    const unreadMessages = new Map();
    const sendUserListToAdmin = () => {
        const userList = Array.from(userRooms.values()).map(entry => ({
            ...entry.user,
            unreadCount: unreadMessages.get(entry.user._id) || 0
        }));
        io.to("AdminRoom").emit("userList", userList);
    };
    io.use((socket, next) => {
        const user = socket.handshake.auth.user;
        if (!user) {
            return next(new Error("Authentication error"));
        }
        socket.data.user = user;
        next();
    });
    io.on("connection", (socket) => {
        const user = socket.data.user;
        if (user.isAdmin) {
            socket.join("AdminRoom");
        } else {
            socket.join(socket.id);
            userRooms.set(user._id, { socketId: socket.id, user });
            sendUserListToAdmin();
        }

        // Typing
        socket.on('typing', (data) => {
            if (data.sender === "user" && data.receiver === "support") {
                io.to("AdminRoom").emit('userTyping', {
                    ...data,
                    socketRoom: "AdminRoom"
                });
            } else if (data.sender === "support" && data.receiver === "user") {
                const userRoom = userRooms.get(data.userId)?.socketId;
                io.to(userRoom).emit("userTyping", data);
            } else if (data.receiver === "model") {
                socket.emit('userTyping', { sender: "model" });
            }
        });

        socket.on('stopTyping', (data) => {
            if (data.sender === "user" && data.receiver === "support") {
                io.to("AdminRoom").emit('userStoppedTyping');
            } else if (data.sender === "support" && data.receiver === "user") {
                const userRoom = userRooms.get(data.userId)?.socketId;
                if (userRoom) {
                    io.to(userRoom).emit("userStoppedTyping");
                }
            } else if (data.receiver === "model") {
                socket.emit('userStoppedTyping');
            }
        });

        //Get user list
        socket.on("getUserList", () => {
            sendUserListToAdmin();
        });

        //Send message
        socket.on("sendMessage", async (message) => {
            if (message.receiver === "support" && message.sender === "user") {
                const userId = message.userId;
                unreadMessages.set(userId, (unreadMessages.get(userId) || 0) + 1);
                io.to("AdminRoom").emit("receiveMessage", {
                    ...message,
                    socketRoom: "AdminRoom"
                });
                io.to(socket.id).emit("receiveMessage", message);
            } else if (message.sender === "support" && message.receiver === "user") {
                const userId = message.userId;
                const userRoom = userRooms.get(message.userId)?.socketId;
                unreadMessages.set(userId, 0);
                if (userRoom) {
                    io.to(userRoom).emit("receiveMessage", message);
                    io.to("AdminRoom").emit("receiveMessage", {
                        ...message,
                        socketRoom: "AdminRoom"
                    });
                }
            } else {
                io.to(socket.id).emit("receiveMessage", message);
            }
        });

        // Disconnect
        socket.on("disconnect", () => {
            if (!user.isAdmin) {
                userRooms.delete(user._id);
                sendUserListToAdmin();
            }
        });
    });

    return io;
}
