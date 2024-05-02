import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client' 
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}
const SignIn = ()=>{
    const queryClient = useQueryClient();
    const {register, handleSubmit, formState: {errors}} = useForm<SignInFormData>();
    const {showToast} = useAppContext();
    const navigate=  useNavigate();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken");
            showToast({message: "Login Success", type:"SUCCESS"})
            navigate("/");
        },
        onError: async(err: Error)=>{
            showToast({message: err.message, type: "ERROR"})
        }
    });
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data); // calls the signIn function
    })
    return (
        <form onSubmit = {onSubmit}className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Sign In</h2>

            <div className="flex flex-col w-1/3 gap-2">
            <label className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input type="text"  className="border rounded w-full py-1 px-2 font-normal"  
                    {...register("email", {
                        required: "This field is required", 
                        pattern: 
                        {
                          value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: 'Invalid email address',
                        }
                      })} />
                     {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                </label>
        
            
            
                <label htmlFor="password" className="text-gray-700 text-sm font-bold flex-1">
                    password
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("password", {required: "This field is required", minLength:{
                        value: 6, 
                        message: "Password should be minimum 6 characters"
                    }})} />
                     {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </label>



                </div>
                <span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-x1">Sign In</button>
           <p className="text-sm pt-2">Not Registered? <Link to="/register"  className="underline"> Register Here</Link></p>
           </span>
        </form>
    )
}


export default SignIn;
