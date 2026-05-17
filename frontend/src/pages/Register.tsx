import { SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

       useEffect(() => {
        document.title = "Register | TanziBooking";
      }, []);


    const { showToast } = useAppContext();

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            showToast({ message: "Registeration Success", type: "SUCCESS" })
            navigate("/")
        },
        onError: async (err: Error) => {
            showToast({ message: "Error at registeration: " + err.message, type: "ERROR" })
        }
    })

    const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
        mutation.mutate(data);
    }

   return (
  <div className=" flex items-center justify-center px-4">
    <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10 bg-white border  shadow-lg rounded-2xl overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center p-10 text-black">
        <h2 className="text-4xl font-bold mb-3">Create Account</h2>
        <p className="text-black/80 text-lg">
          It’s easy. Just fill the form and get started in seconds.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

          {/* NAME */}
          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex-1 text-sm font-semibold text-gray-700">
              First Name
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("firstName", { required: "Required" })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">{errors.firstName.message}</span>
              )}
            </label>

            <label className="flex-1 text-sm font-semibold text-gray-700">
              Last Name
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("lastName", { required: "Required" })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">{errors.lastName.message}</span>
              )}
            </label>
          </div>

          {/* EMAIL */}
          <label className="text-sm font-semibold text-gray-700">
            Email
            <input
              className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </label>

          {/* PASSWORDS */}
          <div className="flex flex-col md:flex-row gap-4">
            <label className="flex-1 text-sm font-semibold text-gray-700">
              Password
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("password", {
                  required: "Required",
                  minLength: {
                    value: 6,
                    message: "Min 6 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-xs">{errors.password.message}</span>
              )}
            </label>

            <label className="flex-1 text-sm font-semibold text-gray-700">
              Confirm Password
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) return "Required";
                    if (watch("password") !== val) return "Passwords don't match";
                  },
                })}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="mt-3 w-full rounded-xl bg-green-700 py-3 font-semibold text-white hover:bg-green-600 transition"
          >
            Create Account
          </button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  </div>
);
}

export default Register