import CreateOptions from "./_components/CreateOptions";
import LatestInterviewsList from "./_components/LatestInterviewsList";
import WelcomeContainer from "./_components/WelcomeContainer";

function Dashboard()
{
return(
    <div>
       
        
        {/* <WelcomeContainer></WelcomeContainer> */}
<h2 className="my-3 font-bold text-2xl">Dashboard</h2>
   
   <CreateOptions></CreateOptions>
   <LatestInterviewsList></LatestInterviewsList>
   </div>
);
}
export default Dashboard;