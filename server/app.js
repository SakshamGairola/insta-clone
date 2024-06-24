import express, { json, static as serveStatic } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';

import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(json());

app.use('/uploads', serveStatic('uploads'));
app.use('/api/posts', postRoutes);

connect(MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export default app;
