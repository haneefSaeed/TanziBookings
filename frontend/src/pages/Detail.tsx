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
    <div className="space-y-6 ">
      <div>
        <span className="flex ">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <div className="text-2xl font-semibold">{hotel.name}</div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {hotel.imageUrls.slice(0, 3).map((url: string) => (
          <img src={url} className="object-cover h-full w-full" />
        ))}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {hotel.facilities.slice(0, 6).map((facility: string) => (
          <div className="flex justify-center bg-gray-200">
            <div className="p-2 ">{facility}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        <div className="text-justify">{hotel.description}</div>
        <div className="bg-blue-200 p-3">
            {hotelId && <GuestInfoForm hotelId={hotelId} pricePerNight={hotel.pricePerNight} />}
        </div>
      </div>
    </div>
  );
};

export default Detail;
