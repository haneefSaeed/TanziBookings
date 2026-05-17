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
    hotel? : HotelType;
    onSave : (hotelFormData: FormData)=> void; //onsave which is function to call it should have hotelformdata
    isLoading?: boolean; //also accepting this 
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
    if(hotel){

      // if want to update, we need to pass the hotel id also 
      formData.append("hotelId", hotel._id)
    }
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

    if(formDataJson.imageUrls){
      formDataJson.imageUrls.forEach((url,i)=>{
        formData.append(`imageUrls[${i}]`, url)
      })
    }
    Array.from(formDataJson.imageFiles).forEach((m)=>{
        formData.append('imageFiles', m);
    })

    // Add props here on submit
    onSave(formData);


  });

 return (
  <FormProvider {...formMethods}>
    <div className="min-h-screen flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">
            Advertise your hotel now
          </h1>

          <p className="text-gray-500 text-lg">
            It’s simple, fast, and takes only a few minutes to publish your listing.
          </p>

          <div className="bg-green-50 border border-green-100 rounded-3xl p-6">
            <p className="text-green-800 font-medium">
              ✔ Reach thousands of travelers
            </p>
            <p className="text-green-700">
              ✔ Manage bookings easily
            </p>
            <p className="text-green-700">
              ✔ Increase your visibility
            </p>
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 col-span-2">

          <form className="flex flex-col gap-8" onSubmit={onSubmit}>

            <HotelDetailsSection />
            <TypeSection />
            <FacilitiesSection />
            <GuestsSection />
            <ImagesSection />

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-3 rounded-2xl transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Uploading..." : "Publish Hotel"}
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>
  </FormProvider>
);
};

export default ManageHotelForm;
