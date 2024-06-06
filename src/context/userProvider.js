"use client";

import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { currentUser } from '@/services/userService'

const UserProvider = ({children}) => {
  const [user,setUser] = useState(undefined);

  useEffect(()=>{
    const load = async () => {
        try {
            const loggedInUser = await currentUser();
            setUser({...loggedInUser});
        } catch (error) {
            console.log(error);
            setUser(undefined);
        }
    }
    if(!user) load();
  },[])
  
  return (
    <UserContext.Provider value={{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider