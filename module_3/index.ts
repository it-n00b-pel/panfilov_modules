import dotenv from 'dotenv';
import express from 'express';
import * as mongoose from 'mongoose';
import router from './src/routes/router';
import cors from 'cors';
import {DB_URL} from './src/config/db';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173',
}));

app.use('/api', router);
const port = process.env.PORT;

app.post('/');

const startApp = async () => {
    try {
        await mongoose.connect(DB_URL);
        app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });
    } catch (e) {
        console.error(e);
    }
};

startApp();


