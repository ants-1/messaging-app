import asyncHandler from "express-async-handler";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import verifyToken from "../config/verifyToken.js";

// @desc    get all chats
// route    GET /users/:userId/chats
const get_all_chats = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const chats = await Chat.find({ users: userId }).exec();
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).jsom({ message: "User not found" });
    }

    if (!chats) {
      return res.status(404).json({ message: "No chats found" });
    }

    res.json(chats);
  }),
];

// @desc    get chat by ID
// route    GET /users/:userId/chats/:chatId
const get_chat = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { userId, chatId } = req.params;
    const chat = await Chat.findById(chatId).exec();
    const user = await Chat.find({ users: userId }).exec();

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(chat);
  }),
];

// @desc    add new chat
// route    POST /users/:userId/chats
const add_chat = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { userId } = req.params;
    const user = await User.findById(userId).exec();

    if (!user) {
      return res.status(404).json({ error: "Chat not found" });
    }

    const newChat = new Chat({
      name: req.body.name,
      is_group: req.body.is_group,
      users: req.body.users,
      messages: req.body.messages,
    });

    if (!newChat) {
      return res.status(404).json({ error: "Error while adding new chat" });
    }

    await newChat.save();

    res.status(201).json({ message: "Chat created", newChat });
  }),
];

// @desc    delete existing chat
// route    DELETE /users/:userId/chats/:chatId
const delete_chat = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { userId, chatId } = req.params;

    const user = await User.findById(userId).exec();
    if (!user) {
      return res.status(404).json({ error: `User ID: ${userId} not found` });
    }

    const chat = await Chat.findById(chatId).exec();
    if (!chat) {
      return res.status(404).json({ error: `Chat ID: ${chatId} not found` });
    }

    await Message.deleteMany({ chat: chatId }).exec();

    const deletedChat = await Chat.findByIdAndDelete(chatId).exec();
    if (!deletedChat) {
      return res
        .status(500)
        .json({ error: `Error while deleting chat with ID: ${chatId}` });
    }

    res.json({ message: `Chat with ID: ${chatId} successfully deleted` });
  }),
];

// @desc    remove user from chat
// route    DELETE /chats/:chatId/users/:userId
const remove_user = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { chatId, userId } = req.params;
    const chat = await Chat.findById(chatId).exec();
    const user = await User.findById(userId).exec();
    const userInChat = chat.users.some(
      (user) => user._id.toString() === userId
    );

    if (!chat) {
      return res
        .status(404)
        .json({ error: `Chat with ID: ${chatId} not found'` });
    }

    if (!user) {
      return res
        .status(404)
        .json({ error: `User with ID: ${userId} not found` });
    }

    if (!userInChat) {
      return res
        .status(404)
        .json({ error: `User with ID: ${userId} does not exist in chat` });
    }

    if (chat.users.length < 2 || !chat.is_group) {
      return res.status(404).json({ error: "Unable to remove user" });
    }

    chat.users = chat.users.filter((u) => u._id.toString() !== userId);
    chat.is_group = chat.users.length > 2;
    const updatedChat = await chat.save();

    res.json({
      deleted: `${user.username} has been delete from chat: ${chat.name}`,
      message: updatedChat,
    });
  }),
];

// @desc    add new user to chat
// route    ADD /chats/:chatId/users/:userId
const add_user = [
  verifyToken,
  asyncHandler(async (req, res, next) => {
    const { chatId, userId } = req.params;
    const chat = await Chat.findById(chatId).exec();
    const user = await User.findById(userId).exec();

    if (!chat) {
      return res
        .status(404)
        .json({ error: `Chat with ID: ${chatId} was not found` });
    }

    if (!user) {
      return res
        .status(404)
        .json({ error: `User with ID: ${userId} was not found` });
    }

    const userInChat = chat.users.some(
      (user) => user._id.toString() === userId
    );

    if (userInChat) {
      return res
        .status(404)
        .json({ error: `User with ID: ${userId} already exist in chat` });
    }

    chat.users.push(user._id);
    chat.is_group = chat.users.length > 2;
    const updatedChat = await Chat.findByIdAndUpdate(chatId, chat);

    res.json({ message: "User successfully added to chat", chat: updatedChat });
  }),
];

export default {
  get_all_chats,
  get_chat,
  add_chat,
  delete_chat,
  remove_user,
  add_user,
};
