import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
function EditHotel() {
    const {hotelId} = useParams();
    const {data: hotel} = useQuery("fetchHotelById", ()=> apiClient.fetchHotelById(hotelId || ''), {
        enabled : !!hotelId // this query only run if we have hotelID, !! check for value (string | null) -> return on string
    })
  return ( <ManageHotelForm />  )
}

export default EditHotel;