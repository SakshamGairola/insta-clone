'use client';

import { useEffect, useState } from 'react';
import { fetchPosts } from '@/utils/api';
import PostFeed from '@/components/PostFeed';
import PostForm from '@/components/PostForm';
import { Container, Typography } from '@mui/material';

export default function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			const { data } = await fetchPosts();
			setPosts(data);
		};
		getPosts();
	}, []);

	const handleNewPost = (post) => {
		setPosts((prevPosts) => [post, ...prevPosts]);
	};

	return (
		<Container>
			<Typography variant="h4" component="h1" gutterBottom style={{ textAlign: 'center', margin: '20px 0' }}>
				My Instagram Clone
			</Typography>
			<PostForm onNewPost={() => window.location.reload()} />
			<PostFeed />
		</Container>
	);
}
