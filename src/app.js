import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import productRouters from './routes/product.js'

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
app.use('/', productRouters)

export const viteNodeApp = app;

