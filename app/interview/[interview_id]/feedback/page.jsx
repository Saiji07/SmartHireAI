"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, User, Mail, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import moment from "moment";

export default function FeedbackPage() {
    const { interview_id } = useParams();
    const [feedbackData, setFeedbackData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (interview_id) {
            fetchFeedback();
        }
    }, [interview_id]);

    const fetchFeedback = async () => {
        try {
            setLoading(true);
            
            // Get feedback data for this interview
            const { data: feedback, error: feedbackError } = await supabase
                .from('interview-feedback')
                .select('*')
                .eq('interview_id', interview_id)
                .order('created_at', { ascending: false })
                .limit(1);

            if (feedbackError) {
                throw feedbackError;
            }

            if (!feedback || feedback.length === 0) {
                setError("No feedback found for this interview.");
                return;
            }

            // Get interview details
            const { data: interview, error: interviewError } = await supabase
                .from('interviews')
                .select('jobPosition, duration, created_at')
                .eq('interview_id', interview_id)
                .single();

            if (interviewError) {
                console.warn("Could not fetch interview details:", interviewError);
            }

            setFeedbackData({
                ...feedback[0],
                interviewDetails: interview
            });

        } catch (err) {
            console.error("Error fetching feedback:", err);
            setError("Failed to load feedback. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your feedback...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
                    <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Feedback Not Available</h1>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <Link href="/">
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    const feedback = feedbackData?.feedback?.feedback;
    const ratings = feedback?.rating || {};
    const averageRating = ratings ? 
        Math.round((ratings.technicalSkills + ratings.communication + ratings.problemSolving + ratings.experience) / 4) : 0;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <Link href="/">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                            </Button>
                        </Link>
                        <div className="flex items-center gap-2">
                            {feedback?.Recommendation === "Recommended" ? (
                                <CheckCircle className="h-6 w-6 text-green-600" />
                            ) : (
                                <XCircle className="h-6 w-6 text-red-600" />
                            )}
                            <span className={`font-semibold ${
                                feedback?.Recommendation === "Recommended" ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {feedback?.Recommendation || 'Not Available'}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Interview Feedback</h1>
                    <p className="text-gray-600">
                        {feedbackData?.interviewDetails?.jobPosition && 
                            `Position: ${feedbackData.interviewDetails.jobPosition}`
                        }
                    </p>
                </div>

                {/* Candidate Info */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Candidate Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <User className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Name</p>
                                <p className="font-medium">{feedbackData?.userName || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Email</p>
                                <p className="font-medium">{feedbackData?.userEmail || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Calendar className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Interview Date</p>
                                <p className="font-medium">
                                    {feedbackData?.created_at ? 
                                        moment(feedbackData.created_at).format('MMM DD, YYYY') : 
                                        'Not available'
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-medium">
                                    {feedbackData?.interviewDetails?.duration || 'Not available'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Overall Score */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Overall Score</h2>
                        <div className="text-4xl font-bold text-blue-600 mb-2">
                            {averageRating}/10
                        </div>
                        <div className="w-32 mx-auto">
                            <Progress value={averageRating * 10} className="h-3" />
                        </div>
                    </div>
                </div>

                {/* Skills Assessment */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills Assessment</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Technical Skills</span>
                                <span className="text-lg font-bold text-blue-600">
                                    {ratings.technicalSkills || 0}/10
                                </span>
                            </div>
                            <Progress value={(ratings.technicalSkills || 0) * 10} className="mb-4" />
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Communication</span>
                                <span className="text-lg font-bold text-blue-600">
                                    {ratings.communication || 0}/10
                                </span>
                            </div>
                            <Progress value={(ratings.communication || 0) * 10} className="mb-4" />
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Problem Solving</span>
                                <span className="text-lg font-bold text-blue-600">
                                    {ratings.problemSolving || 0}/10
                                </span>
                            </div>
                            <Progress value={(ratings.problemSolving || 0) * 10} className="mb-4" />
                        </div>
                        
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">Experience</span>
                                <span className="text-lg font-bold text-blue-600">
                                    {ratings.experience || 0}/10
                                </span>
                            </div>
                            <Progress value={(ratings.experience || 0) * 10} className="mb-4" />
                        </div>
                    </div>
                </div>

                {/* Summary */}
                {feedback?.summery && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Interview Summary</h2>
                        <p className="text-gray-700 leading-relaxed">{feedback.summery}</p>
                    </div>
                )}

                {/* Recommendation */}
                {feedback?.RecommendationMsg && (
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommendation</h2>
                        <div className={`p-4 rounded-lg ${
                            feedback?.Recommendation === "Recommended" 
                                ? 'bg-green-50 border border-green-200' 
                                : 'bg-red-50 border border-red-200'
                        }`}>
                            <p className={`font-medium ${
                                feedback?.Recommendation === "Recommended" ? 'text-green-800' : 'text-red-800'
                            }`}>
                                {feedback.RecommendationMsg}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}