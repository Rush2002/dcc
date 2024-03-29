import express from 'express';
import dotenv from 'dotenv';
import { connect_DB } from './db/db_connect.js';
import loginRouter from './routes/loginRoutes.js';
import dataRouter from './routes/dataRoutes.js';

const app = express();
dotenv.config();

connect_DB(process.env.DATABASE_URL);

app.use("/api/auth",loginRouter);
app.use("/api/data",dataRouter);


app.all("*",(req,res)=>{
    res.status(400).send("Bad Request")
})

app.use((err,req,res,next)=>{
    res.status(500).send("something went wrong");
})

const PORT = process.env.PORT;
app.listen(PORT);