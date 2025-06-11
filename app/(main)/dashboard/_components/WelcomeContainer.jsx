"use client";
import Image from 'next/image';
import { useUser } from '@/context/UserDetailContext'; // ✅ Correct path
import React from 'react';

export default function WelcomeContainer() {
  const { user } = useUser();
  console.log(user);

  return (
    <div className='bg-white p-3 rounded-2xl flex justify-between items-center '>
        <div className='bg-white p-3 rounded-2xl'> 
      <h2 className='text-lg font-bold'>Welcome, {user?.name || "Guest"}</h2>
      <h2 className='text-gray-500'>AI- Driven Interviews, Hassle Free Hiring</h2>
      </div>
      {user?.picture&&<Image className='rounded-full' src={user?.picture} width={50} height={50} alt='user avtar'></Image>}
    </div>
  );
}
