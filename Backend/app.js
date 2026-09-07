import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import jobRouter from "./routes/job.routes.js"
import {middleware } from "./middlewares/error.middlewares.js";

const app=express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api/users',userRouter)
app.use('/api/jobs',jobRouter)
//error middleware
app.use(middleware);


export {app};