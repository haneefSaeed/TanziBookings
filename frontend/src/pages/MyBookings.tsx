import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import BookingCards from '../CoMPS/BookingCrads';

const Mybookings = ()=>{

    const {data: hotels} = useQuery("fetchMyBooings", ()=>apiClient.fetchMyBookings());

    if(!hotels){
        return<>No booking</>
    }
return(<div className='space-y-5'>
    <div className='flex flex-col gap-3'>
        <h1 className='text-2xl font-bold'>My Bookings</h1>
        <div className=''>
            {hotels.map((hotel)=>(<BookingCards hotel={hotel} />))}
        </div>
    </div>
   
</div>)
}

export default Mybookings;