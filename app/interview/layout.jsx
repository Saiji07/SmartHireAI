import InterviewHeader from "./_components/InterviewHeader";

export default function InterviewLayout({children})
{
    return (
        <div className="bg-secondary">
            <InterviewHeader></InterviewHeader>
        {children}
        </div>
    );
}