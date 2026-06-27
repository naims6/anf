import {
  LayoutDashboard,
  Users,
  FileText,
  type LucideIcon,
  Shield,
} from "lucide-react";

export interface NavItem {
  labelKey: string;
  icon: LucideIcon;
  href: string;
  items?: { labelKey: string; href: string }[];
}

export const navItems: NavItem[] = [
  {
    labelKey: "overview",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    labelKey: "hrManagement",
    icon: Users,
    href: "/dashboard/hr",
    items: [
      { labelKey: "employees", href: "/dashboard/hr/employees" },
      { labelKey: "userManagement", href: "/dashboard/hr/user-management" },
    ],
  },
  {
    labelKey: "articles",
    icon: FileText,
    href: "/dashboard/articles",
    items: [{ labelKey: "allArticles", href: "/dashboard/articles" }],
  },
  {
    labelKey: "rbac",
    icon: Shield,
    href: "/dashboard/rbac",
    items: [
      { labelKey: "roles", href: "/dashboard/rbac/roles" },
      { labelKey: "permissions", href: "/dashboard/rbac/permissions" },
      { labelKey: "users", href: "/dashboard/rbac/users" },
    ],
  },
];
