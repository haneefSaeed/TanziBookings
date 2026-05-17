import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

return (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Guests</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Adults */}
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Adults
        <input
          min={1}
          type="number"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("adultCount", {
            required: "This field is required",
          })}
        />
        {errors.adultCount && (
          <span className="text-red-500 text-xs">
            {errors.adultCount.message}
          </span>
        )}
      </label>

      {/* Children */}
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Children
        <input
          min={0}
          type="number"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("childCount", {
            required: "This field is required",
          })}
        />
        {errors.childCount && (
          <span className="text-red-500 text-xs">
            {errors.childCount.message}
          </span>
        )}
      </label>
    </div>
  </div>
);
}

export default GuestsSection;
