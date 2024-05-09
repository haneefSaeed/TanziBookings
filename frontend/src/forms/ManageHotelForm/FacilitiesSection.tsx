import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Facilities</h1>
      <div className="grid grid-cols-5 gap-3">
        {hotelFacilities.map((fac) => (
          <label key={fac} className="text-gray-700 text-sm font-bold flex-1">
            <input
              type="checkbox"
              value={fac}
              className=""
              {...register("facilities", {
                validate: (facs) =>
                  facs && facs.length > 0
                    ? true
                    : "At least one facility is required",
              })}
            />{" "}
            {fac}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
