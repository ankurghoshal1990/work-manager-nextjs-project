"use client";

import UserContext from '@/context/userContext';
import { login } from '@/services/userService';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';

const Login = () => {
  const {user,setUser} = useContext(UserContext);
  const router = useRouter()
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const resetForm = () => {
    setData({
        ...data,
        email:"",
        password:"",
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Field validation
    for(let key in data){
      if(data[key].trim() === "" || data[key].trim() == null){
          toast.warning(`Field ${key} is required`);
          return;
      }
    }
    // Form submission
    try {
      const result = await login(data);
      toast.success("Logged In");
      setUser(result.user);
      // redirect
      router.push('/profile/user');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className='grid grid-cols-12'>
      <div className='col-span-4 col-start-5'>
          <div className='py-5'>
            <h1 className='text-3xl text-center'>Login Here</h1>
              <form action="#" className='mt-5' onSubmit={handleSubmit}>
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
                      setData({
                          ...data,
                          email: event.target.value,
                      });
                    }}
                    value={data.email}
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
                      setData({
                          ...data,
                          password: event.target.value,
                      });
                    }}
                    value={data.password}
                  />
                </div>
                {/* action buttons */}
                <div className='mt-4 flex justify-center'>
                  <button type='submit' className='bg-green-600 py-2 px-3 rounded-lg hover:bg-green-800 text-white'>
                      Login
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

export default Login