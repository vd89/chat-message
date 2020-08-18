import mongoose from 'mongoose';
import Debug from 'debug';

export const USER_TYPES = {
	CONSUMER: 'consumer',
	SUPPORT: 'support',
};
const { Schema, model } = mongoose;
const debug = Debug('app:userModel');

const userSchema = new Schema(
	{
		firstName: { type: String },
		lastName: { type: String },
		type: { type: String },
	},
	{ timestamps: true }
);

class User {
	/* 
		To create new user 
		@params {string} firstName,lastName
		@return {object} new User Object Created
		*/
	static async createUser(firstName, lastName, type) {
		try {
			const user = await this.create({ firstName, lastName, type });
			return user;
		} catch (err) {
			throw err;
		}
	}
	/* 
		Get user by ID 
		@params {string} id
		@return {object} user
	*/
	static async getUserById(id) {
		try {
			const user = await this.findOne({ _id: id });
			if (!user) {
				return { errMsg: 'No user with this ID found' };
			}
			return user;
		} catch (err) {
			throw err;
		}
	}
	/* 
		Get all users
		@return {object} users
	*/
	static async getUsers() {
		try {
			const users = await this.find();
			return users;
		} catch (err) {
			throw err;
		}
	}

	/* 
		Get all the users 
		@param {Array} ids, string of user IDS
		@return {Array of Objects} users list
	 */
	static async getUserByIds(ids) {
		try {
			const users = await this.find({ _id: { $in: ids } });
			return users;
		} catch (err) {
			throw err;
		}
	}

	/* 
		Delete user by Id
		@param {String} id - id of user
		@return {object} - details of action performed 
	*/
	static async deleteUserById(id) {
		try {
			const result = await this.remove({ _id: id });
			return result;
		} catch (err) {
			throw err;
		}
	}
}

userSchema.loadClass(User);

export default model('User', userSchema);
