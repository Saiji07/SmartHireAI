"use client"
import { Toaster } from "@/components/ui/sonner"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { toast } from "sonner";

export default function CreateInterview()
{const router=useRouter();
    const [step,setStep]=useState(1);
    const [formData,setFormData]=useState();
    const onHandleInputChange=(feild,value)=>{
        setFormData(
            (prev)=>(
                {
                    ...prev,
                    [feild]:value
                }))
                console.log(formData);
    }
    const goToNext=()=>{
        console.log("into go next");
        console.log(formData);
        if(!formData?.jobPosition ||!formData?.duration||!formData?.type||!formData?.jobDescription)
        {
            toast('Please Enter All Details')
            return ;
        }
        setStep(step+1);
    }
    return(
        <div className="mt-10 px-10 md:px-24 lg:px-44 xl:px-56">
            <div className="flex gap-5 items-center">
                <ArrowLeft onClick={()=>router.back()} className="cursor-pointer"/>
                <h2 className="font-bold text-2xl"> Create New Interview</h2>
              
            </div>
             <Progress value={step*33.33} className='my-5'/>
             {step==1?<FormContainer onHandleInputChange={onHandleInputChange} goToNext={goToNext}></FormContainer>:
             step==2?<QuestionList formData={formData}></QuestionList>:null}
             
        </div>
    );
}