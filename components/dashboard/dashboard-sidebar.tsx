"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ExternalLink, Search, LayoutDashboard } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { navItems } from "./sidebar-items";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface DashboardSidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
  } | null;
}

export function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();
  const t = useTranslations("Dashboard.sidebar");

  const tLabel = (key: string) => t(key);

  const groups = navItems.reduce<Record<string, typeof navItems>>(
    (acc, item) => {
      const group = item.group;
      if (!acc[group]) acc[group] = [];
      acc[group].push(item);
      return acc;
    },
    {},
  );

  const groupLabels: Record<string, string> = {
    mainMenu: t("mainMenu"),
    management: t("management"),
    system: t("system"),
  };

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border pb-3">
        <Link href="/dashboard" className="flex items-center gap-3 px-2 py-1">
          <div className="flex items-center justify-center rounded-lg bg-primary/10 p-1.5">
            <Image src="/logo.png" alt="logo" width={28} height={28} className="object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-extrabold tracking-tight text-sidebar-foreground">
              An Nusra
            </span>
            <span className="text-[10px] font-medium text-sidebar-foreground/60 tracking-wide">
              Foundation
            </span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <div className="px-3 py-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput
              placeholder="Search..."
              className="h-8 pl-7 text-xs"
            />
          </div>
        </div>

        {Object.entries(groups).map(([groupKey, items]) => (
          <SidebarGroup key={groupKey}>
            <SidebarGroupLabel className="px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              {groupLabels[groupKey] || groupKey}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  if (item.items && item.items.length > 0) {
                    const isActive = pathname.startsWith(item.href);
                    return (
                      <Collapsible
                        key={item.labelKey}
                        defaultOpen={isActive}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton
                              isActive={isActive}
                              className={cn(
                                "relative",
                                isActive &&
                                  "before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:rounded-full before:bg-sidebar-primary",
                              )}
                            >
                              <item.icon className="text-sidebar-foreground/70" />
                              <span>{tLabel(item.labelKey)}</span>
                              <ChevronRight className="ml-auto h-3.5 w-3.5 text-sidebar-foreground/40 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.items.map((sub) => (
                                <SidebarMenuSubItem key={sub.href}>
                                  <SidebarMenuSubButton
                                    asChild
                                    isActive={pathname === sub.href}
                                  >
                                    <Link href={sub.href}>
                                      {tLabel(sub.labelKey)}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    );
                  }

                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.labelKey}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          "relative",
                          isActive &&
                            "before:absolute before:left-0 before:top-1 before:bottom-1 before:w-0.5 before:rounded-full before:bg-sidebar-primary",
                        )}
                      >
                        <Link href={item.href}>
                          <item.icon className="text-sidebar-foreground/70" />
                          <span>{tLabel(item.labelKey)}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border pt-3">
        {user ? (
          <div className="flex items-center gap-3 px-2 py-1.5">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-xs text-primary">
                {user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) ||
                  user.email?.charAt(0).toUpperCase() ||
                  "U"}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 gap-0.5 overflow-hidden">
              <span className="truncate text-xs font-medium text-sidebar-foreground">
                {user.name || "User"}
              </span>
              <span className="truncate text-[10px] text-sidebar-foreground/50">
                {user.email}
              </span>
            </div>
          </div>
        ) : null}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                href="/"
                className="text-sidebar-foreground/70 hover:text-sidebar-foreground"
              >
                <ExternalLink className="h-4 w-4" />
                <span>{t("backToSite")}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
