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
    <form className="grid grid-cols-1 gap-5 p-5" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold">Confirm Your Detail</h1>
        <div className="grid grid-cols-2 gap-6">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name :
                <input className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
                type="text" 
                readOnly
                disabled
                {...register("firstName", {
                    
                })}
                >

                </input>
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name :
                <input className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
                type="text" 
                readOnly
                disabled
                {...register("lastName", {
                    
                })}
                >

                </input>
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email :
                <input className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
                type="email" 
                readOnly
                disabled
                {...register("email", {
                    
                })}
                >

                </input>
            </label>
        </div>
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Your Price Summary</h2>
            <div className="bg-blue-200 p-4 rounded-md">
                <div className="font-semibold text-lg">
                    Total Cost : ${paymentIntent.totalCost.toFixed(2)}
                </div>
                <div className="text-xs">Include taxes and Charges </div>
        </div>
        </div>
        <div className="space-y-2">
            <h3 className="text-xl font-semibold">Payment Details</h3>
            <CardElement id="paymentElement" className="border rounded p-2 text-sm"/>

        </div>
        <div className="flex justify-end">
            {isLoading ? 
             <button disabled className="bg-gray-600 text-white p-2 text-bold hover:bg-gray-500">Loading....</button>
            :
            <button type="submit" className="bg-blue-600 text-white p-2 text-bold hover:bg-blue-500">Confirm Booking</button>
            }
           
        </div>
    </form>
  )
}

export default BookingForm;