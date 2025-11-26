import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import {useQuery} from 'react-query'
import * as apiClient from '../api-client'
import { loadStripe, Stripe } from "@stripe/stripe-js";

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";


type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}


type AppContext = {
    showToast : (toastMessage: ToastMessage)=>void;
    isLoggedIn: boolean;
    stripePromise: Promise<Stripe |null>
}

const AppContext = React.createContext<AppContext | undefined> (undefined);

const stripePromise = loadStripe(STRIPE_PUB_KEY);


type Props = {
    children: React.ReactNode;
}

export const AppContextProvider = ({children}: Props)=>{

    const [toast, SetToast]  = useState<ToastMessage | undefined>(undefined) 
    const {isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false,
    })

    return (
        <AppContext.Provider 
            value={{
            showToast: (toastMessage)=>{
                SetToast(toastMessage)
            },
            isLoggedIn : !isError ,// if the token is good and no error we can log in
            stripePromise
            }}
            
            >
                {toast && (<Toast message={toast.message} type={toast.type} onClose={()=>SetToast(undefined)}/>)}
            {children}
        </AppContext.Provider>
    )   
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = ()=>{
    const context = useContext(AppContext);
    return context as AppContext;
}