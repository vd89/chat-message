import Express from 'express';
import controller from '../controller/userController.js';

const { Router } = Express;

const router = new Router();

router
	.get('/', controller.onGetAllUsers)
	.post('/', controller.onCreateUser)
	.get('/:id', controller.onGetUserById)
	.put('/:id', controller.onUpdateUserById)
	.delete('/:id', controller.onDeleteUserById);

export default router;
