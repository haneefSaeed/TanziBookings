import { hotelTypes } from "../../config/hotel-options-config";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  // find the value of selected value
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={
              // if new type is current type value
              typeWatch == type
                ? "cursor-pointer rounded-sm bg-green-300 text-sm px-4 py-2"
                : "cursor-pointer bg-gray-300 rounded-sm text-sm px-4 py-2"
            }
          >
            <input
              type="radio"
              className="hidden" // hide radio button
              value={type}
              {...register("type", { required: "This field is Required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
