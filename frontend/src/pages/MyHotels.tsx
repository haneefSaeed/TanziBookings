import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from '../api-client';
//import { useAppContext } from "../contexts/AppContext";

function MyHotels() {
    //const showToast = useAppContext();
    const {data: hotelData} = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError:()=>{
           
        }
    })
    if(!hotelData){
        return(<span>No Hotel Data</span>)
    }
  return (
    <div className="space-y-5">
        <span className="flex justify-between">
            <h1 className="text-3xl font-bold">My Hotels</h1>
            <Link to='/add-hotel' className="flex bg-blue-600 text-white font-bold p-2 hover:bg-blue-500">Add Hotel</Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
        {hotelData?.map((hotel)=>(
            <div key={hotel._id} className="flex flex-col justify-between gap-5 border border-slate-300 rounded-sm p-8">
                <h2 className="text-2xl">{hotel.name}</h2>
                <div className="whitespace-pre-line">{hotel.description}</div>
                <div className="grid grid-cols-5 gap-2">
                    <div className="border border-gray-200 rounded p-3 flex items-center">
                        L: {hotel.city}, {hotel.country}
                </div>
                <div className="border border-gray-200 rounded p-3 flex items-center">
                        P: {hotel.pricePerNight}$ / Night
                </div>
                <div className="border border-gray-200 rounded p-3 flex items-center">
                        T: {hotel.type}
                </div>
                <div className="border border-gray-200 rounded p-3 flex items-center">
                        C: {hotel.adultCount}adults, {hotel.childCount}childCount
                </div>
                <div className="border border-gray-200 rounded p-3 flex items-center">
                        R: {hotel.starRating} Rates
                </div>
                </div>
            </div>

        ))}
        </div>
    </div>
  )
}

export default MyHotels