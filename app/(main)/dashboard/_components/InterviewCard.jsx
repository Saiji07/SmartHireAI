import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export default function InterviewCard({interview,key})
{
 const url=process.env.NEXT_PUBLIC_HOST_URL+'/'+interview?.interview_id;
       const copyLink=()=>{
       
navigator.clipboard.writeText(url);
toast("Link Copied");
    }
    const onSend=()=>{
window.location.href="mailto:desaisaiji7@gmail.com?subject=AiCruter Interview Link & body=Interview Link: "+url;
    }
    return(
<div className="p-5 bg-white rounded-lg  border">
    <div className="flex items-center justify-between ">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
    
    <h2 className="text-sm">{moment(interview?.created_at).format('DD MM YYYY')}</h2>
   
    </div>
    <h2 className="mt-3 font-bold text-lg">{interview?.jobPosition}</h2>

<h2 className="mt-2">{interview?.duration}</h2>
<div className="flex gap-3 w-full mt-5">
    <Button variant='outline' className={'w-full '} onClick={copyLink}> <Copy/> Copy Link</Button>
    <Button className={'w-full '} onClick={onSend} > <Send/> Send</Button>
</div>
</div>
    );
}