import { useForm } from "react-hook-form";
import { paymentIntentResponse, UserType } from "../../../../backend/src/shared/types"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from '../../api-client'
import { useAppContext } from "../../contexts/AppContext";
type Props = {
    currentUser : UserType;
    paymentIntent: paymentIntentResponse;
}

export type BookingFormData = {
    firstName: string, 
    lastName : string;
    email: string;  
    adultCount : number, 
    childCount: number, 
    checkIn: string,
    checkOut: string,
    hotelId: string, 
    paymentIntentId: string;
    totalCost : number,

}
const BookingForm = ({currentUser, paymentIntent}: Props) => {
    const {showToast} = useAppContext();
    const search = useSearchContext();
    const {hotelId} = useParams();

    const  {mutate: bookRoom, isLoading} = useMutation(apiClient.createRoomBooking, {
        onSuccess : ()=>{
            showToast({message: "Booking Saved", type: "SUCCESS"})
        },
        onError: ()  =>{
            showToast({message: "Error During Booking", type: "ERROR"})

        },
    })
    const stripe = useStripe();
    const elements = useElements();
    const {handleSubmit, register} = useForm<BookingFormData>(
        {
            defaultValues : {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
                adultCount : search.adultCount, 
                childCount: search.childCount, 
                checkIn: search.checkIn.toISOString(),
                checkOut: search.checkOut.toISOString(),
                hotelId: hotelId, 
                paymentIntentId: paymentIntent.paymentIntentId,
                totalCost : paymentIntent.totalCost,
                
            }
        }
    );


    const onSubmit= async (formData: BookingFormData)=>{
        //receive the formdata from booking form its in useForm Hook
        if(!stripe  || !elements) return;

        const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, 
            {
                payment_method: {card: elements.getElement(CardElement) as StripeCardElement
                //confirm using card element
                }
            });

            if(result.paymentIntent?.status ==="succeeded"){
                //book the room
                bookRoom({...formData, paymentIntentId: result.paymentIntent.id})
            }

        //send the card detail to stripe


    }
  return (
  <form
    className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 space-y-8"
    onSubmit={handleSubmit(onSubmit)}
  >
    {/* HEADER */}
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Confirm Your Details
      </h1>
      <p className="text-gray-500 text-sm mt-1">
        Please review before completing your booking
      </p>
    </div>

    {/* USER INFO */}
    <div className="grid md:grid-cols-3 gap-6">
      {[
        { label: "First Name", name: "firstName" },
        { label: "Last Name", name: "lastName" },
        { label: "Email", name: "email", type: "email" },
      ].map((field) => (
        <label
          key={field.name}
          className="text-sm font-semibold text-gray-700"
        >
          {field.label}
          <input
            type={field.type || "text"}
            readOnly
            disabled
            className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-100 px-3 py-2 text-gray-700"
            {...register(field.name as any)}
          />
        </label>
      ))}
    </div>

    {/* PRICE CARD */}
    <div className="bg-green-50 border border-green-100 rounded-xl p-5">
      <h2 className="text-lg font-semibold text-gray-800">
        Price Summary
      </h2>

      <div className="mt-2 flex items-end justify-between">
        <span className="text-gray-500 text-sm">
          Total cost (tax included)
        </span>
        <span className="text-2xl font-bold text-green-700">
          ${paymentIntent.totalCost.toFixed(2)}
        </span>
      </div>
    </div>

    {/* PAYMENT */}
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Payment Details
      </h3>

      <div className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm">
        <CardElement className="text-sm" />
      </div>
    </div>

    {/* SUBMIT */}
    <div className="flex justify-end">
      {isLoading ? (
        <button
          disabled
          className="rounded-xl bg-gray-400 px-6 py-3 text-white font-semibold"
        >
          Processing...
        </button>
      ) : (
        <button
          type="submit"
          className="rounded-xl bg-green-700 px-6 py-3 text-white font-semibold hover:bg-green-600 transition"
        >
          Confirm Booking
        </button>
      )}
    </div>
  </form>
);
}

export default BookingForm;