export default function QuestionListComponent({questionList})
{
return (
<div>
     {questionList?.length > 0 && (
        <div>
            <h2 className="font-bold text-lg mb-5">Generated Interview</h2>
      <div className="p-5 border border-gray-300 rounded-xl mt-4 bg-white">
        {questionList.map((item, index) => (
          <div key={index} className="p-3 border border-gray-500 mb-3 rounded">
            <h2 className="font-bold">{item.question}</h2>
            <h2 className="font-sm text-primary">Type: {item?.type}</h2>
          </div>
        ))}
      </div>
      </div>
    )}

</div>
);
}
