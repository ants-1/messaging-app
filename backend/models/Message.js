import mongoose from "mongoose";
import { Schema } from "mongoose";

const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    chat: { type: Schema.Types.ObjectId, ref: 'Chat', required: true },
    is_seen: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', MessageSchema);