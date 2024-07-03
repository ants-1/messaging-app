import Message from '../models/Message.js';
import Chat from '../models/Chat.js'
import asyncHandler from 'express-async-handler';

// @desc    get all messages from chat
// route    GET /chat/:chatId/messages
const get_all_messages = asyncHandler(async (req, res, next) => {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId).populate('Message').exec();

    const messages = chat.messages;

    if (!chat) {
        return res.status(404).json({ error: 'Chat not found'});
    }

    res.json(messages);
});

// @desc    get message from chat
// route    GET /chat/:chatId/message/:messageId
const get_message = asyncHandler(async (req, res, next) => {
    const {chatId, messageId} = req.params;
    const chat = await Chat.findById(chatId).exec();
    const message = await Message.findById(messageId).exec();

    if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
    }

    if (!message) {
        return res.status(404).json({ error: 'Message not found' });
    }

    res.json(message);
});

// @desc    add new mesaage to chat
// route    POST /chat/:chatId/message/:messageId
const add_message = asyncHandler(async (req, res, next) => {
    const { chatId } = req.params;
    const chat = await Chat.findById(chatId);

    if (!chat) {
        return res.status(404).json({ error: ' Chat not found' });
    }

    const newMessage = new Message({
        _id: req.body._id,
        sender: req.body.sender,
        content: req.body.content,
        chat: req.body.chatId,
        is_seen: req.body.is_seen,
        timestamp: req.body.timestamp,
    });

    if (!newMessage) {
        return res.status(404).json({ error: 'Error while adding message' });
    }

    chat.messages.push(newMessage._id);
    console.log(chat.messages);
    await newMessage.save();
    await chat.save();

    res.status(201).json({ message: 'Message created', newMessage});
});

// @desc    edit current message in chat
// route    PUT /chat/:chatId/message/:messageId
const edit_message = asyncHandler(async (req, res, next) => {
    const { chatId, messageId } = req.params;
    const chat = await Chat.findById(chatId).exec();
    const message = await Message.findById(messageId).exec();

    if (!chat) {
        return res.status(404).json({ error: `Chat ID: ${chatId} not found` });
    }

    if (!message) {
        return res.status(404).json({ error: `Message Id; ${messageId} not found` });
    }

    const updatedMessage = {
        _id: messageId,
        sender: req.body.sender,
        content: req.body.content,
        chat: chatId,
        is_seen: req.body.is_seen,
        timestamp: req.body.timestamp,
    };

    await message.findByIdAndUpdate(messageId, updatedMessage, { new: true });

    res.json({ message: 'Message updated', updatedMessage});
});

// @desc    delete existing message in chat
// route    DELETE /chat/:chatId/message/:messageId
const delete_message = asyncHandler(async (req, res, next) => {
    const { chatId, messageId } = req.params;
    const chat = await Chat.findById(chatId).exec();
    const message = await Message.findById(messageId).exec();

    if (!chat) {
        return res.status(404).json({ error: `Chat ID: ${chatId} not found` });
    }

    if (!message) {
        return res.status(404).json({ error: `Message Id; ${messageId} not found` });
    }

    chat.messages.filter((message) => message != messageId);
    console.log(chat.messages);
    const deletedMessage = await Message.findByIdAndDelete(messageId).exec();

    if (deletedMessage) {
        return res.status(404).json({ error: `Error while deleting message with ID: ${messageId}`});
    }

    res.json({ deleted: `Message with ID: ${messageId} successfully deleted` });
});

export default {
    get_all_messages,
    get_message,
    add_message,
    edit_message,
    delete_message,
}