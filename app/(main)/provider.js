
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
export default function DashboardProvider({children})
{
    return(
           <SidebarProvider>
            
            <AppSidebar/>
            <div className="w-full p-10">
          {/* <SidebarTrigger/> */}
          <WelcomeContainer></WelcomeContainer>
            {children}
            
            </div>
            </SidebarProvider>
    );
}