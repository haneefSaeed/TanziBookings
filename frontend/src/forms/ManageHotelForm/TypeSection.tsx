import { hotelTypes } from "../../config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Type</h2>

    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {hotelTypes.map((type) => (
        <label key={type} className="cursor-pointer select-none">
          <input
            type="radio"
            value={type}
            className="peer hidden"
            {...register("type", {
              required: "This field is Required",
            })}
          />

          <div
            className="
              flex items-center justify-center
              rounded-lg border border-gray-300
              px-3 py-2 text-sm font-medium
              text-gray-700
              transition
              hover:border-green-500 hover:text-green-600
              peer-checked:bg-green-600
              peer-checked:text-white
              peer-checked:border-green-600
            "
          >
            {type}
          </div>
        </label>
      ))}
    </div>

    {errors.type && (
      <span className="text-red-500 text-sm">
        {errors.type.message}
      </span>
    )}
  </div>
);
};

export default TypeSection;
