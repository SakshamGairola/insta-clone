import { Schema, model } from 'mongoose';

const postSchema = new Schema({
	image: String,
	description: String,
	likes: { type: Number, default: 0 },
	comments: [{ text: String, date: { type: Date, default: Date.now } }],
});

export default model('Post', postSchema);
