import dotenv from "dotenv"
import {app} from "./app.js"
import connectDB from "./db/index.js";

dotenv.config();

const PORT=process.env.PORT || 8001;

connectDB();

export default app;

