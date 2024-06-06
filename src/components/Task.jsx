import UserContext from '@/context/userContext'
import React, { useContext } from 'react'
import { RxCross1 } from "react-icons/rx";

const Task = ({task, performDeleteTask}) => {
  const {user} = useContext(UserContext);
  
  return (
    <div className={`shadow-lg mt-2 rounded-md
          ${task.status == "completed" ? "bg-green-600": "bg-gray-600"}`}
    >
      <div className='p-5'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold'>{task.title}</h1>
          <span onClick={() => performDeleteTask(task._id)} className='shadow-lg hover:bg-gray-950 bg-gray-700 rounded-full w-6 h-6 flex justify-center items-center cursor-pointer'>
            <RxCross1 />
          </span>
        </div>
        <p className='font-normal'>{task.content}</p>
        <div className='flex justify-between mt-3'>
          <p className='text-left'>
            Status: <span className='font-bold'>{task.status.toUpperCase()}</span>
          </p>
          <p className='text-right'>
            Author: <span className='font-bold'>{user?.name}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Task