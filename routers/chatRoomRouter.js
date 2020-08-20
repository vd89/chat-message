import express from 'express';

import controller from '../controller/chatRoomController.js';

const router = express.Router();

router.get('/chat/:roomId', controller.getConversationByRoomId);
router.post('/initiate', controller.initiate);
router.post('/:roomId/message', controller.postMessage);
router.get('/', controller.getAllRoom);

export default router;
