'use client';

import { SidebarFooter, useSidebar } from "@/components/Sidebar/sidebar";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function ClientSidebarFooter() {
  const { isMobile } = useSidebar();

  return (
    <SidebarFooter>
      {isMobile && (
        <div className="flex items-center justify-between px-4 py-2">
          <p className="text-sm text-muted-foreground">Тема</p>
          <ThemeToggle />
        </div>
      )}
    </SidebarFooter>
  );
}

