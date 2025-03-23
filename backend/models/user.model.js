import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    title: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    tasks: [{ type: mongoose.Schema.ObjectId, ref: "Task" }],
    isActive: { type: Boolean, default: true },
    tokenSecretVersion: { type: String, default: uuidv4() }
}, { timestamps: true })

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
})

userSchema.methods.matchPassword = function (enterdPassword) {
    return bcrypt.compareSync(enterdPassword, this.password);
}

userSchema.methods.updateTokenSecretVersion = function () {
    this.tokenSecretVersion = uuidv4();
}
const User = mongoose.model("User", userSchema);
export default User;