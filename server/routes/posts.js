import express from "express";

// Controllers
import {
  createPost,
  getPosts,
  updatePost,
  deletePost
} from "../controller/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
// colon allows the route to be dynamic
router.patch("/:id", updatePost);
// delete method self implemented
router.delete("/:id", deletePost);

export default router;
