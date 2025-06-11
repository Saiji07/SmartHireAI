"use client";
import  React from 'react'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
export default function Login()
{
    const signInWithGoogle=async ()=>{
        const {error}=await supabase.auth.signInWithOAuth({
            provider:'google'
        })
        if(error)
        {
            console.log('Error',error.message);
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
     
         <div className='flex flex-col items-center border rounded-2xl p-8 '>

            <Image
src={"/logo1.png"} alt='Smart Hire AI'
width={400} height={100}
className='w-[180px] rounded 20-xl'
/>
            
      
         <div className='flex flex-col items-center mt-5'>
            
            <Image
src={"/login.jpg"} alt='Smart Hire AI'
width={900} height={900}
className='w-[400px] h-[250px] rounded 2-xl'
/>
<h2 className='text-2xl font-bold text-center mt-5'>Welcome To SmartHire AI </h2>
<p className='text-gray-500 text-center'>Sign in With Google Authentication </p>
        <Button onClick={signInWithGoogle} className='mt-7 w-full'>Login With Google</Button>
         </div>
            </div>
        </div>
       
     
    );
}