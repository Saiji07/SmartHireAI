"use client"
import { Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Camera, Plus } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function LatestInterviewsList()
{
    const [interviewList,setInterviewList]=useState([]);
    return(
        <div className="my-5">
        <h2 className="font-bold text-2xl">Previously Created Interviews</h2>
           { interviewList?.length==0 &&<Link href='dashboard/create-interview' className="mt-4 bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3 items-center">
<Video className="h-10 w-10 text-primary"></Video>
<h2>You Don't Have Any Interview Created</h2>
<Button className='mt-5 rounded-xl'><Plus/> Create New Interview</Button>
            </Link>}
           
        </div>
    );
}