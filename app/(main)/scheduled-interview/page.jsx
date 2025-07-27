"use client"
import { useUser } from "@/context/UserDetailContext";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/services/supabaseClient";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

export default function Scheduled()
{
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);
    useEffect(()=>{
user&&GetInterviewList()
    },[user])
    const GetInterviewList= async()=>{
       const result = await supabase
  .from('interviews')
  .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
  .eq('userEmail',user?.email)
  .order('id',{ascending:false});
  
setInterviewList(result.data);
 
    }
    return(
        <div className="mt-5">
            <h2 className="font-bold text-xl ">Interview List with Candidate Feedback</h2>
                       { interviewList?.length==0 &&<Link href='dashboard/create-interview' className="mt-4 bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3 items-center">
<Video className="h-10 w-10 text-primary"></Video>
<h2>You Don't Have Any Interview Created</h2>
<Button className='mt-5 rounded-xl'><Plus/> Create New Interview</Button>
            </Link>}
           {interviewList && 
           <div className="grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5 ">
            {interviewList?.map((interview,index)=>(
                <InterviewCard interview={interview} key={index} viewDetails={true}></InterviewCard>
            ))}
            </div>
           } 

        </div>
    );
}