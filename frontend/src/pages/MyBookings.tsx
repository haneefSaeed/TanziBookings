import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import BookingCards from '../components/BookingCrads';
import { useEffect } from 'react';

const Mybookings = ()=>{

    const {data: hotels} = useQuery("fetchMyBooings", ()=>apiClient.fetchMyBookings());

       useEffect(() => {
        document.title = "My Bookings | TanziBooking";
      }, []);
  if (!hotels) {
  return (
    <div className="flex justify-center items-center py-20 text-gray-500 text-lg">
      No bookings found
    </div>
  );
}

return (
  <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

    {/* HEADER */}
    <div className="space-y-1">
      <h1 className="text-3xl font-bold text-gray-900">
        My Bookings
      </h1>
      <p className="text-gray-500">
        Manage your hotel reservations
      </p>
    </div>

    {/* BOOKINGS LIST */}
    {hotels.length === 0 ? (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
        You don’t have any bookings yet
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-5">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            <BookingCards hotel={hotel} />
          </div>
        ))}
      </div>
    )}

  </div>
);
}

export default Mybookings;