import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";
const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelDetailById",
    () => apiClient.fetchHotelDetailById(hotelId as string),
    { enabled: !!hotelId } //if react render without hotelId
  );

  if (!hotel) {
    return <></>;
  }

return (
  <div className="space-y-8">

    {/* HEADER */}
    <div className="space-y-2">

      <div className="flex items-center gap-1">
        {Array.from({ length: hotel.starRating }).map((_, i) => (
          <AiFillStar key={i} className="text-yellow-400 text-lg" />
        ))}
      </div>

      <h1 className="text-3xl font-bold text-gray-900">
        {hotel.name}
      </h1>

      <p className="text-gray-500">
        {hotel.city}, {hotel.country}
      </p>
    </div>

    {/* IMAGES */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {hotel.imageUrls.slice(0, 3).map((url: string, i: number) => (
        <div
          key={i}
          className="h-64 overflow-hidden rounded-2xl shadow-sm"
        >
          <img
            src={url}
            className="w-full h-full object-cover hover:scale-110 transition duration-500"
          />
        </div>
      ))}
    </div>

    {/* FACILITIES */}
    <div className="flex flex-wrap gap-2">
      {hotel.facilities.slice(0, 6).map((facility: string, i: number) => (
        <span
          key={i}
          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm"
        >
          {facility}
        </span>
      ))}
    </div>

    {/* CONTENT + BOOKING */}
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">

      {/* DESCRIPTION */}
      <div className="text-gray-700 leading-relaxed text-justify">
        {hotel.description}
      </div>

      {/* BOOKING CARD */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm sticky top-10">
        {hotelId && (
          <GuestInfoForm
            hotelId={hotelId}
            pricePerNight={hotel.pricePerNight}
          />
        )}
      </div>

    </div>
  </div>
);
};

export default Detail;
