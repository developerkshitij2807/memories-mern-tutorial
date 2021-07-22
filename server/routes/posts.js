import express from "express";

// Controllers
import {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  incrementLikeCounter
} from "../controller/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
// colon allows the route to be dynamic
router.patch("/:id", updatePost);
// delete method self implemented
router.delete("/:id", deletePost);
// Like controller
router.patch("/:id/likePost", incrementLikeCounter);

export default router;
