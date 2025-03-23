import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];
        if (token) {
            try {
                const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
                if (!decodedToken) {
                    return res.status(401).json({
                        success: false,
                        message: 'Unauthorized - Invalid token'
                    })
                }
                const response = await User.findById(decodedToken.userId).select(
                    "isAdmin email"
                );
                req.user = {
                    email: response.email,
                    isAdmin: response.isAdmin,
                    userId: decodedToken.userId,
                };
                next();
            } catch (error) {
                if (error.message === "jwt expired") {
                    return res.status(401).json({ status: false, message: "Invalid access token!" })
                }
            }
        } else {
            return res
                .status(401)
                .json({ status: false, message: "Invalid access token!" });
        }
    } catch (error) {
        console.error(error);
        return res
            .status(401)
            .json({ status: false, message: "Invalid refresh token!" });
    }
};

export const isAdminRoute = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({
            status: false,
            message: "Not authorized as admin. Try login as admin.",
        });
    }
};