import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

function ImagesSection() {
  const {
    register,
    formState: { errors }, watch
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls")

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-3">Images</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        <input
          type="file"
          multiple
          accept="image/*"
          {...register("imageFiles", {
            validate: (imgFile) =>{
              const len = imgFile.length;
              if(len===0){
                return "Upload at least one picture"
              }
              if(len>6){
                return "You cannot upload more than 6 images"
              }
              return true
            }
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
