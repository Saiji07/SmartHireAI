import { Button } from "@/components/ui/button";
import moment from "moment";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

export default function CandidateList({detail})
{
    return(
        <div className=" ">
            <h2 className="font-bold my-5">Candidates {detail?.length}</h2>
            {detail.map((candidate,index)=>(
            
                <div key={index} className="p-5 flex gap-3 items-center justify-between bg-white rounded-lg">
                        <div className="flex items-center gap-5"> 
                <h2 className="bg-primary p-3 px-4.5 font-bold text-white rounded-full">{candidate.userName[0]}</h2>
            <div>
            
            <h2 className="font-bold">{candidate?.userName}</h2>
            <h2 className="text-sm text-gray-500">Completed On:{moment(candidate?.created_at).format('MMM DD YYYY')}</h2>
            </div>
</div>
<div className="flex gap-3 items-center">
<h2 className="text-green-600">
      {candidate?.feedback?.feedback?.rating ? `${Math.round((candidate?.feedback?.feedback.rating.technicalSkills + candidate?.feedback?.feedback.rating.communication + candidate?.feedback?.feedback.rating.problemSolving + candidate?.feedback?.feedback.rating.experience) / 4)}/10` : 'N/A'}
</h2>
          <CandidateFeedbackDialog candidate={candidate}/>
</div>

                </div>
            ))}
<div>

</div>
        </div>
    );
}