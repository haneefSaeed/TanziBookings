import { HotelType } from "../../../backend/src/shared/types"

type Props = {
    hotel: HotelType
}

const BookingCards = ({hotel}: Props)=>{

   return (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] p-4 border rounded-xl gap-4 shadow-sm">
    
    {/* Image */}
    <div className="h-40 md:h-full">
      <img
        src={hotel.imageUrls[0]}
        className="w-full h-full object-cover rounded-lg"
      />
    </div>

    {/* Content */}
    <div className="flex flex-col gap-4">
      
      <h1 className="text-xl font-bold">{hotel.name}</h1>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Booking Details</h2>

        {hotel.bookings.length === 0 ? (
          <p className="text-sm text-gray-500">No bookings yet</p>
        ) : (
          hotel.bookings.map((booking, i) => (
            <div key={i} className="border rounded-md p-3 text-sm space-y-1">
              <div>
                Check In:{" "}
                {new Date(booking.checkIn).toDateString()}
              </div>

              <div>
                Check Out:{" "}
                {new Date(booking.checkOut).toDateString()}
              </div>

              <div>
                Guests: {booking.adultCount} adults
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
);
}

export default BookingCards;