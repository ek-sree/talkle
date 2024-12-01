import express from 'express'
import config from './config/index.js';
import cors from 'cors'
import { connectToDatabase } from './database/mongodb.js';
import authRouter from './app/router/authRouter.js';
import session from 'express-session';

const app = express();

app.use(express.json()); 
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true,
}))

app.use('/api/auth',authRouter)

await connectToDatabase()

const PORT = config.port
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
