import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRouter from './routes/auth.js';
import parserRouter from './routes/parser.js';

dotenv.config();

const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());

//ROUTES
app.use("/", authRouter);
app.use("/", parserRouter);

const port = process.env.PORT;

async function start() {
    try {
        await mongoose.connect('mongodb://localhost:27017');
        app.listen(port, () => console.log(`listen app on port: ${port}`));
    } catch (error) {
        console.log(error)
    }
}

start();