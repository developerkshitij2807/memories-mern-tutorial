# Project Overview
Memories is a full stack MERN(MongoDB, Express, React and Node.js) social media project. This allows users to post interesting events.  
# Contents 
- [Project Creation Steps]
- 
## Project Creation Steps 


### Initial Setup 
### Dependencies to be installed 
#### Frontend dependencies(To be installed in client folder)
- [axios](https://www.npmjs.com/package/axios): Promise based HTTP client for the browser and node.js
- [moment](https://www.npmjs.com/package/moment):-A JavaScript date library for parsing, validating, manipulating, and formatting dates.
- [react-file-base64](https://www.npmjs.com/package/react-file-base64): Component for Converting Files to base64
- [redux](https://www.npmjs.com/package/redux): Redux is a predictable state container for JavaScript apps.
- [redux-thunk](https://www.npmjs.com/package/redux-thunk): Thunk middleware for Redux.
- [@material-ui/core](https://material-ui.com/getting-started/installation/): React components for faster and easier web development. Build your own design system, or start with Material Design.
- [react-redux](https://react-redux.js.org/): React Redux is maintained by the Redux team, and kept up-to-date with the latest APIs from Redux and React.
- [@material-ui/icons](https://material-ui.com/components/material-icons/): Includes the 1,100+ official Material icons converted to SvgIcon components.

#### Backend dependencies(To be installed in the server folder)
- [body-parser](https://www.npmjs.com/package/body-parser) : Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
- [nodemon](https://www.npmjs.com/package/nodemon): nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- [CORS](https://www.npmjs.com/package/cors):CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for node.
- [mongoose](https://www.npmjs.com/package/mongoose): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports both promises and callbacks.

#### 1.) Server Setup
- Create a new file called index.js 
- run npm init -y
- install the mentoined dependencies
- in the package.json file add code("type":"module"), to use the latest version of the express 

#### 2.) Client Setup 
- run cra to create a no-name react app 
- install mentioned dependencies
- remove all the files except App.js and index.js and remove relate dependencies to it as well


#### 3.) Database connection 
As we know we are using MongoDB database with our application, hence to connect it to our application, we follow the following steps
- Navigate to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) website 
- In there create a new project
- In the new project, create a new cluster
- Connect the cluster to MongoDB Atlas by the following code(s): - 
```javascript
    // MongoDB Atlas connection URL
const CONNECTION_URL =
  'mongodb+srv://<username>:<password>@cluster0.mdqnv.mongodb.net/test';

const PORT = process.env.PORT || 5000;

// This is done to avoid any error or warning which came while database was connected to server
mongoose
  .connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
)
```
- Database will be connected and a success message will be displayed on the terminal window


#### 4.) Creating a router 
- Router directs the path API call should take in order to process the task. 
- In the server folder create a folder called routes
- In the routes folder create a file called posts
- Example Shown below
- Code(s): 
    ```javascript
        // posts.js file 
        import express from 'express';
        const router = express.Router();
        // router operations if any 
        export default router;

        // index.js - to connect router and server
        import postRoutes from './routes/posts.js';
        app.use('/posts', postRoutes);
    ```

#### 5.) Creating a model
- Model is the schema for the type of database needed for storing data
- Follow similar steps as creating routes, but for model 
- use the following example to create the database
    ```javascript
    const postSchema = mongoose.Schema({
      title: String,
      message: String,
      creator: String, 
      tags: [String], 
      selectedFile: String,
      likeCount:{
          type: Number,
          default: 0
      },
      createdAt: {
          type: Date,
          default: new Date()
      } 
    });


    const PostMessage = mongoose.model('PostMessage', postSchema);

    export default PostMessage;
    ```

#### 6.) Creating a Controller 
- Controller is the part where all the business logic of the application is done. 
- Follow similar steps as in for routes 
- Example Controller to read and create operations
 ```javascript
    import PostMessage from '../models/postMessage.js';

    export const getPosts = async (req, res) => {
      try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
      } catch (error) {
        res.status(404).json({message: error.message});
      }
    };

    export const createPost = async (req, res) => {
      post = req.body;

      const newPost = PostMessage(post);
      try {
        await newPost.save();

        res.status(201).json(newPost);
      } catch (error) {
        res.status(400).json({message: error.message});
      }
    };
  ```


#### 7.) Frontend Setup 
- Most of the development done on the frontend part of the application was done using the material-ui library. 
- To use it we have to navigate to the component library and there add a seperate custom file called style.js and we can create our custom styles in the following way 
- ```javascript
      import { makeStyles } from '@material-ui/core/styles';

      export default makeStyles((theme) => ({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
          },
        },
        paper: {
          padding: theme.spacing(2),
        },
        form: {
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        },
        fileInput: {
          width: '97%',
          margin: '10px 0',
        },
        buttonSubmit: {
          marginBottom: 10,
        },
      }));
  ```

#### 8.) Redux Setup
- ##### Redux Intro: 
  Redux is a predictable state container for JavaScript apps. We use redux to avoid local state storage use and use a global state storage. 
  Advantages of redux : 
  - There is a single source of truth - Single state object - state is read-only - changes are made with pure functions - takes previous state and actions and returns the next state
  - Single store and single state tree enables powerful techniques - Logging - API Handling - Undo/redo - state/persistence - "time travelling debugging"

  Properties of redux : 
  ![redux](https://krasimirtsonev.com/blog/article/my-take-on-redux-architecture/assets/redux-architecture.jpg)
  - State: Plain Javascript object
  - Actions: Plain Javascript object with a type field that specifies how to change something in state, payloads of information sends data from your application to the store. 
    - Action Types: A type property, that indicates the type of action to be performed. Rest of the object contains the data neccessary for the action
    - Action Creators: Encapsulate the process of creating action object, and returns the object. Results action object can be passed to store through dispatch.

  - Reducer: Pure functions that the current state and the action have

  ###### Note: - 
  Action & Reducers  
  - Does not mutate the state  
  - actions typically handled through a switch statement  
  - switching on the action type 
  - return the previous state in default case

  - Store: Holds the current state value 
    - created using createStore(), supplies 3 methods 
      - dispatch(): states state update with the provided object   
      - getState(): returns the current stored state value 
      - subscribe(): accepts a callback function, that will be run everytime action is dispatched

  - Middleware: Forms the pipeline the wraps around the dispatch 
    - Pass actions onward 
    - Provides the capability to run code after an action is dispatched, but before it reaches the middleware 
    - Third party extension point 
    - ex. dogging, API calls 
    - Restart the dispatch pipeline 
    - Acess the store state

  - Thunk: Can be used to delay the dispatch of an action 
    - Dispatch only if a certain condition is met 
    - Inner function receives the dispatch and getState() store methods

- ##### Basic Setup 
  - In the folder src directory create a folder called redux(all redux related code goes here).
    - Inside the redux folder create two folders reducers and actions
      - In the reducer folder we create two files index.js(to combine all the reducers used for the application) and posts.js(where we will be creating the post reducer)
      ```javascript
          // index.js file
          import { combineReducers } from "redux";

          import posts from "./posts";

          // This is the root reducer where all the reducers present for the application combine. 
          export default combineReducers({ posts });

          // posts.js file
          /* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */

          // posts reducer
          export default (posts = [], action) => {
            switch (action.type) {
              case "FETCH_POSTS":
                return posts;
              case "CREATE_POST":
                return posts;
              default:
                return posts;
            }
          };
      ```
  - To connect the react application to the store we will now 
    - import Provider, which will allow our react application to connect to the redux store
    - import reducers, thunk, createStore,applyMiddleware and compose(write their functions incase we miss in the course)
    - connect the store and the application 
  ```javascript
    //redux
    import { Provider } from "react-redux";
    import thunk from "redux-thunk";
    import { createStore, applyMiddleware, compose } from "redux";

    import reducers from "./redux/reducers";

    const store = createStore(reducers, compose(applyMiddleware(thunk)));

    // connecting the store and the application 
    (<Provider store={store}></Provider>
  ```  
#### 9.) Connecting Redux to Frontend
  - In the App.js file, we need to connect the redux actions 
    ```javascript
    // importing the actions from redux
    import {getPosts} from "./redux/actions/posts";

    // in the component we will now connect use hooks and dispatch 
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getPosts);
    }, [dispatch]);
    ```
  - Now we will create actions in the redux 
    ```javascript
    import * as api from "../../api";

    //Action Creators

    // this method of allowing 'async(dispatch)' is possible through the use of redux thunk
    export const getPosts = () => async (dispatch) => {
      try {
        const { data } = await api.fetchPosts();
        dispatch({ type: "FETCH_POSTS", payload: data });
      } catch (error) {
        console.log(error.message);
      }
    };
    ```
  - Update the reducer file by return action.payload
  
  - Finally, in the Posts.js file use react-hooks to use the redux state
  ```javascript
     import { useSelector } from "react-redux";
     // in the component use it by the following method
     const posts = useSelector((state) => state.posts);
  ```

#### 10.) Connecting Frontend and Backend(Tricky)
- we will first create templates for frontend using our frontend library material/ui-core 
- now, we will pass the data fetched from backend(using redux) to each component 
```javascript
     const posts = useSelector((state) => state.posts);
     {posts.map((post) => {
        return (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} />
          </Grid>
        );
      })}

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
        <Button style={{ color: "white" }} size={"small"} onClick={() => {}}>
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
        <Button size='small' color='primary' onClick={() => {}}>
          <DeleteIcon fontSize='small' /> Delete
        </Button>
      </CardActions>
    </Card>
```

##### 11.) Updating the posts
- first create a route and controller for the posts
  ```javascript
      // route to update requires a patch request
     router.patch('/:id', updatePost);
     // controller 
     export const updatePost = async (req, res) => {
      const { id: _id } = req.params;
      const post = req.body;

      if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send("Error, No memory with this ID");

      const updatedPost = await PostMessage.findByIdAndUpdate(
        _id,
        { ...post, _id },
        {
          new: true
        }
      );

      res.status(201).json(updatedPost);
    };

  ```
- now we update the frontend to get api calls from backend 
  - updating the redux
    - actions 
      ```javascript
        export const updatePost = (postID, updatedPost) => async (dispatch) => {
          try {
            const { data } = await api.updatePost(postID, updatedPost);
            dispatch({ type: constants.UPDATE_POST, payload: data });
          } catch (error) {
            console.log(error.message);
          }
        };
      ```
    - reducer
    ```javascript
       case constants.UPDATE_POST:
        return posts.map((post) =>
          post._id === action.payload ? action.payload : post
        );
    ```
  - adding the api
  ```javascript
      // Our patch request will recieve an post id and updated data of new post, which will be later updated 
      export const updatePost = (postId, updatedPost) =>
      axios.patch(`${url}/${postId}`, updatedPost);
  ```

