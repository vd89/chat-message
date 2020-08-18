import Express from 'express';
import { encode } from '../middleware/jwt.js';

const { Router } = Express;

const router = new Router();

router.post('/login/:userId', encode, (req, res, next) => {
	return res.status(200).json({ data: { msg: true, authorization: req.authToken } });
});

export default router;
