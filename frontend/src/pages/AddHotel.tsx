import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from '../api-client'
import { useEffect } from "react"
const AddHotel = () => {
  // we have to pass fetch function to useMutate
  const {showToast} = useAppContext();
  const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
    onSuccess: ()=>{
      showToast({message: "Hotel Added", type: "SUCCESS"})
    },
    onError: ()=>{
      showToast({message: "Error", type: "ERROR"});
    }
  })

     useEffect(() => {
      document.title = "Add New Hotel | TanziBooking";
    }, []);

  const handleSave = (hotelFormData: FormData)=>{
    mutate(hotelFormData)
  }
  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
  )
}

export default AddHotel