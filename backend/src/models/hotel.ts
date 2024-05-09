//1 create type for hotel

import mongoose, { Schema } from "mongoose";

export type HotelType = {
    _id : string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string; 
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;

}

// 2. create mongodb schema
const hotelSchema = new mongoose.Schema<HotelType>({
    userId: {type: String, required: true}, 
    name: {type: String, required: true},
    city: {type: String, required: true},
    country: {type: String, required: true},
    description: {type: String, required: true},
    type: {type: String, required: true},
    adultCount: {type: Number, required: true},
    childCount: {type: Number, required: true},
    facilities: [{type: String, required: true}], // type array
    pricePerNight : {type : Number, required: true},
    starRating : {type : Number, required: true},
    imageUrls : [{type : String, required: true}],
    lastUpdated : {type : Date, required: true}

})

// 3. tell mongo schema is model -> document Name, schema
const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);
export default Hotel;