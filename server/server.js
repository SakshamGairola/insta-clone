import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const ORIGIN_URL = process.env.ORIGIN_URL;

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ORIGIN_URL,
		methods: ['GET', 'POST'],
	},
});

io.on('connection', (socket) => {
	console.log('New client connected');

	socket.on('likePost', (postId) => {
		io.emit('postLiked', postId);
	});

	socket.on('commentPost', (data) => {
		io.emit('postCommented', data);
	});

	socket.on('disconnect', () => {
		console.log('Client disconnected');
	});
});

server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
	console.log(ORIGIN_URL);
});
