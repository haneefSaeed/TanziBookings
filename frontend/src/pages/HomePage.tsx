import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { HotelType } from '../../../backend/src/shared/types';
import SearchResultCard from '../components/SearchResultCard';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillStar } from 'react-icons/ai';


const HomePage = () => {
  const { data: homeHotels } = useQuery("fetchHomePageItems", () => apiClient.fetchHomePageItems());
  if (!homeHotels) return <>No Items</>
  return (
    <div>
      {homeHotels.slice(0, 4).map((hotel: HotelType, i: number) => {
        if (i === 0) {
          // Slider settings
          const settings = {
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
          };

          return (
            <div key={hotel._id} style={{ marginBottom: "20px" }} className='border p-7'>
              <Slider {...settings}>
                {hotel.imageUrls.map((url, index) => (
                  <div key={index}>
                    <img
                      src={url}
                      alt={`${hotel.name} ${index}`}
                      style={{ width: "100%", height: "400px", objectFit: "cover" }}
                    />
                  </div>
                ))}
              </Slider>
             <div className='flex items-center gap-4'>
               <a className='text-2xl font-bold' href={'detail/'+hotel._id}>{hotel.name}</a>
              <div className="flex items-center">
                <span className="flex">
                  {Array.from({ length: hotel.starRating }).map(() => (
                    <AiFillStar className="text-yellow-400" />))}
                </span>
              </div>
             
             </div>
              <div className='text-justify w-full mt-2'>{hotel.description.slice(0,200)}...</div>
            </div>
          );
        } else {
          return <SearchResultCard hotel={hotel} />
        }
      }
      )}
    </div >
  )
}

export default HomePage;