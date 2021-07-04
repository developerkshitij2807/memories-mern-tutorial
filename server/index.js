import express from 'express';
import bodyParser from 'bodyParser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

// To setup bodyParser so we can properly send request from backend

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
