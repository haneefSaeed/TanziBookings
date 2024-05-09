import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";

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
    if(!response)
        throw new Error("Failed to add Hotel")

    return response.json(); // returns the hotel that was added 
}