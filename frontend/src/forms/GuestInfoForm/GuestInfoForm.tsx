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
<div><form onSubmit={isLoggedIn? handleSubmit(onSubmit): handleSubmit(onSignInClick)}>
        <div className="flex flex-col gap-3">
         <div className="text-2xl font-bold">
              ${(pricePerNight- 0.01).toLocaleString()}
            </div>
            <div>
            <DatePicker
        selected={checkIn}
        onChange={(date)=>setValue("checkIn" , date as Date)}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText='Check-in Date'
        className='min-w-full bg-white p-2 focus:outline-none'
        wrapperClassName='min-w-full'
        />
            </div>
       <div>
       <DatePicker
        selected={checkOut}
        onChange={(date)=>setValue("checkOut", date as Date)}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText='Check-Out Date'
        className='min-w-full bg-white p-2 focus:outline-none'
        wrapperClassName='min-w-full'
        />
       </div>
       <div className='flex bg-white px-2 py-1 gap-2 '>
            <label className='items-center flex'>
                Adults: 
            <input className='text-md p-1 w-full focus:outline-none font-bold'
            type="number"
            min={1} max={20} 
            {...register("adultCount", {
                required: "This field is required",
                min: {value: 1, message: "There should be minimum 1 adult"},
                valueAsNumber: true,
            })}

            />

            </label>
            <label className='items-center flex'>
                Child: 
            <input  className='text-md p-1 w-full focus:outline-none font-bold'
            type="number"
            min={0} max={20} 
            {...register("childCount", {
                valueAsNumber: true,
            })}
             />

            </label>
            {errors.adultCount && 
            (<span className="text-red-500">{errors.adultCount.message}</span>)}

        </div>
                <div className="flex text-center ">

                {isLoggedIn? 
                (
                    <button className="bg-green-800 w-full p-2 mt-5 text-white font-bold hover:bg-green-700">
                    Book Now</button>)
                    : (
                    <button className="bg-green-800 w-full p-2 mt-5 text-white font-bold hover:bg-green-700">
                    Sign In to Book</button>)}
      
                </div>
        
      </div>
    
     </form>
</div>
  );
};

export default GuestInfoForm;
