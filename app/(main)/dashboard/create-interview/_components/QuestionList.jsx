
import { v4 as uuidv4 } from 'uuid';
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import QuestionListComponent from "./QuestionListComponent";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/context/UserDetailContext";

export default function QuestionList({ formData,onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const [saveLoading,setSaveLoading]=useState(false);
  const [questionList,setQuestionList]=useState()
  const hasFetched = useRef(false); 
const {user}=useUser();
  useEffect(() => {
    if (formData && !hasFetched.current&&!loading) {
      hasFetched.current = true; 
      console.log("generate start");
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
console.log('check');
      const Content=result.data.content;
      const final_content=Content.replace('```json','').replace('```','');
      console.log(final_content);
      setQuestionList(JSON.parse(final_content)?.interviewQuestions);
      console.log(result.data);
    } catch (e) {
      toast("Server Error. Sorry for the inconvenience.");
    } finally {
      setLoading(false);
      console.log("hello");
    }
  };
  const onFinish=  async()=>{
    setLoading(true);
    const interview_id=uuidv4();
    console.log('hello from on finish');
    console.log(formData);

    console.log(questionList);
        console.log(typeof questionList);
    console.log(user?.email);
    console.log(interview_id);
    console.log(typeof formData?.type);
const{data,error}=await supabase
.from('interviews')
.insert([
    { ...formData,
        questionList:questionList,
        userEmail:user?.email,
        interview_id:interview_id

     },

  ])
  .select()
setSaveLoading(false);

onCreateLink(interview_id)
  console.log('interviews');    
  }

return (
  <div>
    {loading && (
      <div className="p-5 bg-blue-50 border border-gray-100 rounded-xl flex gap-5 items-center">
        <Loader2Icon className="animate-spin" />
        <div>
          <h2 className="font-medium">Generating Interview Questions</h2>
          <p className="text-primary">
            Our AI is crafting personalized questions based on your details
          </p>
        </div>
      </div>
    )}

   <div>
    <QuestionListComponent questionList={questionList}></QuestionListComponent>
  <div className="flex justify-end mt-10 ">
        <Button onClick={()=>onFinish()} disabled={saveLoading}>
            {saveLoading &&<Loader2 className='animate-spin'></Loader2>}
            Create Interview Link & Finish</Button>
    </div>

   </div>
  
  </div>
);

}
