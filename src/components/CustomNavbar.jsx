"use client";

import UserContext from '@/context/userContext';
import { logout } from '@/services/userService';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import React, { useContext } from 'react'
import { toast } from 'react-toastify';

const CustomNavbar = () => {
  const {user,setUser} = useContext(UserContext);
  const router = useRouter()
  const doLogout = async () => {
    try {
        const result = await logout();
        setUser(undefined);
        router.push('/login');
    } catch (error) {
        console.log(error);
        toast.error("Logout error");
    }
  }

  return (
    <nav className='bg-blue-600 h-12 py-2 px-3 flex justify-between items-center text-white'>
        <div className='brand'>
            <h1 className='text-2xl font-semibold'>
                <Link href={"/"}>Work Manager</Link>
            </h1>
        </div>
        <div>
            <ul className='flex space-x-5'>
                {user &&  (
                    <>
                        <li>
                            <Link href={"/"} className='hover:text-blue-200'>Home</Link>
                        </li> 
                        <li>
                            <Link href={"/add-task"} className='hover:text-blue-200'>Add Task</Link>
                        </li>
                        <li>
                            <Link href={"/show-tasks"} className='hover:text-blue-200'>Show Tasks</Link>
                        </li>
                    </>
                )} 
            </ul>
        </div>
        <div>
            <ul className='flex space-x-5'>
               {user ? (
                <>
                    <li><Link href={'#'}>{`Welcome ${user.name}`}</Link></li> 
                    <li><button onClick={doLogout}>Logout</button></li>
                </>
               ):(
                <>
                    <li><Link href={'/login'}>SignIn</Link></li> 
                    <li><Link href={'/signup'}>SignUp</Link></li>
                </>
               )}
            </ul>
        </div>
    </nav>
  )
}

export default CustomNavbar