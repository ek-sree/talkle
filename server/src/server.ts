import express from 'express'
import config from './config/index.js';
import cors from 'cors'
import { connectToDatabase } from './database/mongodb.js';
import authRouter from './app/router/authRouter.js';
import session from 'express-session';
import cookieParser from 'cookie-parser'
import userDetailsRouter from './app/router/userDetailsRouter.js';

const app = express();

app.use(express.json()); 
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true,              
    methods: ["POST", "GET", "PUT", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(cookieParser());


app.use('/api/auth',authRouter)
app.use('/api/userDetails', userDetailsRouter)


await connectToDatabase()


const PORT = config.port
app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
