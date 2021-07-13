import React from "react";

import useStyles from "./styles";

import { useSelector } from "react-redux";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  console.log(posts);
  return <h1>Posts!</h1>;
};

export default Posts;
