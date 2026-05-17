import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const HotelDetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
  <div className="flex flex-col gap-6">
    <h1 className="text-3xl font-bold">Describe your hotel</h1>

    {/* Name / City / Country */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Name
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        City
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("city", { required: "This field is required" })}
        />
        {errors.city && <span className="text-red-500 text-xs">{errors.city.message}</span>}
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Country
        <input
          type="text"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("country", { required: "This field is required" })}
        />
        {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
      </label>
    </div>

    {/* Description */}
    <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
      Description
      <textarea
        rows={6}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
        {...register("description", { required: "This field is required" })}
      />
      {errors.description && (
        <span className="text-red-500 text-xs">{errors.description.message}</span>
      )}
    </label>

    {/* Price + Rating */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Price per night
        <input
          type="number"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && (
          <span className="text-red-500 text-xs">{errors.pricePerNight.message}</span>
        )}
      </label>

      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Star rating
        <select
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("starRating", { required: "This field is required" })}
        >
          <option value="">Select rating</option>
          {[1, 2, 3, 4, 5].map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>

        {errors.starRating && (
          <span className="text-red-500 text-xs">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  </div>
);
};
export default HotelDetailsSection;
