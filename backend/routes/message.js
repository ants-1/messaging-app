import express from 'express';
import messageController from '../controllers/messageController';

const router = express.Router();

router.get('/chat/:chatId/messages', messageController.get_all_messages);

router.get('/chat/:chatId/message/:messageId', messageController.get_message);

router.post('/chat/:chatId/message/:messageId', messageController.add_message);

router.put('/chat/:chatId/message/:messageId', messageController.edit_message);

router.delete('/chat/:chatId/message/:messageId', messageController.delete_message);

export default router;