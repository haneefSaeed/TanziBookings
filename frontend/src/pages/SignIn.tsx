import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client' 
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}
const SignIn = ()=>{
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState: {errors}} = useForm<SignInFormData>();
    const {showToast} = useAppContext();
    const navigate=  useNavigate();
    const location = useLocation();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken");
            showToast({message: "Login Success", type:"SUCCESS"})
            navigate(location.state?.from?.pathname || "/"); //location from GuestInfoForm
        },
        onError: async(err: Error)=>{
            showToast({message: err.message, type: "ERROR"})
        }
    });
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data); // calls the signIn function
    })
 return (
  <div className=" flex items-center justify-center px-4">
    <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 bg-white border  shadow-lg rounded-2xl overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center p-10 text-black">
        <h2 className="text-4xl font-bold mb-3">Sign In</h2>
        <p className="text-black/80 text-lg">
          Welcome back, please enter your details
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="p-10">

    <form
      onSubmit={onSubmit}
      className="w-full max-w-md bg-white rounded-xl shadow-sm border-gray-200 p-8 flex flex-col gap-6"
    >

      {/* Email */}
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Email
        <input
          type="email"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("email", {
            required: "This field is required",
            pattern: {
              value:
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-xs">
            {errors.email.message}
          </span>
        )}
      </label>

      {/* Password */}
      <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
        Password
        <input
          type="password"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password should be minimum 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500 text-xs">
            {errors.password.message}
          </span>
        )}
      </label>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-green-700 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition"
      >
        Sign In
      </button>

      {/* Footer */}
      <p className="text-sm text-center text-gray-600">
        Not registered?{" "}
        <Link to="/register" className="text-green-700 font-semibold hover:underline">
          Create account
        </Link>
      </p>
    </form>
   </div>
    </div>
  </div>
);
}


export default SignIn;
