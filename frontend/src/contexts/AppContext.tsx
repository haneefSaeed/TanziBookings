import React, { useContext, useState } from "react";
import Toast from "../Components/Toast";
import {useQuery} from 'react-query'
import * as apiClient from '../api-client'

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}


type AppContext = {
    showToast : (toastMessage: ToastMessage)=>void;
    isLoggedIn: boolean;
}

const AppContext = React.createContext<AppContext | undefined> (undefined);


export const AppContextProvider = ({
    children,
}: {
    children : React.ReactNode
})=>{

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
            isLoggedIn : !isError // if the token is good and no error we can log in
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