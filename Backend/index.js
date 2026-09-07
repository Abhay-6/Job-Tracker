import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/db.js";

dotenv.config();

connectDB();

export default app;

