import React, { useContext, useState } from "react";

//0 datatype
type SearchContext = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
  ) => void;
};


// 1 we create a context, specify type and pass undefined on load as load. 
const SearchContext = React.createContext<SearchContext | undefined>(undefined);


type SearchContextProviderProps = {
    children: React.ReactNode
}


// 2provider
export const SearchContextProvider = ({children}: SearchContextProviderProps) => {

    const [destination, setDestination] = useState<string>(()=>sessionStorage.getItem("destination") || "");
    const [checkIn , setCheckIn] = useState<Date> (()=>new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()))
    const [checkOut, setCheckOut] = useState<Date> (()=>new Date(sessionStorage.getItem("checkOut")  || new Date().toISOString()))
    const [adultCount, setAdultCount] = useState<number> (()=>parseInt(sessionStorage.getItem("adultCount") || "1"));
    const [childCount, setChildCount] = useState<number> (()=>parseInt(sessionStorage.getItem("adultCount") || "0"));
    const [hotelId, setHotelId] = useState<string>(()=>sessionStorage.getItem("hotelId") || "1");

    const saveSearchValues = (destination: string, checkIn: Date, checkOut: Date, adultCount: number, childCount: number, hotelId?: string)=>{
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if(hotelId) setHotelId(hotelId)

            sessionStorage.setItem("destination", destination);
            sessionStorage.setItem("checkIn", checkIn.toISOString());
            sessionStorage.setItem("checkOut", checkOut.toISOString());
            sessionStorage.setItem("adultCount", adultCount.toString());
            sessionStorage.setItem("childCount", childCount.toString());
            hotelId &&  sessionStorage.setItem("hotelId", hotelId);

    }


    //3Return statement
    return <SearchContext.Provider value={{
        destination, checkIn, checkOut, adultCount, childCount, saveSearchValues, hotelId
    }}>
        {children}
    </SearchContext.Provider>
}


export const useSearchContext = ()=>{
    const context = useContext(SearchContext)
    return context as SearchContext;
}