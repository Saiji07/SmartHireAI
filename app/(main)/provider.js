
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/AppSidebar";
export default function DashboardProvider({children})
{
    return(
           <SidebarProvider>
            
            <AppSidebar/>
            <div className="w-full">
          <SidebarTrigger/>
            {children}
            
            </div>
            </SidebarProvider>
    );
}