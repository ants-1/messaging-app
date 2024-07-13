import express from 'express';
import messageController from '../controllers/messageController.js';

const router = express.Router();

router.get('/chats/:chatId/messages', messageController.get_all_messages);

router.get('/chats/:chatId/messages/:messageId', messageController.get_message);

router.post('/chats/:chatId/messages', messageController.add_message);

router.put('/chats/:chatId/messages/:messageId', messageController.edit_message);

router.delete('/chats/:chatId/messages/:messageId', messageController.delete_message);

export default router;