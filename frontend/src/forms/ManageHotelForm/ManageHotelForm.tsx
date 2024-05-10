import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageFiles: FileList;
  imageUrls: string[];
};

type props = { // this component will receive the following props
    hotel : HotelType;
    onSave : (hotelFormData: FormData)=> void; //onsave which is function to call it should have hotelformdata
    isLoading: boolean; //also accepting this 
}
const ManageHotelForm = ({onSave, isLoading, hotel}: props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;
  useEffect(()=>{
      reset(hotel);
  }, [hotel, reset])


  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    // Create a new form object and call the API!
    const formData = new FormData();
    formData.append("name" , formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
  
    formDataJson.facilities.forEach((f,i)=>{
        formData.append(`facilities[${i}]`, f)
    });
    Array.from(formDataJson.imageFiles).forEach((m)=>{
        formData.append('imageFiles', m);
    })

    // Add props here on submit
    onSave(formData);


  });

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10" onSubmit={onSubmit}>
        <HotelDetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImagesSection />
        <span className="flex justify-end">
          <button
            type="submit" disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 disabled:bg-gray-500"
          >
            {isLoading ? "Uploading...": "Save" }
          </button>
        </span>
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
