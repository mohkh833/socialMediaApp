import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan'
import { Request, Response } from "express";
import userRoute from "./Routes/user.route"
import authRoute from './Routes/auth.route';
import postRoute from "./Routes/post.route"
import commentRoute from "./Routes/comment.route"
import reportRoute from "./Routes/report.route"
import errorMiddleware from "./middleware/error.middleware"
import RateLimit from "express-rate-limit"

dotenv.config();

let PORT = process.env.PORT || 5000;
const app = express();


app.use(express.json())
app.use(cors())
app.use(morgan('common'))
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

app.use(RateLimit({
    windowMs: 60*60*1000,
    max: 100,
    standardHeaders:true,
    legacyHeaders:false,
    message: "Too many requests from this IP, please try again after an 15 min"
}))


app.use("/auth/", authRoute)
app.use("/user/", userRoute)
app.use("/comment/",commentRoute)
app.use("/report/",reportRoute)
app.use("/post/", postRoute)
app.use('/uploads', express.static('uploads'));

app.use(errorMiddleware)

app.use((_: Request, res: Response) => {
    res.status(404).json({
    message:
        'Ohh you are lost, read the API documentation to find your way back home 😂',
    })
})


app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`));

export default app

// "build": "rimraf dist && tsc",
// "preserve": "npm run build",
// "serve": "cross-env NODE_ENV=development concurrently \"tsc --watch\" \"nodemon -q dist/index.js\"",
// "prestart": "npm run build",
// "start": "node index.js",
// "test": "echo \"Error: no test specified\" && exit 1"