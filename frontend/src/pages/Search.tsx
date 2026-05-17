import { useEffect, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { useQuery } from 'react-query';
import * as apiClient from '../api-client'
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import HotelTypeFilter from '../components/HotelTypeFilter';
import FacilitiesFilter from '../components/FacilitiesFilter';
import PriceFilter from '../components/PriceFilter';

function Search() {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

    const [sortOptions, setSortOptions] = useState<string>("");

       useEffect(() => {
        document.title = search.destination + " | TanziBooking";
      }, []);

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const starRating = event.target.value;
        setSelectedStars((prevStars)=>
            event.target.checked 
            ?[...prevStars, starRating]
            : prevStars.filter((star)=>star!==starRating)
        )
    }
    
    const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const hotelType = event.target.value;
        setSelectedHotelTypes((prevType)=>
            event.target.checked 
            ?[...prevType, hotelType]
            : prevType.filter((type)=>type!==hotelType)
        )
    }

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const facilities = event.target.value;
        setSelectedFacility((prevFacs)=>
            event.target.checked 
            ?[...prevFacs, facilities]
            : prevFacs.filter((fac)=>fac!==facilities)
        )
    }
    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(), 
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes, // as called in queryparams
        facilities: selectedFacility,
        maxPrice : selectedPrice?.toString(),
        sortOptions,
    }
    
    const {data: hotelData} = useQuery(["searchHotels", searchParams], 
    ()=> apiClient.searchHotels(searchParams))

  return (
  <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

    {/* FILTER SIDEBAR */}
    <aside className="h-fit sticky top-10">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 space-y-6">

        <h3 className="text-xl font-bold text-gray-900 border-b pb-4">
          Filters
        </h3>

        <StarRatingFilter
          selectedStars={selectedStars}
          onChange={handleStarsChange}
        />

        <HotelTypeFilter
          selectedTypes={selectedHotelTypes}
          onChange={handleHotelTypeChange}
        />

        <FacilitiesFilter
          selectedFacilities={selectedFacility}
          onChange={handleFacilityChange}
        />

        <PriceFilter
          selectedPrice={selectedPrice}
          onChange={(v?: number) => setSelectedPrice(v)}
        />

      </div>
    </aside>

    {/* MAIN CONTENT */}
    <main className="flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {hotelData?.pagination.total ?? 0} Hotels found
          </h2>

          <p className="text-gray-500">
            {search.destination ? `in ${search.destination}` : "Browse all stays"}
          </p>
        </div>

        <select
          value={sortOptions}
          onChange={(e) => setSortOptions(e.target.value)}
          className="bg-white border border-gray-300 rounded-2xl px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Sort by</option>
          <option value="starRating">Star Rating</option>
          <option value="pricePerNightAsc">Price (low → high)</option>
          <option value="pricePerNightDesc">Price (high → low)</option>
        </select>
      </div>

      {/* RESULTS */}
      <div className="flex flex-col gap-6">
        {hotelData?.data.map((hotel) => (
          <SearchResultCard key={hotel._id} hotel={hotel} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center pt-6">
        <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination.pages || 1}
          onPageChange={(page: number) => setPage(page)}
        />
      </div>

    </main>
  </div>
);
}

export default Search;