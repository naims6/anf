"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { navItems } from "./sidebar-items"

export function DashboardSidebar() {
  const pathname = usePathname()
  const t = useTranslations("Dashboard.sidebar")

  const getLabel = (item: (typeof navItems)[number]) => {
    const mapping: Record<string, string> = {
      "Overview": "overview",
      "HR Management": "hrManagement",
      "Articles": "articles",
    }
    return t((mapping[item.label] || item.label) as any)
  }

  const getSubLabel = (label: string) => {
    const key = label === "Employees" ? "employees"
      : label === "User Management" ? "userManagement"
      : label === "All Articles" ? "allArticles"
      : label
    return t(key as any)
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground">
            A
          </div>
          <span className="text-sm font-semibold">Dashboard</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                if (item.items && item.items.length > 0) {
                  return (
                    <Collapsible
                      key={item.label}
                      defaultOpen={pathname.startsWith(item.href)}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            isActive={pathname.startsWith(item.href)}
                          >
                            <item.icon />
                            <span>{getLabel(item)}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
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
                                  <Link href={sub.href}>{getSubLabel(sub.label)}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  )
                }

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{getLabel(item)}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">{t("backToSite")}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
