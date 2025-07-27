import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { InterviewType } from "@/services/Constants";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
export default function FormContainer({onHandleInputChange,goToNext})
{
    const [interviewType,setInterviewType]=useState([]);
    useEffect(()=>{
if(interviewType)
{
    onHandleInputChange('type',interviewType);
}
    },[interviewType])

const addInterview=(title)=>{
    const data=interviewType.includes(title);
    if(!data)
    {
       setInterviewType(prev=>[...prev,title])
    }
    else{
        const res=interviewType.filter(item=>item!=title)
        setInterviewType(res);
    }
}
    return (
        <div className="p-5 bg-white rounded-xl">
            <div>
  <h2 className="text-sm mb-2 font-bold font-medium">Job Position</h2>
  <Input placeholde="eg.Full Stack Developer" 
  onChange={(event)=>onHandleInputChange('jobPosition',event.target.value)}
  />
            </div>
             <div className="mt-5">
  <h2 className="text-sm mb-2 font-bold font-medium">Job Description</h2>
  <Textarea placeholder="Write Job Description Here" className='h-[200px]'
   onChange={(event)=>onHandleInputChange('jobDescription',event.target.value)}
  />

            </div>
                <div className="mt-5">
  <h2 className="text-sm mb-2 font-bold font-medium">Interview Duration</h2>
<Select onValueChange={(value)=>onHandleInputChange('duration',value)}>
  <SelectTrigger className="w-full mt-2">
    <SelectValue placeholder="Select duration" />
  </SelectTrigger>
  <SelectContent>
       <SelectItem value="5 Min">5 Min</SelectItem>
    <SelectItem value="15 Min">15 Min</SelectItem>
    <SelectItem value="30 Min">30 Min</SelectItem>
    <SelectItem value="45 Min">45 Min</SelectItem>
    <SelectItem value="60 Min">60 Min</SelectItem>
  </SelectContent>
</Select>

            </div>
<div className="mt-5">
  <h2 className="text-sm mb-2 font-bold font-medium">Interview Type</h2>
  <div className="flex gap-3 flex-wrap ">
{InterviewType.map((type,index)=>(

<div className={`flex items-center gap-2 p-1 px-2 bg-white border border-gray-300 rounded-2xl hover:bg-secondary cursor-pointer
${ interviewType.includes(type.title)&&'bg-blue-50 text-primary'}`}
key={index} onClick={()=>addInterview(type.title)}>
    <type.icon className="h-4 w-4"/>
    <span>{type.title}</span>
</div>

) )}
</div>

            </div>
            <div className='mt-7 flex justify-center'> 
<Button onClick={goToNext}>Generate Question <ArrowRight/></Button>
            </div>

        </div>
    );
}