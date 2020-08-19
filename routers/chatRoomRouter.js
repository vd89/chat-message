import express from 'express';

import controller from '../controller/chatRoomController.js';

const router = express.Router();
router.post('/initiate', controller.initiate);

export default router;
