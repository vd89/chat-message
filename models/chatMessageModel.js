import mongoose from 'mongoose';

const { Schema, model, Types } = mongoose;

const MESSAGE_TYPE = {
	TYPE_TEXT: 'TEXT',
};

const readByRecipientSchema = new Schema(
	{
		_id: false,
		readByUserId: String,
		readAt: {
			type: Date,
			default: Date.now(),
		},
	},
	{ timestamps: false }
);

const chatMessageSchema = new Schema(
	{
		chatRoomId: String,
		message: Schema.Types.Mixed,
		type: {
			type: String,
			default: () => MESSAGE_TYPE.TYPE_TEXT,
		},
		postedByUser: String,
		readByRecipients: [readByRecipientSchema],
	},
	{
		timestamps: true,
	}
);

class ChatMessage {
	static async createPostInChatRoom(chatRoomId, message, postedByUser) {
		try {
			const post = await this.create({
				chatRoomId,
				message,
				postedByUser,
				readByRecipients: { readByUserId: postedByUser },
			});
			return post;
		} catch (err) {
			throw err;
		}
	}
	static async getConByRoomId(chatRoomId, options = {}) {
		try {
			const chatRoomQuery = {
				_id: new Types.ObjectId(chatRoomId),
			};
			return this.aggregate([
				{ $match: chatRoomQuery },
				{ $sort: { createdAt: -1 } },
				// {
				// 	$lookup: {
				// 		from: 'users',
				// 		localField: 'postedByUser',
				// 		foreignField: '_id',
				// 		as: 'postedByUser',
				// 	},
				// },
				// { $unwind: '$postedByUser' },
				// { $skip: options.pag * options.limit },
				{ $limit: options.limit },
				{ $sort: { createdAt: 1 } },
			]);
		} catch (err) {
			throw err;
		}
	}
}

chatMessageSchema.loadClass(ChatMessage);

export default model('ChatMessage', chatMessageSchema);
