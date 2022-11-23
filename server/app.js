import dotenv from "dotenv";
import express from "express";
import mainRouter from "./routes/main.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use('/api', mainRouter);

export default app;