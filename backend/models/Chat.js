import mongoose, { Types } from "mongoose";
import { Schema } from "mongoose";

const ChatSchema = new Schema({
    name: { type: String, maxLength: 100, default: "Chat", required: true },
    is_group: { type: Boolean, default: false, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

export default mongoose.model('Chat', ChatSchema);