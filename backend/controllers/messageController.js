import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import asyncHandler from "express-async-handler";

// @desc    get all messages from chat
// route    GET /chats/:chatId/messages
const get_all_messages = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId).populate('messages').exec();

  const messages = chat.messages;

  if (!chat) {
    return res.status(404).json({ message: "No chats not found" });
  }

  res.json(messages);
});

// @desc    get message from chat
// route    GET /chats/:chatId/messages/:messageId
const get_message = asyncHandler(async (req, res, next) => {
  const { chatId, messageId } = req.params;
  const chat = await Chat.findById(chatId).exec();
  const message = await Message.findById(messageId).exec();
  const checkMessageInChat = chat.messages.some(
    (message) => message.toString() === messageId
  );

  if (!chat) {
    return res.status(404).json({ error: "Chat not found" });
  }

  if (!message || !checkMessageInChat) {
    return res.status(404).json({ error: "Message not found" });
  }

  res.json(message);
});

// @desc    add new mesaage to chat
// route    POST /chats/:chatId/messages
const add_message = asyncHandler(async (req, res, next) => {
  const { chatId } = req.params;
  const chat = await Chat.findById(chatId);

  if (!chat) {
    return res.status(404).json({ error: " Chat not found" });
  }

  const newMessage = new Message({
    sender: req.body.sender,
    content: req.body.content,
    chat: chatId,
    is_seen: req.body.is_seen,
    timestamp: req.body.timestamp,
  });

  if (!newMessage) {
    return res.status(404).json({ error: "Error while adding message" });
  }

  chat.messages.push(newMessage._id);
  console.log(chat.messages);
  await newMessage.save();
  await chat.save();

  res.status(201).json({ message: "Message created", newMessage });
});

// @desc    edit current message in chat
// route    PUT /chats/:chatId/messages/:messageId
const edit_message = asyncHandler(async (req, res, next) => {
  const { chatId, messageId } = req.params;
  const chat = await Chat.findById(chatId).exec();
  const message = await Message.findById(messageId).exec();

  if (!chat) {
    return res.status(404).json({ error: `Chat ID: ${chatId} not found` });
  }

  if (!message) {
    return res
      .status(404)
      .json({ error: `Message Id; ${messageId} not found` });
  }

  const updatedMessage = {
    _id: messageId,
    sender: req.body.sender,
    content: req.body.content,
    chat: chatId,
    is_seen: req.body.is_seen,
  };

  await Message.findByIdAndUpdate(messageId, updatedMessage, { new: true });

  res.json({ message: "Message updated", updatedMessage });
});

// @desc    delete existing message in chat
// route    DELETE /chats/:chatId/messages/:messageId
const delete_message = asyncHandler(async (req, res, next) => {
  const { chatId, messageId } = req.params;

  const chat = await Chat.findById(chatId).exec();
  if (!chat) {
    return res.status(404).json({ error: `Chat ID: ${chatId} not found` });
  }

  const message = await Message.findById(messageId).exec();
  if (!message) {
    return res
      .status(404)
      .json({ error: `Message ID: ${messageId} not found` });
  }

  const deletedMessage = await Message.findByIdAndDelete(messageId).exec();
  if (!deletedMessage) {
    return res
      .status(500)
      .json({ error: `Error while deleting message with ID: ${messageId}` });
  }

  chat.messages = chat.messages.filter(
    (msgId) => msgId.toString() !== messageId
  );
  await chat.save();

  res.json({ message: `Message with ID: ${messageId} successfully deleted` });
});

export default {
  get_all_messages,
  get_message,
  add_message,
  edit_message,
  delete_message,
};
