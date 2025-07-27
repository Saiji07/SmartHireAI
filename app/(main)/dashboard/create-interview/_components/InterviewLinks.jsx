import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Copy, List, Mail,CheckCircle,MessageCircleHeart } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Plus } from "lucide-react";
export default function InterviewLinks({interview_id,formData})
{    const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview_id;
    const GetInterviewUrl=()=>{
    
    return url;
    }
    const onCopyLink=async()=>{
        await navigator.clipboard.writeText(url);
        toast('Link Copied');
    }
  return (
  <div className="flex flex-col items-center w-full px-4 sm:px-6 lg:px-10 py-10">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
    <h2 className="text-2xl font-semibold text-center text-gray-800">Your AI Interview is Ready!</h2>
    <p className="mt-2 text-gray-600 text-center">Share this link with your candidates to start the interview process.</p>

    <div className="w-full max-w-3xl mt-8 p-6 bg-white rounded-2xl shadow-md space-y-6">
      {/* Interview Link Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Interview Link</h3>
        <span className="text-sm text-blue-600 bg-blue-100 px-3 py-1 rounded-full">Valid for 30 Days</span>
      </div>

      {/* Link and Copy Button */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <Input defaultValue={GetInterviewUrl()} disabled className="flex-1" />
        <Button onClick={() => onCopyLink()} className="whitespace-nowrap">
          <Copy className="mr-2 h-4 w-4" /> Copy Link
        </Button>
      </div>

      <hr className="border-gray-200" />

      {/* Interview Meta Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-500" />
          {formData?.duration}
        </div>
        <div className="flex items-center gap-2">
          <List className="h-4 w-4 text-gray-500" />
          10 Questions {/* Assuming this was supposed to be questions */}
        </div>
        {/* Uncomment if needed
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          {formData?.date}
        </div>
        */}
      </div>
    </div>

    {/* Share Via Section */}
    <div className="w-full max-w-3xl mt-6 p-6 bg-white rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold text-gray-800">Share Via</h3>
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <Button variant="outline" className="flex-1">
          <Mail className="mr-2 h-4 w-4" /> Email
        </Button>
        <Button variant="outline" className="flex-1">
          <MessageCircleHeart className="mr-2 h-4 w-4" /> WhatsApp
        </Button>
        <Button variant="outline" className="flex-1">
          <Mail className="mr-2 h-4 w-4" /> LinkedIn
        </Button>
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="w-full max-w-3xl flex flex-col sm:flex-row justify-between gap-4 mt-8">
      <Link href="/dashboard" className="w-full sm:w-auto">
        <Button variant="outline" className="w-full sm:w-auto">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back To Dashboard
        </Button>
      </Link>
      <Link href="/dashboard/create-interview" className="w-full sm:w-auto">
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" /> Create New Interview
        </Button>
      </Link>
    </div>
  </div>
);

}