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
- ```javascript
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


  

  