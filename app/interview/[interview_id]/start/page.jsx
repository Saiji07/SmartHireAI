"use client"
import { interviewDataContext } from "@/context/InterviewDataContext";
import { Mic, Phone, Timer } from "lucide-react";
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import Image from 'next/image';
import Vapi from '@vapi-ai/web';
import Alerts from "./_components/alerts";
import { toast } from "sonner";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

export default function Start() {
    const { interviewInfo, setInterviewInfo } = useContext(interviewDataContext);
    const params = useParams();
    const interview_id_param = params?.interview_id; // Correctly get the ID from params

    const API_KEY = process.env.NEXT_PUBLIC_AGENT_KEY;

    const vapi = useMemo(() => new Vapi(API_KEY), [API_KEY]);

    const [activeUser, setActiveUser] = useState(false);
    const [conversation, setConversation] = useState(null);
    const router = useRouter();

    const callActiveRef = useRef(false);
    const feedbackGeneratedRef = useRef(false);
    const latestConversationRef = useRef(null);

    useEffect(() => {
        if (interviewInfo && interview_id_param && !callActiveRef.current) {
            startCall();
        }
    }, [interviewInfo, interview_id_param]); // Dependency for ID

    const startCall = () => {
        let questionList = "";
        interviewInfo?.interviewData?.questionList.forEach((item, index) => {
            questionList += item?.question + (index < interviewInfo.interviewData.questionList.length - 1 ? "," : "");
        });

        const assistantOptions = {
            name: "AI Recruiter",
            firstMessage: "Hi " + interviewInfo?.userName + ", how are you? Ready for your interview on " + interviewInfo?.interviewData?.jobPosition,
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let's get started with a few questions!"
Ask one question at a time and wait for the candidate's response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ${questionList}
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! That's a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let's tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
✅ Be friendly, engaging, and witty 🎤
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level
✅ Ensure the interview remains focused on React
`.trim(),
                    },
                ],
            },
        };

        callActiveRef.current = true;
        vapi.start(assistantOptions);
    };

    const Generatefeedback = async () => {
        if (feedbackGeneratedRef.current) {
            console.log("Feedback already generated, skipping...");
            return;
        }

        const currentConversation = latestConversationRef.current;
        if (!currentConversation) {
            console.error("No conversation data available to generate feedback.");
            toast.error("No conversation data available to generate feedback.");
            router.replace('/interview/' + interview_id_param + '/completed');
            return;
        }

        feedbackGeneratedRef.current = true;
        toast("Generating feedback...");

        try {
            const result = await axios.post('/api/ai-feedback', { conversation: currentConversation });
            console.log("API Raw Response Data (from axios):", result.data); // Log the full data object

            // *** IMPORTANT FIX HERE: Based on your screenshot, result.data directly IS the feedback object
            // It does not have a 'success' or 'content' wrapper.
            // If your API were returning { success: true, content: {...} }, you'd use result.data.content
            // But for { feedback: {...} }, result.data is correct.
            const feedbackContent = result.data; // This variable now holds the { feedback: {...} } object
            console.log("Feedback Content for Supabase (parsed):", feedbackContent);


            // Check if the feedbackContent structure is valid before proceeding
            if (!feedbackContent || !feedbackContent.feedback) {
                throw new Error("Invalid feedback structure received from AI API.");
            }


            const { data, error } = await supabase
                .from('interview-feedback')
                .insert([
                    {
                        userName: interviewInfo?.userName,
                        userEmail: interviewInfo?.userEmail,
                        interview_id: interview_id_param, // Use the corrected ID here
                        feedback: feedbackContent, // Store the entire object you received from AI
                        recommended: feedbackContent.feedback?.Recommendation === "Recommended" || false // Access nested property
                    },
                ])
                .select();

            if (error) {
                throw new Error('Database error: ' + error.message);
            }

            console.log("Database insertion successful:", data);
            toast.success("Feedback generated and saved!");
            router.replace('/interview/' + interview_id_param + '/completed');

        } catch (error) {
            console.error('Error generating feedback:', error);
            feedbackGeneratedRef.current = false; // Reset on error to allow retry
            toast.error('Failed to generate feedback: ' + error.message);
            router.replace('/interview/' + interview_id_param + '/completed'); // Redirect even on error
        }
    };

    useEffect(() => {
        const handleMessage = (message) => {
            if (message?.conversation) {
                const convoString = JSON.stringify(message.conversation);
                console.log("Vapi Message Event - Conversation String:", convoString);
                setConversation(convoString);
                latestConversationRef.current = convoString;
            }
        };

        const handleCallStart = () => {
            toast("Call Connected");
            callActiveRef.current = true;
        };

        const handleSpeechStart = () => {
            console.log("Assistant speech has started.");
            setActiveUser(false);
        };

        const handleSpeechEnd = () => {
            setActiveUser(true);
        };

        const handleCallEnd = () => {
            toast("Interview Ended");
            callActiveRef.current = false;
            console.log("Call ended. Current conversation state:", conversation);
            console.log("Call ended. Latest conversation ref:", latestConversationRef.current);

            if (latestConversationRef.current && !feedbackGeneratedRef.current) {
                Generatefeedback();
            } else if (!latestConversationRef.current) {
                console.warn("Call ended, but no conversation data was captured.");
                toast.warning("Interview ended, but no conversation data was captured. Cannot generate feedback.");
                router.replace('/interview/' + interview_id_param + '/completed');
            }
        };

        vapi.on("message", handleMessage);
        vapi.on("call-start", handleCallStart);
        vapi.on("speech-start", handleSpeechStart);
        vapi.on("speech-end", handleSpeechEnd);
        vapi.on("call-end", handleCallEnd);
        vapi.on("error", (e) => {
            console.error("Vapi Error:", e);
            toast.error("Vapi error: " + e.message);
            callActiveRef.current = false;
            if (latestConversationRef.current && !feedbackGeneratedRef.current) {
                Generatefeedback();
            } else {
                 router.replace('/interview/' + interview_id_param + '/completed');
            }
        });

        return () => {
            vapi.off("message", handleMessage);
            vapi.off("call-start", handleCallStart);
            vapi.off("speech-start", handleSpeechStart);
            vapi.off("speech-end", handleSpeechEnd);
            vapi.off("call-end", handleCallEnd);
            vapi.off("error", () => {});
        };
    }, [vapi, interviewInfo, interview_id_param, router]); // Added interview_id_param to dependencies

    const stopInterview = () => {
        console.log("Stopping interview manually...");
        try {
            vapi.stop();
            callActiveRef.current = false;

            if (latestConversationRef.current) {
                toast("Generating feedback...");
                Generatefeedback();
            } else {
                console.warn("Manual stop: No conversation data to generate feedback, redirecting.");
                toast.warning("No conversation data captured. Redirecting.");
                router.replace('/interview/' + interview_id_param + '/completed');
            }
        } catch (error) {
            console.error('Error stopping call:', error);
            toast.error('Failed to stop interview: ' + error.message);
            router.replace('/interview/' + interview_id_param + '/completed');
        }
    };

    return (
        <div className="p-20 lg:px-48 xl:px-56">
            <h2 className="font-bold text-xl flex justify-between">AI Interview Session
                <span className="flex gap-2 items-center">
                    <Timer></Timer>
                    00:00:00
                </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 ">
                <div className="bg-white h-[400px] rounded-lg border flex flex-col gap-3 items-center justify-center" >
                    <div className="relative">
                        {!activeUser && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>}
                        <Image alt='ai-avtar' src={'/ai.jpg'} width={100} height={100} className="w-[60px] h-[60px] rounded-full object-cover"></Image>
                    </div>
                    <h2>AI Recruiter</h2>
                </div>
                <div className="flex-col gap-3 bg-white h-[400px] rounded-lg border flex items-center justify-center" >
                    <div className="relative">
                        {activeUser && <span className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></span>}
                        <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-5">{interviewInfo?.userName?.[0]}</h2>
                    </div>
                    <h2>{interviewInfo?.userName}</h2>
                </div>
            </div>
            <div className="flex gap-5 items-center justify-center mt-7">
                <Mic className="h-12 w-12 p-3 bg-gray-500 text-white rounded-full cursor-pointer"></Mic>
                <Alerts stopInterview={stopInterview}>
                    <Phone className="h-12 w-10 p-3 bg-red-500 text-white rounded-full cursor-pointer"></Phone>
                </Alerts>
            </div>
            <h2 className="text-sm text-gray-400 text-center mt-5">Interview is in Progress </h2>
        </div>
    );
}