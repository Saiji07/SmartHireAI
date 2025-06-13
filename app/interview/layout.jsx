"use client"
import { useState } from "react";
import InterviewHeader from "./_components/InterviewHeader";
import { interviewDataContext } from "@/context/InterviewDataContext";
export default function InterviewLayout({children})
{const [interviewInfo,setInterviewInfo]=useState();
    return (
        <interviewDataContext.Provider value={{interviewInfo,setInterviewInfo}}>
        <div className="bg-secondary">
            <InterviewHeader></InterviewHeader>
        {children}
        </div>
        </interviewDataContext.Provider>
    );
}