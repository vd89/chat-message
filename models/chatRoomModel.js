import mongoose from 'mongoose';

export const CHAT_ROOM_TYPES = {
	CONSUMER_TO_CONSUMER: 'consumer-to-consumer',
	CONSUMER_TO_SUPPORT: 'consumer-to-support',
};

const { model, Schema } = mongoose;

const chatRoomSchema = new Schema(
	{
		userIds: { type: Array },
		type: { type: String },
		chatInitiator: { type: String },
	},
	{ timestamps: true }
);

class ChatRoom {
	static async initiateChat(userIds, type, chatInitiator) {
		try {
			const availableRoom = await this.findOne({
				userIds: { $size: userIds.length, $all: [...userIds] },
				type,
			});
			if (availableRoom) {
				return {
					isNew: false,
					msg: 'Retrieving an old chat room',
					chatRoomId: availableRoom._doc._id,
					type: availableRoom._doc.type,
				};
			}
			const newRoom = await this.create({ userIds, type, chatInitiator });
			return {
				isNew: true,
				msg: 'Created a new Chatroom',
				chatRoomId: newRoom._doc._id,
				type: newRoom._doc.type,
			};
		} catch (err) {
			console.log('Error on start chat method', err);
			throw err;
		}
	}
}

chatRoomSchema.loadClass(ChatRoom);

export default model('ChatRoom', chatRoomSchema);
