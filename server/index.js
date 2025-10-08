import express from 'express'
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectdb from './db/db.js';
import boarRoute from "./routes/bord.route.js"
import taskRoute from "./routes/task.route.js"

let port=process.env.PORT;

const corsOption = {
    origin:"http://localhost:5173",
    Credential:true
}


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(corsOption));
app.use(cookieParser())

app.use("/api",boarRoute);
app.use("/api/task",taskRoute);




app.get("/",(req,res) => {
    return res.status(200).json({message:"hello server"});
})

connectdb()
app.listen(port, () =>
    console.log("server is running on port no", port)
)