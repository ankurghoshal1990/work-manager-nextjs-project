"use client";

import React from 'react'

const Footer = () => {
  return (
    <footer className='h-40 bg-blue-900 text-white'>
        <div className='flex p-5 justify-around'>
            <div className='text-center flex flex-col justify-center'>
                <h1 className='text-2xl'>Work Manager Welcomes You</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, velit.</p>
            </div>
            <div className='text-center'>
                <h1>Important Links</h1>
                <ul>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Youtube</a></li>
                    <li><a href="#">Instagram</a></li>
                </ul>
            </div>
        </div>
    </footer>
  )
}

export default Footer