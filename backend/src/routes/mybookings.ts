import express, {Request, Response} from 'express';
import verifyToken from '../middleware/auth';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';


const route = express.Router();

route.get("/", verifyToken, async(req: Request, res: Response)=>{
    try{
        const hotels = await Hotel.find({
            bookings : {$elemMatch: {userId: req.userId}}
        });// returns all the bookings for the hotel, 
        // ex: ahmad -> all ahmad hotels {hotel1.bookings, hotel2.bookings}

       

        const result = hotels.map((hotel)=>{
            const userBookings = hotel.bookings.filter((booking)=>booking.userId === req.userId);
            console.log("userbookings" , userBookings)
            const hotelWithUserBookings: HotelType = {
                ...hotel.toObject(),
                bookings : userBookings,
            }

            return hotelWithUserBookings;
        })

        console.log("Hotel BOokinss : ", result)
        res.status(200).send(result);
        
    } catch(e){
        console.log(e);
        res.status(500).json({message: "Error occured on fetching bookings" + e})
    }
})


export default route;