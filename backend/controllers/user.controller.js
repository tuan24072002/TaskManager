import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import { createAccessToken, createRefreshToken } from "../utils/index.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, title, role, email, password, isAdmin } = req.body;
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const user = await User.create({
            name,
            email,
            password,
            isAdmin,
            role,
            title
        })
        if (user) {
            user.password = undefined;
            res.status(201).json({
                success: true,
                data: user,
                message: "Account registered successfully",
            })
        } else {
            res.status(400).json({
                success: false,
                message: "Invalid user data"
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        setTimeout(async () => {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: "Invalid email or password."
                    });
            }
            if (!user?.isActive) {
                return res.status(401).json({
                    success: false,
                    message: "User account has been deactivated, contact the administrator",
                });
            }
            const isMatch = user.matchPassword(password);
            if (user && isMatch) {
                user.password = undefined;
                res.status(200).json({
                    success: true,
                    data: {
                        user,
                        tokens: {
                            accessToken: createAccessToken(user),
                            refreshToken: createRefreshToken(user)
                        }
                    },
                })
            } else {
                return res
                    .status(401)
                    .json({
                        success: false,
                        message: "Invalid email or password."
                    });
            }
        }, 2000);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required"
            })
        }
        try {
            const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET)

            if (!decodedRefreshToken) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized - Invalid refresh token'
                })
            }
            const user = await User.findById(decodedRefreshToken.userId);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }
            if (decodedRefreshToken.tokenSecretVersion !== user.tokenSecretVersion) {
                return res.status(401).json({
                    success: false,
                    message: "Token is no longer valid!",
                });
            }
            user.updateTokenSecretVersion();
            await user.save();
            const newAccessToken = createAccessToken(user);
            const newRefreshToken = createRefreshToken(user);
            return res.status(200).json({
                success: true,
                data: {
                    tokens: {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    }
                },
                message: "Token is refreshed successfully"
            })

        } catch (error) {
            if (error.message === "jwt expired") {
                return res.status(401).json({ success: false, message: "Refresh token is expired!" })
            }
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getTeamList = async (req, res) => {
    try {
        const users = await User.find().select("name title role email isActive createdAt");

        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getNotificationsList = async (req, res) => {
    try {
        const { userId } = req.user;

        const notice = await Notification.find({
            team: { $in: [userId] },
            isRead: { $nin: [userId] },
        }).populate("task", "title");

        res.status(201).json(notice);
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { userId, isAdmin } = req.user;

        const { _id } = req.body;

        const id = isAdmin && userId === _id ?
            userId : isAdmin && userId !== _id ?
                _id : userId;


        console.log({ id });
        const user = await User.findById(id);
        if (user) {
            user.name = req.body.name || user.name;
            user.title = req.body.title || user.title;
            user.role = req.body.role || user.role;

            const updateUser = await user.save();
            user.password = undefined;
            return res.status(201).json({
                success: true,
                message: "Profile updated successfully!",
                data: updateUser
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
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
        const { isReadType, id } = req.body;

        if (isReadType === "all") {
            await Notification.updateMany(
                { team: userId, isRead: { $nid: [userId] } },
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
        return res.status(201).json({
            success: true,
            message: "Done"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const changeUserPassword = async (req, res) => {
    try {
        const { userId } = req.user;

        const user = await User.findById(userId);

        if (user) {
            user.password = req.body.password;

            await user.save();

            res.status(201).json({
                success: true,
                message: `Password chnaged successfully.`,
            });
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const activateUserProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (user) {
            user.isActive = !user.isActive;
            await user.save();
            return res.status(201).json({
                success: true,
                message: `User account has been ${user.isActive ? "activated" : "disabled"}`
            })
        } else {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteUserProfile = async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndDelete(id);

        return res
            .status(200)
            .json({
                success: true,
                message: "User deleted successfully"
            });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}