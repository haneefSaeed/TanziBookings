import express, { query, Request, Response } from "express";
import Hotel from "../models/hotel";
import { HotelSearchResponse } from "../shared/types";

const router = express.Router();

router.get("/search", async (req: Request, res: Response) => {
  try {
    const query = constructSearchQuery(req.query);
    
    let sortOptions = {};
    switch(req.query.sortOptions){
      case "starRating":
        sortOptions = {starRating : -1}
      break;
      case "pricePerNightAsc": 
      sortOptions= {pricePerNight : 1};
      break;
      case "pricePerNightDesc":
        sortOptions = {pricePerNight: -1};
        break;
    }
    
    const pageSize = 5;
    const pageNo = parseInt(req.query.page ? req.query.page.toString() : "1");
    const skip = (pageNo-1) * pageSize; 

    // Get parameters from the query string
    const destination = req.query.destination?.toString() || '';

    // Construct the query object based on provided parameters
    const hotels = await Hotel
                      .find(query)
                      .sort(sortOptions)
                      .skip(skip)
                      .limit(pageSize);
    const total = await Hotel.countDocuments(query);

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

const constructSearchQuery = (queryParams: any) => {
  let constructedQuery: any = {};

  if (queryParams.destination) {
    constructedQuery.$or = [
      { city: new RegExp(queryParams.destination, "i") },
      { country: new RegExp(queryParams.destination, "i") },
    ];
  }

  if (queryParams.adultCount) {
    constructedQuery.adultCount = {
      $gte: parseInt(queryParams.adultCount),
    };
  }

  if (queryParams.childCount) {
    constructedQuery.childCount = {
      $gte: parseInt(queryParams.childCount),
    };
  }

  if(queryParams.facilities){
    constructedQuery.facilities = {
      $all : Array.isArray(queryParams.facilities)
      ? queryParams.facilities
      : [queryParams.facilities],
    }
  }

  if(queryParams.types){
    constructedQuery.type = {
      $in : Array.isArray(queryParams.types)
      ? queryParams.types
      : [queryParams.types],
    };
  }

  if(queryParams.stars){
    const starRating = Array.isArray(queryParams.stars)
    ? queryParams.stars.map((star:string)=>parseInt(star))
    : parseInt(queryParams.stars);
    constructedQuery.starRating = {
      $eq: starRating
    }
  }

  if(queryParams.maxPrice){
    constructedQuery.pricePerNight = {
      $lte: parseInt(queryParams.maxPrice).toString(), // $lte = less than or equal
    }
  }

  return constructedQuery;
};
export default router;