class WebSockets {
	users = [];
	// Event fired when the chat room is disconnected
	connection(client) {
		client.on('disconnect', () => {
			this.users = this.users.filter((user) => user.socketId !== client.id);
		});
		// Add identity of user mapped to the socked id
		client.on('identity', (userId) => {
			this.users.push({
				socketId: client.id,
				userId: userId,
			});
		});
		// Subscribe person to chat and other user as well
		client.on('subscribe', (room, otherUserId = '') => {
			this.subscribeOtherUser(room, otherUserId);
			client.join(room);
		});
		// Mute a chat room
		client.on('unsubscribe', (room) => {
			client.leave(room);
		});
	}
	subscribeOtherUser(room, otherUserId) {
		const userSockets = this.users.filter((user) => user.userId === otherUserId);
		userSockets.map((userInfo) => {
			const socketConn = global.io.sockets.connected(userInfo.socketId);
			if (socketConn) {
				socketConn.join(room);
			}
		});
	}
}

export default new WebSockets();
