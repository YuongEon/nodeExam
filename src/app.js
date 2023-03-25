import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouters from './routes/product.js';
import authRouter from './routes/user.js'

// config
dotenv.config()
const app = express()
app.use(express.json())

// connect db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected");
  })
  .catch((err) => {
    console.error('cant connect');
  })

// router
app.use('/', productRouters);
app.use('/', authRouter)

export const viteNodeApp = app;

