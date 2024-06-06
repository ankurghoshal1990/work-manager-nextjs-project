"use client";

import React, { useState } from 'react'
import loginSvg from "@/assets/images/login.svg"
import Image from 'next/image'
import { addTask } from '@/services/workService';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AddTask = () => {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userId: "",
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(task);
    // validation of the input data
    try {
      const result = await addTask(task);
      console.log(result);
      toast.success("Your task added successfully");
      setTask({
        ...task,
        title:"",
        content:"",
        status:"none"
      });
      router.push('/show-tasks');
    } catch (error) {
      console.log(error);
      toast.error("Task not added");
    }
  }

  return (
    <div className='grid grid-cols-12 justify-center'>
      <div className='col-start-5 col-span-4 shadow-sm p-5'>
          <div className='my-2 flex justify-center'>
            <Image src={loginSvg} style={{
              width: "50%",
            }} alt='Login Header Image'
            />
          </div>
          <h1 className='text-3xl text-center'>Add your task here</h1>
          <form action="#" onSubmit={handleSubmit}>
            {/* task title */}
            <div className='mt-4'>
              <label 
                htmlFor="id_task_title"
                className='block text-sm font-medium mb-2'
              > 
                Title
              </label>
              <input 
                type="text" 
                className="w-full p-3 rounded-3xl bg-gray-600 focus:ring-gray-400 border text-white" 
                id="id_task_title"
                name="task_title"
                onChange={(event)=>{
                  setTask({
                    ...task,
                    title: event.target.value,
                  })
                }}
                value={task.title}
              />
            </div>
            {/* task content */}
            <div className='mt-4'>
              <label 
                  htmlFor="id_task_content"
                  className='block text-sm font-medium mb-2'
              > 
                Content
              </label>
              <textarea
                className="w-full p-3 rounded-3xl bg-gray-600 focus:ring-gray-400 border text-white" 
                rows={6}
                id="id_task_content"
                name="task_content"
                onChange={(event)=>{
                  setTask({
                    ...task,
                    content: event.target.value,
                  })
                }}
                value={task.content}
              />
            </div>
            {/* task status */}
            <div className='mt-4'>
              <label 
                  htmlFor="id_task_status"
                  className='block text-sm font-medium mb-2'
              > 
                Status
              </label>
              <select
                id="id_task_status"
                className="w-full p-3 rounded-3xl bg-gray-600 focus:ring-gray-400 border text-white"
                name="task_status"
                onChange={(event)=>{
                  setTask({
                    ...task,
                    status: event.target.value,
                  })
                }}
                value={task.status}
              >
                <option value="none" disabled>---Select Status---</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            {/* action buttons */}
            <div className='mt-4 flex justify-center'>
              <button type='submit' className='bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800 text-white'>
                Add Task
              </button>
              <button className='bg-red-600 py-2 px-3 rounded-lg hover:bg-red-800 ms-3 text-white'>
                Clear
              </button>
            </div>
          </form>
      </div>
    </div>
  )
}

export default AddTask