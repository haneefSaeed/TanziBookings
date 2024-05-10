import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageHotelForm  from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";



function EditHotel() {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const { data: hotel , isLoading, isError} = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId, // this query only run if we have hotelID, !! check for value (string | null) -> return on string
    }
  );
  const {showToast}  = useAppContext();
  const {mutate } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: ()=>{
      showToast({message:"Edited ", type:"SUCCESS"})
      navigate("/my-hotels")
    },
    onError: (errors: Error)=>{
      showToast({message:errors.message, type:"ERROR"})

    } 
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }
  if(isLoading) return <div>Loading...</div>
  if(isError) return <div>Error loading</div>
  else 
  return <ManageHotelForm hotel={hotel} onSave={handleSave} />
}

export default EditHotel;
