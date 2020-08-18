import Express from 'express';
import Debug from 'debug';

import userRoute from './userRouter.js';
import authRoute from './auth.js';

const { Router } = Express;
const debug = Debug('app:router');

const router = new Router();

router.get('/', async (req, res) => {
	try {
		return res.status(200).json({
			data: { name: 'API', status: 'IT_WORK', message: 'Yes, this is the correct basePath!' },
		});
	} catch (err) {
		debug(err);
	}
});

router.use('/users', userRoute);
router.use('/auth', authRoute);

export default router;
