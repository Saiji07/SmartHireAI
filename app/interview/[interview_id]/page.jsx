"use client"
import { Clock, Info, Loader2Icon, Video } from "lucide-react";
import InterviewHeader from "../_components/InterviewHeader";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/services/supabaseClient";
import { useRouter } from "next/navigation"; 

import { interviewDataContext } from "@/context/InterviewDataContext";

export default function Interview()
{
    const {interview_id}=useParams();
    console.log(interview_id);
    const [interviewData,setInterviewData]=useState();
    const [loading,setLoading]=useState(false);
    const [username,setUsername]=useState();
    const {interviewInfo,setInterviewInfo}=useContext(interviewDataContext);
    const router=useRouter();
    const[userEmail,setUserEmail]=useState();
    useEffect(()=>{
      interview_id&& GetInterviewDetails();
    },[interview_id])
    const GetInterviewDetails=async()=>{
      setLoading(true);
      try{
      let { data: interviews, error } = await supabase
  .from('interviews')
  .select("jobPosition,jobDescription,duration,type")
  .eq('interview_id',interview_id)

  console.log(interviews);
  setInterviewData(interviews[0]);
   setLoading(false);
      }
      catch{
 setLoading(false);
 toast('Incorrect Interview Link');
      }

 
    }
    const onJoinInterview=async()=>{
      setLoading(true);
let { data: interviews, error } = await supabase
  .from('interviews')
  .select("*")
 .eq('interview_id',interview_id);
 
 console.log("Username:", username);

 setInterviewInfo({
  userName:username,
  userEmail:userEmail,
  interviewData:interviews[0]
 });
 setLoading(false);
 router.push('/interview/'+interview_id+'/start')
    }
    
    return (
        <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-16">
<div className="flex flex-col items-center justify-center border rounded-lg bg-white p-7 lg:px-32 xl:px-52 ">
    <Image src={'/logo.png'} alt='logo' width={100} height={100} 
             className='w-[80px]'></Image>
<h2 className="font-bold mt-3">AI-Powered Interview Platform</h2>
<Image src={'/interview.jpg'} width={500} height={500} className="w-[280px] mt-2 border border-blue-50 rounded-2xl"></Image>

<h2 className="font-bold text-xl mt-1 ">{interviewData?.jobPosition}</h2>
<h2 className="flex gap-2 items-center text-gray-500 mt-3"><Clock className="h-4 w-4"></Clock>{interviewData?.duration}</h2>
<div className="w-full">
    <h2 className="mb-2">Enter Your Full Name</h2>
    <Input placeholder='e.g. Saiji Desai' onChange={(event)=>setUsername(event.target.value)}/>
</div>
<div className="w-full">
    <h2 className="mb-2">Enter Your Email</h2>
    <Input placeholder='e.g. Saiji@gmail.com' onChange={(event)=>setUserEmail(event.target.value)}/>
</div>
<div className="mt-4 p-5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-4 shadow-sm">
  <div className="text-blue-600 mt-1">
    <Info className="h-6 w-6" />
  </div>
  <div>
    <h2 className="text-base sm:text-lg font-semibold text-blue-800 mb-2">Before You Begin</h2>
    <ul className="list-disc list-inside text-sm sm:text-base text-blue-900 space-y-1">
      <li>Test your camera and microphone</li>
      <li>Ensure you have a stable internet connection</li>
      <li>Find a quiet place for the interview</li>
    </ul>
  </div>
</div>

<Button  onClick={onJoinInterview} className=" mt-5 flex items-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-md" disabled={loading || !username}>
  <Video className="h-4 w-4" />
  {loading && <Loader2Icon></Loader2Icon>}Join Interview
</Button>

</div>  
        </div>
    );
}