import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import { HotelType } from '../../backend/src/shared/types';
// const API_BASE_URL = ""
 const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ""


export const register = async (formData: RegisterFormData)=>{
    const response  = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(formData)
    })

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message)
    }
}   


export const signIn = async (FormData: SignInFormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST", 
        credentials: "include",
        headers : {
            "content-type": "application/json"
        }, 
        body: JSON.stringify(FormData)
    })
    const body  = await response.json();

    if(!response.ok)
        throw new Error(body.message)

    return body;
}

export const validateToken = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials:'include'
    })
    if(!response.ok)
        throw new Error("Token Invalid")

    return response.json();

}

export const signOut = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: 'include',
        method: "POST",

    })

    if(!response.ok)
        throw new Error("Error in Signing Out")
}

export const addMyHotel = async(hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include", //we write this because of the HTTP cookie it should be send to server to access the api.
        body: hotelFormData, 
    })
    if(!response.ok)
        throw new Error("Failed to add Hotel")

    return response.json(); // returns the hotel that was added 
}

//ensure both frontend and backend work on same datatype we add HotelType from modal
export const fetchMyHotels = async(): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: 'include'
    });
    if(!response.ok)
        throw new Error("Error fetching hotels...");

    return response.json();
}

export const fetchHotelById = async(hotelId: string) : Promise<HotelType> =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/`+ hotelId, {
        credentials: 'include',
    } )
    if(!response.ok){
        throw new Error("Error fetching hotel data ")
    }
    return response.json();
}

export const updateMyHotelById = async (hotelFormData: FormData) : Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body: hotelFormData,
        credentials: "include"
    })

    if(!response.ok){
        throw new Error("Some error in update")
    }

    return response.json();
}