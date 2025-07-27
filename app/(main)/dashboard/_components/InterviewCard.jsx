import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, Send } from "lucide-react";
import Link  from "next/link"; // Add this import if missing
import moment from "moment"; // Add this import if missing
import { toast } from "sonner"; // Add this import if missing (or whatever toast library you're using)

export default function InterviewCard({ interview, viewDetails = false }) {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview?.interview_id;
    
    const copyLink = () => {
        navigator.clipboard.writeText(url);
        toast("Link Copied");
    }
    
    const onSend = () => {
        window.location.href = "mailto:desaisaiji7@gmail.com?subject=AiCruter Interview Link&body=Interview Link: " + url;
    }
    
    return (
        <div className="p-5 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
                <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
                <h2 className="text-sm">{moment(interview?.created_at).format('DD/MM/YYYY')}</h2>
            </div>
            <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>
            <h2 className="mt-2 flex justify-between">
                {interview?.duration} 
                <span className="text-green-700">
                    {interview['interview-feedback']?.length} Candidates
                </span>
            </h2>
            {!viewDetails ? (
                <div className="flex gap-3 w-full mt-5">
                    <Button variant='outline'  onClick={copyLink}>
                        <Copy /> Copy Link
                    </Button>
                    <Button  onClick={onSend}>
                        <Send /> Send
                    </Button>
                </div>
            ) : (
                <Link href={'/scheduled-interview/' + interview?.interview_id + '/details'}>
                    <Button className="mt-5 w-full" variant={'outline'}>
                        View Detail <ArrowRight />
                    </Button>
                </Link>
            )}
        </div>
    );
}