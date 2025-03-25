import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoutes.js';

const app = express();
const prisma = new PrismaClient();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use('/user', userRoutes);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });


