import express, { Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const pageSize = 5;
    const pageNo = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (pageNo-1) * pageSize;

    const hotels = await Hotel.find().skip(skip).limit(pageSize);
    
    const total = await Hotel.countDocuments();

    const response : HotelSearchResponse = {
        data: hotels, 
        pagination: {
            total, 
            page: pageNo,
            pages: Math.ceil(total/pageSize),

        }
    };

    res.json(response);
  } catch (e) {
    console.log("Error: ", e);
    res.status(500).json({ message: "Something went wrong during search" });
  }
});

export default router;