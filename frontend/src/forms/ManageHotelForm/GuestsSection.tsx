import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="bg-gray-200 p-2">
      <h1 className="text-2xl font-bold mb-3">Guests</h1>
      <div className="grid grid-cols-2 gap-3">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Adult
          <input
            min={1}
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("adultCount", {
              required: "This field is required",
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Child
          <input
            min={1}
            type="number"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("childCount", {
              required: "This field is required",
            })}
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
}

export default GuestsSection;
