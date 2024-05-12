import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

const Mybookings = ()=>{

    const {data: hotel} = useQuery("fetchMyBooings", ()=>apiClient.fetchMyBookings());

    if(!hotel){
        return<>No booking</>
    }
return(<div className='space-y-5'>
    Booking Items
</div>)
}

export default Mybookings;