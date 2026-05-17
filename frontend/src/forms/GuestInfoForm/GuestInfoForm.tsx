import { useForm } from "react-hook-form";
import DatePicker from 'react-datepicker'
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};


const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
    const {isLoggedIn} = useAppContext();
    const search = useSearchContext();


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors},
  } = useForm<GuestInfoFormData>({
    defaultValues: {
        adultCount: search.adultCount,
        childCount: search.childCount,
        checkIn: search.checkIn,
        checkOut: search.checkOut,
    }
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear()+1);
  const navigate = useNavigate();
  const location = useLocation();

  const onSignInClick = (data: GuestInfoFormData)=>{
    search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount,data.childCount);
    navigate("/login", {state: {from : location}})
} 

const onSubmit = (data: GuestInfoFormData)=>{
    search.saveSearchValues("", data.checkIn, data.checkOut, data.adultCount,data.childCount);
    console.log("It should be going to booking" , hotelId)
    navigate(`/hotel/${hotelId}/booking`, {state: {from : location}})
} 


return (
  <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

    <form
      onSubmit={
        isLoggedIn
          ? handleSubmit(onSubmit)
          : handleSubmit(onSignInClick)
      }
      className="space-y-5"
    >

      {/* PRICE */}
      <div className="text-center">
        <p className="text-sm text-gray-500">Price per night</p>
        <h2 className="text-3xl font-bold text-gray-900">
          ${(pricePerNight - 0.01).toLocaleString()}
        </h2>
      </div>

      {/* CHECK-IN */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Check-in
        </label>
        <DatePicker
          selected={checkIn}
          onChange={(date) => setValue("checkIn", date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Select check-in"
          className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          wrapperClassName="w-full"
        />
      </div>

      {/* CHECK-OUT */}
      <div>
        <label className="text-sm font-medium text-gray-700">
          Check-out
        </label>
        <DatePicker
          selected={checkOut}
          onChange={(date) => setValue("checkOut", date as Date)}
          selectsEnd
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Select check-out"
          className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          wrapperClassName="w-full"
        />
      </div>

      {/* GUESTS */}
      <div className="grid grid-cols-2 gap-3">

        <div>
          <label className="text-sm font-medium text-gray-700">
            Adults
          </label>
          <input
            type="number"
            min={1}
            max={20}
            className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl p-3 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("adultCount", {
              required: "Required",
              min: { value: 1, message: "At least 1 adult" },
              valueAsNumber: true,
            })}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">
            Children
          </label>
          <input
            type="number"
            min={0}
            max={20}
            className="w-full mt-1 bg-gray-50 border border-gray-200 rounded-xl p-3 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("childCount", {
              valueAsNumber: true,
            })}
          />
        </div>

      </div>

      {errors.adultCount && (
        <p className="text-red-500 text-sm">
          {errors.adultCount.message}
        </p>
      )}

      {/* BUTTON */}
      <button
        type="submit"
        className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-3 rounded-2xl transition duration-300"
      >
        {isLoggedIn ? "Book Now" : "Sign in to Book"}
      </button>

    </form>
  </div>
);
};

export default GuestInfoForm;
