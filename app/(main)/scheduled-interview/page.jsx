"use client"
import { useUser } from "@/context/UserDetailContext";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserDetailContext";
import { supabase } from "@/services/supabaseClient";

export default function Scheduled()
{
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);
    useEffect(()=>{
user&&GetInterviewList()
    },[user])
    const GetInterviewList= async()=>{
        let { data: interviews, error } = await supabase
  .from('interviews')
  .select('jobPosition,duration,interview_id,interview-feedback(userEmail)')
  .eq('userEmail',user?.email)
  .order('id',{ascending:false});
  console.log(interviews);
setInterviewList(interviews);
 
    }
    return(
        <div>Scheduled Interview</div>
    );
}