import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function ImagesSection() {
  const {
    register,
    formState: { errors },
    watch, setValue
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");
  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
  event.preventDefault();
  // check existing, get only not match the image URL, return new array, set to imageUrls on the form
    setValue("imageUrls", existingImageUrls.filter((url)=>url!==imageUrl))
  };

  return (
  <div className="space-y-4">
    <h1 className="text-2xl font-bold">Images</h1>

    {/* Existing images */}
    {existingImageUrls && existingImageUrls.length > 0 && (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {existingImageUrls.map((url) => (
          <div key={url} className="relative group rounded-lg overflow-hidden border">
            <img
              src={url}
              className="w-full h-28 object-cover"
            />

            <button
              onClick={(e) => handleDelete(e, url)}
              className="
                absolute inset-0 flex items-center justify-center
                bg-black/60 text-white text-sm font-semibold
                opacity-0 group-hover:opacity-100
                transition
              "
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    )}

    {/* Upload input */}
    <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:border-green-500 transition">
      <input
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        {...register("imageFiles", {
          validate: (imgFile) => {
            const len =
              imgFile.length + (existingImageUrls?.length || 0);

            if (len === 0) {
              return "Upload at least one picture";
            }
            if (len > 6) {
              return "You cannot upload more than 6 images";
            }
            return true;
          },
        })}
      />

      <div className="text-center">
        <p className="font-semibold text-gray-700">
          Click to upload images
        </p>
        <p className="text-xs text-gray-500">
          Max 6 images (JPG, PNG)
        </p>
      </div>
    </label>

    {errors.imageFiles && (
      <span className="text-red-500 text-sm">
        {errors.imageFiles.message}
      </span>
    )}
  </div>
);
}

export default ImagesSection;
