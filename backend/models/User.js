import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    username: { type: String, maxLength: 100, required: true },
    email: { type: String, maxLength: 256, required: true },
    password: { type: String, maxLength: 256, required: true },
    avatar_url: { type: String },
    status: { type: Boolean, default: false },
});

export default mongoose.model('User', UserSchema);