import {SubmitHandler, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query';
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { Link, useNavigate } from 'react-router-dom';

export interface RegisterFormData {
    firstName: string;
    lastName:  string; 
    email:  string;
    password: string; 
    confirmPassword: string;
}
const Register = ()=>{
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    const {showToast} = useAppContext();

    const {register, watch, handleSubmit, formState: {errors}} = useForm<RegisterFormData>();
    
    const mutation = useMutation(apiClient.register, {
        onSuccess: async ()=>{
            await queryClient.invalidateQueries("validateToken")
            showToast({message: "Registeration Success", type: "SUCCESS"})
            navigate("/")
        },
        onError: async (err: Error)=>{
            showToast({message: "Error at registeration: " + err.message , type:"ERROR"})
        }
    })

    const onSubmit : SubmitHandler<RegisterFormData> = (data)=>{
        mutation.mutate(data);
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="firstName" className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("firstName", {required: "This field is required"})} />
                 {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                </label>
                <label htmlFor="lastName" className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal"
                    {...register("lastName", {required: "This field is required"})}
                      />
                    {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                </label>
            </div>
         

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
        
                
        
            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="password" className="text-gray-700 text-sm font-bold flex-1">
                    password
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("password", {required: "This field is required", minLength:{
                        value: 6, 
                        message: "Password should be minimum 6 characters"
                    }})} />
                     {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                </label>
                <label htmlFor="confirmPassword" className="text-gray-700 text-sm font-bold flex-1">
                    password
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("confirmPassword", {
                        validate: (val)=>{
                            if(!val){
                                return "This field is required!"
                            }else if(watch("password")!= val){
                                return "Your password do not match"
                            }
                        }
                    })} />
                    {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}

                </label>
            </div>
           <span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-x1">Create Account</button>
            <p className="text-sm pt-2">Already Registered? <Link to="/login"  className="underline"> Login Here</Link></p>
           
           </span>
        </form>
    )
}

export default Register