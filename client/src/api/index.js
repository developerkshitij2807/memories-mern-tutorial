import axios from "axios";

const url = "http://localhost:5000/posts";

export const fetchPosts = () => axios.get(url);

export const createPost = (newPost) => axios.post(url, newPost);

// Our patch request will recieve an post id and updated data of new post, which will be later updated 
export const updatePost = (postId, updatedPost) =>
  axios.patch(`${url}/${postId}`, updatedPost);
