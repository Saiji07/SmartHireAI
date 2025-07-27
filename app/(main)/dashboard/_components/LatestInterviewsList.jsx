"use client";

import { Video, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useUser } from "@/context/UserDetailContext";
import InterviewCard from "./InterviewCard";
import { toast } from "sonner";
import { createBrowserClient } from '@supabase/ssr';

export default function LatestInterviewsList() {
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useUser();

    // Create the Supabase client inside the component
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Wrap the data fetching logic in useCallback for optimization
    const GetInterviewList = useCallback(async () => {
        if (!user) return; // Exit if there is no user

        try {
            setLoading(true);
            let { data: interviews, error } = await supabase
                .from('interviews')
                .select('*, interview-feedback(userEmail)')
                .eq('userEmail', user?.email)
                .order('id', { ascending: false })
                .limit(6);

            if (error) throw error;

            setInterviewList(interviews || []);
        } catch (error) {
            console.error('Error fetching interviews:', error);
            toast.error('Failed to load interviews');
        } finally {
            setLoading(false);
        }
    }, [user, supabase]); // Dependencies for this function

    useEffect(() => {
        GetInterviewList();
    }, [GetInterviewList]); // This effect runs when the component mounts or GetInterviewList changes

    if (loading) {
        return (
            <div className="my-5">
                <h2 className="font-bold text-2xl">Previously Created Interviews</h2>
                <div className="mt-4 text-center">Loading interviews...</div>
            </div>
        );
    }

    return (
        <div className="my-5">
            <h2 className="font-bold text-2xl">Previously Created Interviews</h2>

            {interviewList.length === 0 ? (
                <Link href='/dashboard/create-interview' className="mt-4 bg-white border border-gray-200 rounded-lg p-5 flex flex-col gap-3 items-center hover:shadow-md transition-shadow">
                    <Video className="h-10 w-10 text-primary" />
                    <h2>You Don't Have Any Interview Created</h2>
                    <Button className='mt-5 rounded-xl'>
                        <Plus className="mr-2" /> Create New Interview
                    </Button>
                </Link>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 mt-5 xl:grid-cols-3 gap-5">
                    {interviewList.map((interview) => (
                        <InterviewCard
                            interview={interview}
                            key={interview.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}