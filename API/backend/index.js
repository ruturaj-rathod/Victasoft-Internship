import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session"

import authRouter from "./Route/auth.js";
import userRouter from "./Route/user.js";


const app = express();
dotenv.config();

const connect = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
        console.log("Mongo DB is connected");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB is Disconnected");
})

//Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser('session'));
app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'session',
    cookie: {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24, // day
        sameSite: "lax",
        secure: false
    }
}));


//Route
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);


app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(process.env.PORT || 8000, () => {
    connect();
    console.log(`Server running on ${process.env.PORT}`);
});