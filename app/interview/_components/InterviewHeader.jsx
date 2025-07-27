import React from "react";
import Image from "next/image";
export default function InterviewHeader()
{
    return(
        <div className="p-4 shadow-sm">
           <Image src={'/logo.png'} alt='logo' width={100} height={100} 
          className='w-[80px]'
           ></Image>
        </div>
    );
}