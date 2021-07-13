import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js';

const app = express();

// To setup bodyParser so we can properly send request from backend
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));

app.use(cors());

// Connecting server to router using middleware
app.use('/posts', postRoutes);

// MongoDB Atlas connection URL
const CONNECTION_URL =
  'mongodb+srv://kshitij-admin:kshitijmemoriesadmin@cluster0.mdqnv.mongodb.net/test';

const PORT = process.env.PORT || 5000;

// This is done to avoid any error or warning which came while database was connected to server
mongoose
  .connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
