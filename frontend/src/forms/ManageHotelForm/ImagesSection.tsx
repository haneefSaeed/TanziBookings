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
    <div className="">
      <h1 className="text-2xl font-bold mb-3">Images</h1>
      {existingImageUrls && (
        <div className="grid grid-cols-6 gap-6">
          {existingImageUrls.map((url) => (
            <div className="relative group">
              <img src={url} className="min-h-full object-cover" />
              <button onClick={(e)=>handleDelete(e, url)} className="absolute inset-0 flex justify-items-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <label className="text-gray-700 text-sm font-bold flex-1">
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imgFile) => {
              const len = imgFile.length + (existingImageUrls?.length || 0);
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
        {errors.imageFiles && (
          <span className="text-red-500 font-sm">
            {errors.imageFiles.message}
          </span>
        )}
      </label>
    </div>
  );
}

export default ImagesSection;
