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
   if (!hotelData) {
  return (
    <div className="flex justify-center items-center py-20 text-gray-500 text-lg">
      No hotel data found
    </div>
  );
}

return (
  <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          My Hotels
        </h1>
        <p className="text-gray-500">
          Manage your listed properties
        </p>
      </div>

      <Link
        to="/add-hotel"
        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-3 rounded-2xl transition"
      >
        + Add Hotel
      </Link>

    </div>

    {/* HOTEL LIST */}
    <div className="grid grid-cols-1 gap-6">

      {hotelData.map((hotel) => (
        <div
          key={hotel._id}
          className="bg-white border border-gray-200 rounded-3xl shadow-sm hover:shadow-md transition p-6 space-y-5"
        >

          {/* TITLE */}
          <h2 className="text-2xl font-bold text-gray-900">
            {hotel.name}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-gray-600 line-clamp-3">
            {hotel.description}
          </p>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">

            <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-700">
              📍 {hotel.city}, {hotel.country}
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-700">
              💰 ${hotel.pricePerNight} / night
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-700">
              🏨 {hotel.type}
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-700">
              👥 {hotel.adultCount} adults, {hotel.childCount} children
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 text-sm text-gray-700">
              ⭐ {hotel.starRating} stars
            </div>

          </div>

          {/* ACTION */}
          <div className="flex justify-end">
            <Link
              to={`/edit-hotel/${hotel._id}`}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-5 py-2 rounded-2xl transition"
            >
              View / Edit
            </Link>
          </div>

        </div>
      ))}

    </div>
  </div>
);
}

export default MyHotels