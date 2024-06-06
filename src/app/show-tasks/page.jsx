"use client";

import Task from '@/components/Task';
import UserContext from '@/context/userContext';
import { deleteTask, getTasks } from '@/services/workService';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const {user, setUser} = useContext(UserContext);
  const loadTasks = async (userId) => {
    try {
      const taskColl = await getTasks(userId);
      setTasks([...taskColl].reverse());
    } catch (error) {
      console.log(error)
    }
  }

  const performDeleteTask = async (taskId) => {
    try {
      const result = await deleteTask(taskId);
      const newTasks =tasks.filter(task => task._id != taskId)
      setTasks([...newTasks]);
      toast.success("Task is deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete task");
    }
  }

  useEffect(() => {
    if(user) loadTasks(user._id);
  },[user])

  return (
    <div className='grid grid-cols-12 text-white'>
      <div className='col-start-4 col-span-6'>
        <h1 className='text-2xl mb-3'>Your Tasks ({tasks.length})</h1>
        { tasks && tasks.map((task) => (
          <Task task={task} performDeleteTask={performDeleteTask} key={task._id} />
        ))}
      </div>
    </div>
  )
}

export default ShowTasks