import makeValidation from '@withvoid/make-validation';
import mongoose from 'mongoose';
import ChatRoom, { CHAT_ROOM_TYPES } from '../models/chatRoomModel.js';
import ChatMessage from '../models/chatMessageModel.js';
import User from '../models/userModel.js';
const { ObjectId } = mongoose.Types;

export default {
	initiate: async (req, res) => {
		try {
			const validation = makeValidation((types) => ({
				payload: req.body,
				checks: {
					userIds: {
						type: types.array,
						options: { unique: true, empty: false, stringOnly: true },
					},
					type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
				},
			}));
			if (!validation.success) return res.status(400).json({ ...validation });
			const { userIds, type } = req.body;
			const { userId: chatInitiator } = req;
			const allUserIds = [...userIds, chatInitiator];
			const chatRoom = await ChatRoom.initiateChat(allUserIds, type, chatInitiator);
			return res.status(200).json({ data: { msg: true, chatRoom } });
		} catch (err) {
			return res.status(500), json({ data: { msg: false, error: err } });
		}
	},
	postMessage: async (req, res) => {
		try {
			const { roomId } = req.params;
			const validation = makeValidation((types) => ({
				payload: req.body,
				checks: {
					messageText: { type: types.string },
				},
			}));
			if (!validation.success) return res.status(400).json({ ...validation });
			const messagePayload = {
				messageText: req.body.messageText,
			};
			const currentLoggedUser = req.userId;
			const postMessage = await ChatMessage.createPostInChatRoom(
				roomId,
				messagePayload,
				currentLoggedUser
			);

			global.io.sockets.in(roomId).emit('new message', { message: postMessage });
			console.log(' ➡️', global.io.sockets.in(roomId));
			return res.status(200).json({ data: { msg: true, postMessage } });
		} catch (err) {
			return res.status(500).json({ data: { msg: false, error: err } });
		}
	},
	getConversationByRoomId: async (req, res) => {
		try {
			const { roomId } = req.params;
			// console.log(roomId);

			return res.status(200).json({ data: { msg: true, room } });
		} catch (err) {
			return res.status(500).json({ data: { msg: false, error: err } });
		}
	},
	getAllRoom: async (req, res) => {
		try {
			const result = await ChatRoom.find();
			return res.status(200).json({ data: { msg: true, result } });
		} catch (err) {
			return res.status(500).json({ data: { msg: false, error: err } });
		}
	},
};
