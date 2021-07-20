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
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

import moment from "moment";

//redux
import { useDispatch } from "react-redux";
import { deletePost } from "../../../redux/actions/ActionCreators";

const Post = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        title={props.post.title}
        image={props.post.selectedFile}
      />
      <div className={classes.overlay}>
        <Typography variant='h6'>{props.post.creator}</Typography>
        <Typography variant='body2'>
          {moment(props.post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size={"small"}
          onClick={() => props.setCurrentId(props.post._id)}>
          <MoreHorizIcon fontSize='medium' />
        </Button>
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
        <Button size='small' color='primary' onClick={() => {}}>
          <ThumbUpAltIcon />
        </Button>
        <Button
          size='small'
          color='primary'
          onClick={() => dispatch(deletePost(props.post._id))}>
          <DeleteIcon fontSize='small' /> Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
