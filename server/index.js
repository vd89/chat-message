import http from 'http';
import express from 'express';
import Debug from 'debug';
import morgan from 'morgan';
import socketIo from 'socket.io';

import config from '../config/default.js';
import dbController from '../controller/dbController.js';
import router from '../routers/index.js';
import WebSockets from '../utils/WebSockets.js';

const app = express();
const port = config.port;
const debug = Debug('app:index');

app.set('port', port);
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load Router
app.use('/api/v1', router);

// Database connected at
dbController();

// Server started at
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
	debug(`Server is running on port ${port}.... 🌵 🌵 🌵`);
});

// Create socket connection
global.io = socketIo.listen(server);
global.io.on('connection', WebSockets.connection);
