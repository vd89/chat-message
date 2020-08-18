import http from 'http';
import express from 'express';
import Debug from 'debug';
import morgan from 'morgan';

import config from '../config/default.js';
import dbController from '../controller/dbController.js';

const app = express();
const port = config.port;
const debug = Debug('app:index');

app.set('port', port);
//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Database connected at
dbController();

// Server started at
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
	debug(`Server is running on port ${port}.... 🌵 🌵 🌵`);
});
