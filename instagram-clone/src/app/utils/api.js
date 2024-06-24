import axios from 'axios';
import { API_URL } from '@/common/constants';

const API = axios.create({
	baseURL: `${API_URL}/api/posts`,
});
export const fetchPosts = () => API.get('/');
export const createPost = (formData) => API.post('/', formData);
export const likePost = (id) => API.post(`/${id}/like`);
export const commentPost = (id, comment) => API.post(`/${id}/comment`, { text: comment });
