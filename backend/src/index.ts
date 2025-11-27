// REST API 
import express, {Request, Response} from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'

import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import myHotelsRoutes from './routes/my-hotels'
import hotelRoutes from './routes/hotels'
import bookingRoutes from './routes/mybookings';

import cookieParser from 'cookie-parser'
import * as path from 'path'
import {v2 as cloudinary} from 'cloudinary'


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).catch((reason:any)=>(
    console.log("Database Error", reason)
));

const app = express();
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true,
}));

// go to frontend dist folder and serve static assets it on backend 
// frontend is bundled and passed here to access from backend
app.use(express.static(path.join(__dirname, "../../frontend/dist")))


app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/my-hotels", myHotelsRoutes)
app.use("/api/hotels", hotelRoutes)
app.use("/api/my-bookings", bookingRoutes)

app.get("/api", async (req: Request, res: Response)=>{
    res.json({message : "Yo it works "})
})

// All the request that are not api request, goes to our index.html file 
// that are in frontend/dist folder

app.get("*", (req: Request, res: Response)=>{
    // pass on any Request to our URL that are not API endpoints
    // let the react router dom package handle driving for us
    // some of the routes are behind conditional logic and be part of static files
     res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
