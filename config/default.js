const config = {
	port: process.env.PORT || 5000,
	mongoUri: 'mongodb://127.0.0.1:27017/chatMessage',
	mongoOPT: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	},
	JwtSecret: 'hELLO_I_aM_tHE_tOKEN',
};
export default config;
