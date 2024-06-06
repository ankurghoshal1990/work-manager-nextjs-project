"use client";

import React,{useState} from 'react'
import signUpSvg from '@/assets/images/signup.svg';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { signUp } from '@/services/userService';

const SignUp = () => {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileURL: "https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?size=338&ext=jpg&ga=GA1.1.2116175301.1717286400&semt=ais_user",
  });

  const resetForm = () => {
    setUser({
        ...user,
        name: "",
        email: "",
        password: "",
        about: "",
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Field validation
    for(let key in user){
        if(user[key].trim() === "" || user[key].trim() == null){
            toast.warning(`Field ${key} is required`);
            return;
        }
    }
    // Form submission
    try {
        const result = await signUp(user);
        console.log(result);
        toast.success('New user registered successfully');
        resetForm();
    } catch (error) {
        console.log(error);
        toast.error('User Registration Error');
    }
  }

  return (
    <div className='grid grid-cols-12'>
        <div className='col-span-4 col-start-5'>
            <div className='py-5'>
                <div className='my-2 flex justify-center'>
                    <Image src={signUpSvg} style={{
                        width: "60%",
                        }} alt='Sign Up Banner'
                    />
                </div>
                <h1 className='text-3xl text-center'>SignUp Here</h1>
                <form action="#" className='mt-5' onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="mt-3">
                        <label 
                            htmlFor="id_user_name"
                            className='block text-sm font-medium mb-2'
                        > Username </label>
                        <input 
                            type="text" 
                            className='w-full p-3 rounded-2xl bg-gray-600 focus:ring-gray-400 border text-white' 
                            placeholder='Enter here'
                            id='id_user_name'
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    name: event.target.value,
                                });
                            }}
                            value={user.name}
                        />
                    </div>
                    {/* email */}
                    <div className="mt-3">
                        <label 
                            htmlFor="id_email"
                            className='block text-sm font-medium mb-2'
                        > Email </label>
                        <input 
                            type="email" 
                            className='w-full p-3 rounded-2xl bg-gray-600 focus:ring-gray-400 border text-white' 
                            placeholder='Enter here'
                            id='id_email'
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    email: event.target.value,
                                });
                            }}
                            value={user.email}
                        />
                    </div>
                    {/* password */}
                    <div className="mt-3">
                        <label 
                            htmlFor="id_password"
                            className='block text-sm font-medium mb-2'
                        > Password </label>
                        <input 
                            type="password" 
                            className='w-full p-3 rounded-2xl bg-gray-600 focus:ring-gray-400 border text-white' 
                            placeholder='Enter here'
                            id="id_password"
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    password: event.target.value,
                                });
                            }}
                            value={user.password}
                        />
                    </div>
                    {/* about */}
                    <div className="mt-3">
                        <label 
                            htmlFor="id_about"
                            className='block text-sm font-medium mb-2'
                        > About </label>
                        <textarea
                            className='w-full p-3 rounded-2xl bg-gray-600 focus:ring-gray-400 border text-white' 
                            placeholder='Enter here'
                            rows={4}
                            id="id_about"
                            onChange={(event) => {
                                setUser({
                                    ...user,
                                    about: event.target.value,
                                });
                            }}
                            value={user.about}
                        />
                    </div>
                    {/* action buttons */}
                    <div className='mt-4 flex justify-center'>
                        <button type='submit' className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 text-white'>
                            Sign Up
                        </button>
                        <button type='button' onClick={resetForm} className='bg-orange-600 py-2 px-3 rounded-lg hover:bg-orange-800 ms-3 text-white'>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default SignUp