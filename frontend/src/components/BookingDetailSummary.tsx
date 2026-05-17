import { HotelType } from "../../../backend/src/shared/types";

type Props = {
    checkIn : Date,
    checkOut: Date;
    adultCount: number;
    childCount: number;
    numberOfNights: number;
    hotel: HotelType;
}

const BookingDetailSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">

      {/* Header */}
      <h2 className="text-xl font-bold text-gray-900">
        Your Booking Details
      </h2>

      {/* Location */}
      <div className="space-y-1">
        <p className="text-sm text-gray-500">Location</p>
        <p className="font-semibold text-gray-900">
          {hotel.name}, {hotel.city}, {hotel.country}
        </p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">Check-in</p>
          <p className="font-semibold text-gray-900">
            {checkIn.toDateString()}
          </p>
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500">Check-out</p>
          <p className="font-semibold text-gray-900">
            {checkOut.toDateString()}
          </p>
        </div>
      </div>

      {/* Nights */}
      <div className="pt-3 border-t border-gray-100 space-y-1">
        <p className="text-sm text-gray-500">Stay Duration</p>
        <p className="font-semibold text-gray-900">
          {numberOfNights} {numberOfNights === 1 ? "Night" : "Nights"}
        </p>
      </div>

      {/* Guests */}
      <div className="pt-3 border-t border-gray-100 space-y-1">
        <p className="text-sm text-gray-500">Guests</p>
        <p className="font-semibold text-gray-900">
          {adultCount} Adult{adultCount > 1 ? "s" : ""}
          {childCount > 0 && `, ${childCount} Child${childCount > 1 ? "ren" : ""}`}
        </p>
      </div>
    </div>
  );
};

export default BookingDetailSummary