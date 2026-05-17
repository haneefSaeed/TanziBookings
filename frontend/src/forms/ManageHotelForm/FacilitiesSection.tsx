import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
 return (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Facilities</h1>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {hotelFacilities.map((fac) => (
        <label
          key={fac}
          className="cursor-pointer select-none"
        >
          <input
            type="checkbox"
            value={fac}
            className="peer hidden"
            {...register("facilities", {
              validate: (facs) =>
                facs && facs.length > 0
                  ? true
                  : "At least one facility is required",
            })}
          />

          <div className="
            flex items-center justify-center
            rounded-lg border border-gray-300
            px-3 py-2 text-sm font-medium
            text-gray-700
            transition
            hover:border-green-500 hover:text-green-600
            peer-checked:bg-green-600
            peer-checked:text-white
            peer-checked:border-green-600
          ">
            {fac}
          </div>
        </label>
      ))}
    </div>

    {errors.facilities && (
      <span className="text-red-500 text-sm">
        {errors.facilities.message}
      </span>
    )}
  </div>
);
};

export default FacilitiesSection;
