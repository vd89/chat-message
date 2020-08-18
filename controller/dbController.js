import mongoose from 'mongoose';
import debug from 'debug';
import config from '../config/default.js';

const { mongoOPT, mongoUri } = config;
const { connect } = mongoose;
const Debug = debug('app:mongoose:');

export default async () => {
	try {
		await connect(mongoUri, mongoOPT);
		Debug(`Database is connected with the server.... 🚀 🚀 🚀`);
	} catch (err) {
		Debug(err);
	}
};
