// app\(main)\scheduled-interview\[interview_id]\details\page.jsx
// or app\(main)\scheduled-interview\[interview_id]\details\index.jsx (if using pages router)

"use client"
import { useUser } from "@/context/UserDetailContext";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient"; // Make sure supabase is imported
import InterviewDetailContainer from "./_components/InterviewDetaliContainer";
import CandidateList from "./_components/CandidateList";

export default function InterviewDetail()
{
    const {user}=useUser();
    const [interviewDetail,setInterviewDetail]=useState(null); // Initialize with null or {}
                                                            // null is better for checking if data loaded
    useEffect(()=>{
        user && GetInterviewDetail();
    },[user, useParams]); // Added useParams to dependency array to re-fetch if ID changes

    const {interview_id}=useParams(); // Moved inside component to ensure it's available

    const GetInterviewDetail=async()=>{
        if (!interview_id || !user?.email) { // Add checks to ensure params and user are ready
            console.log("Waiting for interview_id or user email to fetch details.");
            return;
        }
        try {
            const { data, error } = await supabase
                .from('interviews')
                .select('jobPosition,jobDescription,type,questionList,created_at,duration,interview_id,interview-feedback(userEmail,userName,feedback,created_at)') // Added feedback and created_at to interview-feedback
                .eq('userEmail',user?.email)
                .eq('interview_id',interview_id);

            if (error) {
                console.error("Error fetching interview details:", error);
                // Handle error (e.g., show a toast message)
                return;
            }

            if (data && data.length > 0) {
                setInterviewDetail(data[0]);
            } else {
                setInterviewDetail(null); // No data found
                console.warn("No interview details found for ID:", interview_id);
            }
        } catch (e) {
            console.error("Failed to fetch interview details:", e);
        }
    }

    // Show a loading state or message while data is fetching
    if (interviewDetail === null) {
        return <div className="mt-5 text-center text-gray-500">Loading interview details...</div>;
    }
    // Handle case where no data was found after loading
    if (!interviewDetail) {
        return <div className="mt-5 text-center text-red-500">Interview details not found.</div>;
    }

    return(
        <div className="mt-5">
            <h2 className="font-bold text-2xl">Interview Details</h2>
            <InterviewDetailContainer interviewDetail={interviewDetail} />
            {/* Conditionally render CandidateList only when 'interview-feedback' is an array */}
            {interviewDetail?.['interview-feedback'] && (
                <CandidateList detail={interviewDetail['interview-feedback']}></CandidateList>
            )}
            {/* Optional: Message if no candidates */}
            {interviewDetail?.['interview-feedback']?.length === 0 && (
                <p className="text-gray-500 mt-4">No candidates have completed this interview yet.</p>
            )}
        </div>
    );
}