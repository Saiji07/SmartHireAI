"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Plus, LogOut } from "lucide-react" // Import a logout icon
import { SidebarOptions } from "@/services/Constants"
import { createBrowserClient } from "@supabase/ssr" // Import Supabase client

export function AppSidebar() {
    const path = usePathname();
    const router = useRouter(); // Initialize the router

    // Create a Supabase client instance
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // --- LOGOUT FUNCTION ---
    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth'); // Redirect to login page
    };

    return (
        <Sidebar>
            <SidebarHeader className='flex items-center mt-5'>
                <Image alt='logo 'src={'/logo1.png'} width={200} height={100} className="w-[150px] "/>
                <Button className='w-full mt-5'><Plus></Plus>Create New Interview</Button>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {SidebarOptions.map((option, index) => (
                            <SidebarMenuItem key={index} className='p-1'>
                                <SidebarMenuButton asChild className={`p-5 ${path == option.path && 'bg-blue-100'}`}>
                                    <Link href={option.path}>
                                        <option.icon className={` ${path == option.path && 'text-primary'}`}></option.icon>
                                        <span className={`text-[16px] ${path == option.path && 'text-primary'}`}>{option.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            {/* --- ADDED LOGOUT BUTTON HERE --- */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem className='p-1'>
                        <SidebarMenuButton onClick={handleLogout} className="p-5 w-full">
                            <LogOut />
                            <span className="text-[16px]">Log Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
