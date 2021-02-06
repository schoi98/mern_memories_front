import axios from 'axios';

const url = 'https://mern-tutorial-memories.herokuapp.com/posts'; // change from local to url from heroku originally: https://localhost:5000/posts
export const fetchPosts = () => axios.get(url);
export const createPost = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`)
export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);