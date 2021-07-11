import express from 'express';



// Controllers
import {getPosts} from '../controller/posts.js';

const router = express.Router();

router.get('/', getPosts);

export default router;
