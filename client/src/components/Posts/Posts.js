import React from "react";

// material-ui/core
import useStyles from "./styles";
import { Grid, CircularProgress } from "@material-ui/core";

import Post from "./Post/Post";

import { useSelector } from "react-redux";

const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return !posts.length ? (
    <CircularProgress color='inherit' />
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems='stretch'
      spacing={3}>
      {posts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Posts;
