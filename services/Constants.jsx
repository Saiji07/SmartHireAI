import { BriefcaseBusinessIcon, Calendar, Code2Icon, Crown, Goal, icons, LayoutDashboard, List, Puzzle, Settings, User2Icon, WalletCards } from "lucide-react";

export const SidebarOptions=[
    {
        name:'Dashboard',
        icon:LayoutDashboard,
        path:'/dashboard'
    },
     {
        name:'All Interview',
        icon:List,
        path:'/all-interview'
    },
     {
        name:'Scheduled-Interview',
        icon:Calendar,
        path:'scheduled-interview'
    },
     {
        name:'Billing',
        icon:WalletCards,
        path:'Billing'
    },
    {
        name:'Settings',
        icon:Settings,
        path:'/settings'
    }

]
export const InterviewType=[
    {
        title:'Technical',
        icon:Code2Icon
    },
     {
        title:'Behavioral',
        icon:User2Icon
    },
     {
        title:'Experience',
        icon:BriefcaseBusinessIcon
    },
     {
        title:'Problem Solving',
        icon:Puzzle
    },
     {
        title:'Leadership',
        icon:Goal
    }
     
]

export const  QUESTION_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

📌 Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.
❌ Format your response in JSON format with array list of questions.
format: interviewQuestions=[
{
  question: "",
  type: {{type}}
},{
  ...
}]
🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a {{jobTitle}} role.`
