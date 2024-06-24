import { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, TextField, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { likePost, commentPost } from '../utils/api';
import io from 'socket.io-client';
import { API_URL, SOCKET_URL } from '@/common/constants';

const socket = io(SOCKET_URL);

export default function Post({ post }) {
	const [likes, setLikes] = useState(post.likes);
	const [comments, setComments] = useState(post.comments);
	const [comment, setComment] = useState('');

	useEffect(() => {
		socket.on('postLiked', (postId) => {
			if (postId === post._id) {
				setLikes((prevLikes) => prevLikes + 1);
			}
		});

		socket.on('postCommented', ({ postId, newComment }) => {
			if (postId === post._id) {
				setComments((prevComments) => [...prevComments, newComment]);
			}
		});

		return () => {
			socket.off('postLiked');
			socket.off('postCommented');
		};
	}, [post._id]);

	const handleLike = async () => {
		await likePost(post._id);
		socket.emit('likePost', post._id);
	};

	const handleComment = async () => {
		const { data } = await commentPost(post._id, comment);
		socket.emit('commentPost', { postId: post._id, newComment: data.comments[data.comments.length - 1] });
		setComment('');
	};
	return (
		<Card style={styles.card}>
			<CardMedia
				component="img"
				height="300"
				image={`${API_URL}/${post.image}`}
				alt="post image"
				style={styles.media}
			/>
			<CardContent style={styles.content}>
				<Typography variant="body2" color="textSecondary" component="p">
					{post.description}
				</Typography>
				<div style={styles.actions}>
					<IconButton onClick={handleLike} style={styles.likeButton}>
						<FavoriteIcon style={{ color: likes > 0 ? 'red' : 'gray' }} />
					</IconButton>
					<Typography variant="body2" component="span">
						{likes} likes
					</Typography>
				</div>
				<div style={styles.commentSection}>
					<TextField
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						placeholder="Add a comment"
						variant="outlined"
						size="small"
						style={styles.commentInput}
					/>
					<Button onClick={handleComment} variant="contained" color="primary">
						Comment
					</Button>
				</div>
				{/* <div style={styles.comments}>
					{comments.map((c, index) => (
						<Typography key={index} variant="body2" color="textSecondary" component="p">
							<strong>{c.user.username}:</strong> {c.text}
						</Typography>
					))}
				</div> */}
			</CardContent>
		</Card>
	);
}

const styles = {
	card: {
		marginBottom: '20px',
		borderRadius: '15px',
		boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
		overflow: 'hidden',
		maxWidth: '600px',
		margin: '10 auto 10 auto',
	},
	media: {
		objectFit: 'cover',
	},
	content: {
		padding: '16px',
	},
	actions: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '8px',
	},
	likeButton: {
		padding: '0',
	},
	commentSection: {
		display: 'flex',
		alignItems: 'center',
		marginTop: '12px',
	},
	commentInput: {
		flex: 1,
		marginRight: '8px',
	},
	comments: {
		marginTop: '12px',
	},
};
