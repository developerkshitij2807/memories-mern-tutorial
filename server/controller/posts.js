import mongoose from "mongoose";
// Models
import PostMessage from "../models/postMessage.js";

// In the controller we write all operations(CRUD), that take place. C - Create, R - Read, U - Update, D - Delete

// Reading a post
export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

// Creating a post
export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = PostMessage(post);
  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

// Updating a post
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  // Is the ID valid or not
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Error, No post with this ID");

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true
    }
  );

  res.status(201).json(updatedPost);
};

// Deleting a post
// Note: Very Important to destructure the ID when you are working with mongoose
export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("Error, No post with this ID");

  await PostMessage.findByIdAndDelete(_id);

  res.status(200).json({ message: "Deleted Successfully" });
};
