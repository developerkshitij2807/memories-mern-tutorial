import express from 'express';



// Controllers
import {createPost, getPosts, updatePost} from '../controller/posts.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
//colon allows the route to be dynamic
router.patch('/:id', updatePost);

export default router;
