import makeValidation from '@withvoid/make-validation';
import User, { USER_TYPES } from '../models/userModel.js';
import debug from 'debug';
export default {
	onCreateUser: async (req, res) => {
		try {
			const validation = makeValidation((types) => ({
				payload: req.body,
				checks: {
					firstName: { type: types.string },
					lastName: { type: types.string },
					type: { type: types.enum, options: { enum: USER_TYPES } },
				},
			}));
			if (!validation.success) return res.status(400).json({ ...validation });

			const { firstName, lastName, type } = req.body;
			const user = await User.createUser(firstName, lastName, type);
			return res.status(200).json({ data: { msg: true, user } });
		} catch (err) {
			return res.status(500).json({ data: { msg: false, error: err } });
		}
	},
	onGetAllUsers: async (req, res) => {
		try {
			const users = await User.getUsers();
			return res.status(200).json({ data: { msg: true, users } });
		} catch (err) {
			return res.status(500).json({ data: { msg: false, error: err } });
		}
	},
	onGetUserById: async (req, res) => {
		try {
			const user = await User.getUserById(req.params.id);
			return res.status(200).json({ data: { msg: true, user } });
		} catch (err) {
			return res.status(500).json({ msg: false, error: err });
		}
	},
	onUpdateUserById: async (req, res) => {
		try {
			const validation = makeValidation((types) => ({
				payload: req.body,
				checks: {
					firstName: { type: types.string },
					lastName: { type: types.string },
				},
			}));
			if (!validation.success) return res.status(400).json({ ...validation });
			const { firstName, lastName } = req.body;
			const result = await User.findByIdAndUpdate(
				{ _id: req.params.id },
				{ $set: { firstName, lastName } }
			);
			return res
				.status(200)
				.json({ data: { msg: true, message: `Deleted a count of ${result.deletedCount} user.` } });
		} catch (err) {
			return res.status(500).json({ data: { msg: false, error: err } });
		}
	},
	onDeleteUserById: async (req, res) => {
		try {
			const result = await User.deleteUserById(req.params.id);
			return res
				.status(200)
				.json({ data: { msg: true, message: `Deleted a count of ${result.deletedCount} user.` } });
		} catch (err) {
			return res.status(500).json({ data: { msg: false, error: err } });
		}
	},
};
