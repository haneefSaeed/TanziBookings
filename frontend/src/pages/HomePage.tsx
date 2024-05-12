import { useQuery } from 'react-query';
import * as apiClient from '../api-client';


const HomePage = ()=>{
    const {data: homeHotels} = useQuery("fetchHomePageItems", ()=>apiClient.fetchHomePageItems());
    if(!homeHotels) return <>No Items</>
    return(
        <div>
            {homeHotels.map((hotel)=>(<div>{hotel.name}</div>))}
        </div>
    )
}

export default HomePage;