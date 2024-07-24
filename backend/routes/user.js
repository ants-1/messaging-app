import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/sign-up', userController.sign_up);

router.post('/login', userController.login);

router.get('/logout', userController.logout);

router.get('/profile/:userId', userController.get_profile);

router.put('/profile/:userId', userController.update_profile);

router.get('/users', userController.get_users);

export default router;