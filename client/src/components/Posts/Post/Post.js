// material/ui-core
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import moment from "moment";

//redux
import { useDispatch } from "react-redux";
import {
  deletePost,
  incrementLikeCounter
} from "../../../redux/actions/ActionCreators";
import { Fragment } from "react";

const Post = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (props.post.likes.length > 0) {
      return props.post.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <Fragment>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {props.post.likes.length > 2
            ? `You and ${props.post.likes.length - 1} others`
            : `${props.post.likes.length} like${
                props.post.likes.length > 1 ? "s" : ""
              }`}
        </Fragment>
      ) : (
        <Fragment>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{props.post.likes.length}{" "}
          {props.post.likes.length === 1 ? "Like" : "Likes"}
        </Fragment>
      );
    }

    return (
      <Fragment>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </Fragment>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        title={props.post.title}
        image={props.post.selectedFile}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{props.post.name}</Typography>
        <Typography variant='body2'>
          {moment(props.post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {(user.result.googleId === props.post.creator ||
          user.result._id === props.post.creator) && (
          <Button
            style={{ color: "white" }}
            size={"small"}
            onClick={() => props.setCurrentId(props.post._id)}>
            <MoreHorizIcon fontSize='medium' />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' component='h2'>
          {props.post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant='h5'
        component='h2'>
        {props.post.title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          {props.post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          disabled={!user.result}
          onClick={() => dispatch(incrementLikeCounter(props.post._id))}>
          <Likes />
        </Button>
        {(user.result.googleId === props.post.creator ||
          user.result._id === props.post.creator) && (
          <Button
            size='small'
            color='secondary'
            onClick={() => dispatch(deletePost(props.post._id))}>
            <DeleteIcon fontSize='small' /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
