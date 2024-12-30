import { NavMain } from "@/components/Nav-item/nav-main";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail,
} from "@/components/Sidebar/sidebar";
import Link from "next/link";
import { getNavigationData } from "@/lib/api";
import { ClientSidebarFooter } from "./client-sidebar-footer";

export async function AppSidebar() {
  const navItems = await getNavigationData();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex flex-row items-center gap-2">
          <img src="/logo-icon.svg" alt="logo" className="w-8 h-8" />
          <div className="font-halvar font-bold text-2xl transition-opacity duration-200">
            Coursfind
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <ClientSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}

