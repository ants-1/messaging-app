import express from "express";
import chatController from "../controllers/chatController.js";

const router = express.Router();

router.get('/users/:userId/chats', chatController.get_all_chats);

router.get('/users/:userId/chats/:chatId', chatController.get_chat);

router.post('/users/:userId/chats', chatController.add_chat);

router.delete('/users/:userId/chats/:chatId', chatController.delete_chat);

router.delete('/chats/:chatId/users/:userId', chatController.remove_user);

router.post('/chats/:chatId/users/:userId', chatController.add_user);

export default router;