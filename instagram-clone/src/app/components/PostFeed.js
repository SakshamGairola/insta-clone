'use client';

import { useState, useEffect } from 'react';
import Post from './Post';
import { fetchPosts } from '@/utils/api';

export default function PostFeed() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const getPosts = async () => {
			const { data } = await fetchPosts();
			setPosts(data);
		};
		getPosts();
	}, []);

	return (
		<div style={feedStyles.container}>
			{posts.map((post) => (
				<Post key={post._id} post={post} />
			))}
		</div>
	);
}

const feedStyles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px',
	},
};

PostFeed;
