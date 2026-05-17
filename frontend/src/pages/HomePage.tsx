import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { HotelType } from "../../../backend/src/shared/types";
import SearchResultCard from "../components/SearchResultCard";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { AiFillStar } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { data: homeHotels } = useQuery(
    "fetchHomePageItems",
    () => apiClient.fetchHomePageItems()
  );

  if (!homeHotels) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 text-lg">
        Loading hotels...
      </div>
    );
  }

  const featuredHotel = homeHotels[0];

  const sliderSettings = {
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    dots: true,
  };

  return (
    <div className="space-y-10">

      {/* HERO HOTEL */}
      {featuredHotel && (
        <div className="relative overflow-hidden rounded-3xl shadow-xl">

          <Slider {...sliderSettings}>
            {featuredHotel.imageUrls.map((url, index) => (
              <div key={index}>
                <div className="relative h-[500px]">
                  <img
                    src={url}
                    alt={`${featuredHotel.name}-${index}`}
                    className="w-full h-full object-cover"
                  />

                  {/* overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
              </div>
            ))}
          </Slider>

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-8 w-full text-white z-10">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: featuredHotel.starRating }).map(
                (_, index) => (
                  <AiFillStar
                    key={index}
                    className="text-yellow-400 text-xl"
                  />
                )
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              {featuredHotel.name}
            </h1>

            <div className="flex items-center gap-2 text-gray-200 mb-4">
              <MdLocationOn className="text-xl" />
              <span>
                {featuredHotel.city}, {featuredHotel.country}
              </span>
            </div>

            <p className="max-w-3xl text-gray-200 leading-relaxed mb-6">
              {featuredHotel.description.slice(0, 220)}...
            </p>

            <div className="flex flex-wrap items-center gap-4">

              <div className="bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl">
                <p className="text-sm text-gray-200">Starting From</p>
                <h3 className="text-2xl font-bold">
                  ${featuredHotel.pricePerNight}
                  <span className="text-sm font-normal text-gray-300">
                    /night
                  </span>
                </h3>
              </div>

              <Link
                to={`/detail/${featuredHotel._id}`}
                className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition duration-300"
              >
                Explore Hotel
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* SECTION HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Stays
          </h2>
          <p className="text-gray-500 mt-1">
            Discover top-rated hotels and resorts
          </p>
        </div>
      </div>

      {/* HOTEL GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {homeHotels.slice(1).map((hotel: HotelType) => (
          <div
            key={hotel._id}
            className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition duration-300 overflow-hidden border border-gray-100"
          >
            <SearchResultCard hotel={hotel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;