import {
  LayoutDashboard,
  Users,
  FileText,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
  items?: { label: string; href: string }[];
}

export const navItems: NavItem[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "HR Management",
    icon: Users,
    href: "/dashboard/hr",
    items: [
      { label: "Employees", href: "/dashboard/hr/employees" },
      { label: "User Management", href: "/dashboard/hr/user-management" },
    ],
  },
  {
    label: "Articles",
    icon: FileText,
    href: "/dashboard/articles",
    items: [
      { label: "All Articles", href: "/dashboard/articles" },
    ],
  },
];
