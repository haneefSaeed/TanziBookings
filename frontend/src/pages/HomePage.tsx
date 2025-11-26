import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import { HotelType } from '../../../backend/src/shared/types';
import SearchResultCard from '../components/SearchResultCard';


const HomePage = () => {
    const { data: homeHotels } = useQuery("fetchHomePageItems", () => apiClient.fetchHomePageItems());
    if (!homeHotels) return <>No Items</>
    return (
        <div>
          {homeHotels.slice(0,3).map((hotel: HotelType)=>(
            <SearchResultCard hotel={hotel}/>
          ))}
        </div >
    )
}

export default HomePage;