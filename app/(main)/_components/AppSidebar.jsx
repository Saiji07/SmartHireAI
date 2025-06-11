"use client"
import Image from "next/image"
import Link from "next/link"
// import { usePathname } from "next/navigation"
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
import { Plus } from "lucide-react"
import { SidebarOptions } from "@/services/Constants"
import { usePathname } from "next/navigation"

export function AppSidebar() {
   
    const path=usePathname(); // it stores current path from url 

      return (
    <Sidebar>
<SidebarHeader className='flex items-center mt-5'>
    <Image alt='logo 'src={'/logo1.png'} width={200} height={100} className="w-[150px] "/>
    <Button className='w-full mt-5'><Plus></Plus>Create New Interview</Button>
</SidebarHeader>
      <SidebarContent>
        <SidebarGroup >
<SidebarMenu>
    {SidebarOptions.map((option,index)=>(
<SidebarMenuItem key={index} className='p-1'> 
<SidebarMenuButton asChild className={`p-5 ${path==option.path && 'bg-blue-100'}`}> 
    <Link href={option.path}>
    <option.icon className={` ${path==option.path && 'text-primary'}`}></option.icon>
<span className={`text-[16px] ${path==option.path && 'text-primary'}`}>{option.name}</span>
    </Link>

</SidebarMenuButton>
</SidebarMenuItem>

    ))}
</SidebarMenu>
        </SidebarGroup >
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}