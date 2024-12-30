"use client";

import { ChevronRight, LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem,} from "@/components/Sidebar/sidebar";
import { Search } from "@/components/ui/Input/input";
import {NavItemProps} from "@/components/Nav-item/nav-item.props";
import Link from "next/link";
import { motion } from 'framer-motion';

export function NavMain({ items }: { items: NavItemProps[] }) {
  return (
    <SidebarGroup>
      <Search placeholder='Курсы по фотошопу...'/>
      <SidebarMenu>
        {items.map((item) => {
          const IconComponent = item.iconName ? Icons[item.iconName as keyof typeof Icons] as LucideIcon : null;
          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title} className='font-halvar font-bold'>
                      {IconComponent && <IconComponent />}
                      <span className='text-base'>{item.title}</span>
                      {item.items && item.items.length > 0 && (
                        <ChevronRight className="ml-auto transition-transform duration-150 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items && item.items.length > 0 && (
                    <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <motion.div
                                    initial={{opacity: 0, y: -60}}
                                    whileInView={{opacity: 1, y: 0}}
                                >
                                  <SidebarMenuSubButton asChild className="transition-all duration-150">
                                    <Link href={subItem.url}>
                                      <span className="text-sm">{subItem.title}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </motion.div>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

