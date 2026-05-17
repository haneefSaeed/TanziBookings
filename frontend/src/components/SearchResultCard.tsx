import { AiFillStar } from "react-icons/ai";
import { MdLocationOn, MdKingBed } from "react-icons/md";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition duration-300">

      {/* IMAGE */}
      <div className="relative h-[260px] overflow-hidden">
        <img
          src={hotel.imageUrls[0]}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          alt={hotel.name}
        />

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* price */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md">
          <span className="text-lg font-bold text-gray-900">
            ${hotel.pricePerNight}
          </span>
          <span className="text-sm text-gray-500"> /night</span>
        </div>

        {/* stars */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar
              key={index}
              className="text-yellow-400 text-lg"
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-5">

        {/* title */}
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <MdLocationOn />
            <span>
              {hotel.city}, {hotel.country}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 group-hover:text-green-700 transition">
            {hotel.name}
          </h2>

          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <MdKingBed />
            <span>{hotel.type}</span>
          </div>
        </div>

        {/* description */}
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {hotel.description}
        </p>

        {/* facilities */}
        <div className="flex flex-wrap gap-2">
          {hotel.facilities.slice(0, 4).map((fac, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
            >
              {fac}
            </span>
          ))}

          {hotel.facilities.length > 4 && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              +{hotel.facilities.length - 4} more
            </span>
          )}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between pt-2">

          <div>
            <p className="text-sm text-gray-500">
              Includes taxes & fees
            </p>

            <h3 className="text-2xl font-bold text-gray-900">
              ${(hotel.pricePerNight - 0.01).toLocaleString()}
            </h3>
          </div>

          <Link
            to={`/detail/${hotel._id}`}
            className="bg-green-700 hover:bg-green-800 text-white px-5 py-3 rounded-2xl font-semibold transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;