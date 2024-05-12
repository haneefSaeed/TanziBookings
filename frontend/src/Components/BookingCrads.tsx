import { HotelType } from "../../../backend/src/shared/types"

type Props = {
    hotel: HotelType
}

const BookingCards = ({hotel}: Props)=>{

    return(
        <div className="grid grid-cols-[1fr_2fr] p-4 border rounded-lg gap-3">
            <div className="">
               <img src= {hotel.imageUrls[0]} />
            </div>
            <div className="flex flex-col space-y-4">
                <h1 className="text-xl font-bold">{hotel.name} </h1>
                <div>
                    <h1 className="text-lg font-bold">Booking Details:</h1>
                    {hotel.bookings.map((booking)=>(
                        <div>
                            <div>
                            Check In: {booking.checkIn.toString()}
                            </div>
                            <div>Check Out: {booking.checkOut.toString()}</div>
                            <div>Count : {booking.adultCount} Adults, </div>
                        </div>
                       
                    ))} 
                </div>
            </div>
        </div>
    )
}

export default BookingCards;