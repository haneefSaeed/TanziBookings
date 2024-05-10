//1. import
import express, {Request, Response} from 'express';
//4. install multer for image handling
import multer  from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';
import verifyToken from '../middleware/auth';

import {body} from 'express-validator';


//5. import multer
const storage = multer.memoryStorage();

// 6. init multer 
const upload = multer({
    storage: storage,
    limits: {
        fileSize :  5 * 1024 * 1024, // 5 MB

    }
})

//2 initiate router
const router = express.Router();

//3 register url - /api/my-hotels 7. add multer upload as middleware with 6 imgs
router.post(
    "/",
    verifyToken, //9. verify token before someone access this api point
    [
        //10. verify form data
        body("name").notEmpty().withMessage("Name is Required"),
        body("city").notEmpty().withMessage("City is Required"),
        body("country").notEmpty().withMessage("Country is Required"),
        body("description").notEmpty().withMessage("Description is Required"),
        body("type").notEmpty().withMessage("Type is Required"),
        body("pricePerNight").notEmpty().isNumeric().withMessage("Price is Required"),
        body("facilities").notEmpty().isArray().withMessage("Facilities is Required"),
    ],
    upload.array("imageFiles", 6 ),async (req: Request, res: Response)=>{
// handling multipart form including image and text
    //8. try catch
    try{

        // get form data + images
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        // 2. upload image to cloud
            const uploadPromises = imageFiles.map(async(img)=>{
            // Convert the image buffer to base64 string
            const b64 = Buffer.from(img.buffer).toString("base64");
    
            // Create data URI with image mimetype and base64 string
            const dataURI = "data:" + img.mimetype + ";base64," + b64;
    
            // Upload image to Cloudinary
            const res = await cloudinary.v2.uploader.upload(dataURI);
    
            // Return the URL of the uploaded image
            return res.url;
            })

            // wait if all pics are uploaded 
        const imageUrls = await Promise.all(uploadPromises);

        // 3. if success add url to hotel
            // i created hotel.ts Model
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated= new Date();
        newHotel.userId = req.userId;

        
        // 4. save the new hotel in db
        
        //new Hotel based on schema created
        const hotel = new Hotel(newHotel);
        await hotel.save();


    
        // 5. return success 201

        res.status(201).send(hotel)

    }catch(e){
        console.log("Error creating Hotel: ", e);
        res.status(500).json({message: "Something went wrong"})
    }

}) 

router.get('/', verifyToken, async (req: Request, res: Response)=>{
    
    try{
        const hotels = await Hotel.find({userId: req.userId});
        res.json(hotels);
    }catch(e){
        res.status(500).json({message: "Error finding hotels"});
    }
})

//verifytoken make sure that this is accessed after login
router.get('/:id', verifyToken, async (req: Request, res: Response)=>{
    const id = req.params.id.toString();
    try {
        const hotel = Hotel.find({
            _id: id,
            userId: req.userId
        })
        res.json(hotel);
    }catch(e){
        res.status(500).json({message: "Error Fetching Hotel data"});
    }
})
export default router;