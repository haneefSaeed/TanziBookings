import { useForm } from "react-hook-form";
import { UserType } from "../../../../backend/src/shared/types"

type Props = {
    currentUser : UserType;
}

type BookingFormData = {
    firstName: string, 
    lastName : string;
    email: string;
}
const BookingForm = ({currentUser}: Props) => {
    const {handleSubmit, register} = useForm<BookingFormData>(
        {
            defaultValues : {
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
                email: currentUser.email,
            }
        }
    );


  return (
    <form className="grid grid-cols-1 gap-5 p-5">
        <h1 className="text-2xl font-bold">Confirm Your Detail</h1>
        <div className="grid grid-cols-2 gap-6">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name :
                <input className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
                type="text" 
                readOnly
                disabled
                {...register("firstName", {
                    
                })}
                >

                </input>
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name :
                <input className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
                type="text" 
                readOnly
                disabled
                {...register("lastName", {
                    
                })}
                >

                </input>
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email :
                <input className="mt-1 border rounded w-full py-2 px-3  text-gray-700 bg-gray-200 font-normal"
                type="email" 
                readOnly
                disabled
                {...register("email", {
                    
                })}
                >

                </input>
            </label>
        </div>
    </form>
  )
}

export default BookingForm;