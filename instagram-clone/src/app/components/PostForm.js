'use client';

import { useState } from 'react';
import { Button, TextField, Card, CardContent, Typography } from '@mui/material';
import { createPost } from '../utils/api';

export default function PostForm({ onNewPost }) {
	const [description, setDescription] = useState('');
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const formData = new FormData();
		formData.append('description', description);
		formData.append('image', image);

		try {
			const { data } = await createPost(formData);
			onNewPost(data);
			setDescription('');
			setImage(null);
		} catch (error) {
			console.error('Error creating post:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Card style={formStyles.card}>
			<CardContent>
				<Typography variant="h6" gutterBottom>
					Create a New Post
				</Typography>
				<form onSubmit={handleSubmit} style={formStyles.form}>
					<TextField
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description"
						fullWidth
						multiline
						rows={3}
						variant="outlined"
						margin="normal"
						style={formStyles.textField}
					/>
					<input
						type="file"
						onChange={(e) => setImage(e.target.files[0])}
						accept="image/*"
						style={formStyles.fileInput}
					/>
					<Button type="submit" variant="contained" color="primary" disabled={loading} style={formStyles.button}>
						{loading ? 'Posting...' : 'Post'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}

const formStyles = {
	card: {
		marginBottom: '10px',
		padding: '16px',
		borderRadius: '15px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	textField: {
		marginBottom: '16px',
	},
	fileInput: {
		marginBottom: '16px',
	},
	button: {
		alignSelf: 'flex-end',
	},
};
