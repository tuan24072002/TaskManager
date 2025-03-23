import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Mongodb connected successfully!`);

    } catch (error) {
        console.log(`DB Error Connection: `, error.message);
    }
}

export const createAccessToken = (user) => {
    return jwt.sign(
        { userId: user._id, tokenSecretVersion: user.tokenSecretVersion },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: '5m' }
    );
};

export const createRefreshToken = (user) => {
    return jwt.sign(
        { userId: user._id, tokenSecretVersion: user.tokenSecretVersion },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: '3h' }
    );
};
export const formatDate = (date) => {
    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const month = date.toLocaleString("en-US", { month: "2-digit" });
    const year = date.toLocaleDateString("en-US", { year: "2-digit" });

    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
};