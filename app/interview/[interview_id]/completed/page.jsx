// Assuming this is within your pages or app directory,
// e.g., src/app/interview/[interview_id]/completed/page.jsx or src/pages/interview/[interview_id]/completed.jsx
"use client"
import Link from 'next/link'; // For client-side navigation
import { CheckCircle, Home, FileText } from 'lucide-react'; // Icons from lucide-react
import { useParams } from 'next/navigation'; // To get the interview_id for the feedback link

export default function InterviewComplete() {
    // Get the interview_id from the URL parameters
    const params = useParams();
    const interviewId = params?.interview_id; // Make sure your route is e.g., /interview/[interview_id]/completed

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="bg-white shadow-lg rounded-xl p-8 sm:p-10 lg:p-12 text-center max-w-md w-full">
                {/* Success Icon */}
                <div className="mb-6 flex justify-center">
                    <CheckCircle className="h-20 w-20 text-green-500 animate-bounce-in" />
                    {/* You can add a subtle animation like 'animate-bounce' or a custom one if you define it in CSS */}
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
                    Interview Completed!
                </h1>

                {/* Message */}
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Great job! You've successfully completed your interview session.
                    Your feedback is being processed and will be available shortly.
                </p>

                {/* Call to Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    {/* View Feedback Button (Conditionally render if interviewId exists) */}
                    {interviewId && (
                        <Link href={`/interview/${interviewId}/feedback`} passHref>
                            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto">
                                <FileText className="h-5 w-5" />
                                View Feedback
                            </button>
                        </Link>
                    )}

                    {/* Go to Dashboard/Home Button */}
                    <Link href="/dashboard" passHref>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 w-full sm:w-auto">
                            <Home className="h-5 w-5" />
                            Go to Dashboard
                        </button>
                    </Link>
                    <Link href="/" passHref>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-gray-600 text-white hover:bg-gray-700 transition-colors duration-200 w-full sm:w-auto">
                            <Home className="h-5 w-5" />
                            Back to Home
                        </button>
                    </Link>
                </div>
            </div>
                {/* View Feedback Button */}
                {interviewId && (
                    <Link href={`/interview/${interviewId}/feedback`} passHref>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-lg font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 w-full sm:w-auto">
                            <FileText className="h-5 w-5" />
                            View My Feedback
                        </button>
                    </Link>
                )}

        </div>
    );
}