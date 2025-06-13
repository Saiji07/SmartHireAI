"use client"
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserDetailContext";
import InterviewCard from "./InterviewCard";

export default function AllInterview()
{
   const [interviewList,setInterviewList]=useState([]);
    const {user}=useUser();
    useEffect( ()=>{
user&& GetInterviewList();
    },[user])
    const GetInterviewList=async()=>{
        
let { data: interviews, error } = await supabase
  .from('interviews')
  .select('*')
  .eq('userEmail',user?.email)
  .order('id',{ascending:false});
  console.log(interviews);
  setInterviewList(interviews);

          
    }
 
    return(
        <div className="my-5">
        <h2 className="font-bold text-2xl">ALL Created Interviews</h2>
           { interviewList?.length==0 &&<Link href='dashboard/create-interview' className="mt-4 bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3 items-center">
<Video className="h-10 w-10 text-primary"></Video>
<h2>You Don't Have Any Interview Created</h2>
<Button className='mt-5 rounded-xl'><Plus/> Create New Interview</Button>
            </Link>}
           {interviewList && 
           <div className="grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5 ">
            {interviewList.map((interview,index)=>(
                <InterviewCard interview={interview} key={index}></InterviewCard>
            ))}
            </div>
           } 
           
        </div>
    );
}