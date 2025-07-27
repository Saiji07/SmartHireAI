// CandidateFeedbackDialog.jsx - Option 1
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

export default function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Report</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          {/* FIX: Use asChild on DialogDescription and provide a suitable wrapper */}
          <DialogDescription asChild>
            {/* Now, this div becomes the root element for DialogDescription's content */}
            <div className="text-muted-foreground text-sm"> {/* Replicate DialogDescription's default styling if needed */}
              <div className="mt-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-5">
                    <h2 className="bg-primary p-3 px-5 font-bold text-white rounded-full">
                      {candidate.userName[0]}
                    </h2>
                    <div>
                      <h2 className="font-bold">{candidate?.userName}</h2>
                      <h2 className="text-sm text-gray-500">{candidate?.userEmail}</h2>
                    </div>
                  </div>
                  <div className="flex gap-3 items-center">
                    <h2 className="text-primary text-2xl font-bold">
                        {feedback?.rating ? `${Math.round((feedback.rating.technicalSkills + feedback.rating.communication + feedback.rating.problemSolving + feedback.rating.experience) / 4)}/10` : 'N/A'}
                    </h2>
                  </div>
                </div>

                <div>
                  <h2 className="font-bold mt-4">Skills Assessment</h2>
                  <div className="mt-3 grid grid-cols-2 gap-10">
                    <div>
                      <h2 className="flex justify-between">
                        Technical Skills <span>{feedback?.rating?.technicalSkills}/10</span>
                      </h2>
                      <Progress value={feedback?.rating?.technicalSkills * 10} className="mt-1" />
                    </div>
                    <div>
                      <h2 className="flex justify-between">
                        Communication Skills <span>{feedback?.rating?.communication}/10</span>
                      </h2>
                      <Progress value={feedback?.rating?.communication * 10} className="mt-1" />
                    </div>
                    <div>
                      <h2 className="flex justify-between">
                        Problem Solving <span>{feedback?.rating?.problemSolving}/10</span>
                      </h2>
                      <Progress value={feedback?.rating?.problemSolving * 10} className="mt-1" />
                    </div>
                    <div>
                      <h2 className="flex justify-between">
                        Experience <span>{feedback?.rating?.experience}/10</span>
                      </h2>
                      <Progress value={feedback?.rating?.experience * 10} className="mt-1" />
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                    <h2 className="font-bold">Summary</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{feedback?.summery}</p>
                </div>

                <div className="mt-5">
                    <h2 className="font-bold">Recommendation</h2>
                    <p className={`text-sm leading-relaxed ${feedback?.Recommendation === "Recommended" ? 'text-green-600' : 'text-red-600'}`}>
                        {feedback?.RecommendationMsg}
                    </p>
                </div>

              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}