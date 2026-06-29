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
      { labelKey: "teams", href: "/dashboard/hr/teams" },
      { labelKey: "userManagement", href: "/dashboard/hr/user-management" },
    ],
  },
  {
    labelKey: "articles",
    icon: FileText,
    href: "/dashboard/articles",
    items: [
      { labelKey: "allArticles", href: "/dashboard/articles" },
      {
        labelKey: "addArticle",
        href: "/dashboard/articles/create",
      },
      {
        labelKey: "createCategory",
        href: "/dashboard/articles/create-category",
      },
    ],
  },
  {
    labelKey: "rbac",
    icon: Shield,
    href: "/dashboard/rbac",
    items: [{ labelKey: "roles", href: "/dashboard/rbac/roles" }],
  },
];
