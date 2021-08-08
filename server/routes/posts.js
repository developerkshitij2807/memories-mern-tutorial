import express from "express";

// Controllers
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  incrementLikeCounter
} from "../controller/posts.js";

import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
// colon allows the route to be dynamic
router.patch("/:id", auth, updatePost);
// delete method self implemented
router.delete("/:id", auth, deletePost);
// Like controller
router.patch("/:id/likePost", auth, incrementLikeCounter);

export default router;
