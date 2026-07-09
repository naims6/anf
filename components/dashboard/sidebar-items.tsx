import {
  LayoutDashboard,
  Users,
  FileText,
  type LucideIcon,
  Shield,
  Heart,
} from "lucide-react";

export interface NavItem {
  labelKey: string;
  icon: LucideIcon;
  href: string;
  group: "mainMenu" | "management" | "system";
  items?: { labelKey: string; href: string }[];
}

export const navItems: NavItem[] = [
  {
    labelKey: "overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    group: "mainMenu",
  },
  {
    labelKey: "hrManagement",
    icon: Users,
    href: "/dashboard/hr",
    group: "management",
    items: [
      { labelKey: "teams", href: "/dashboard/hr/teams" },
      { labelKey: "userManagement", href: "/dashboard/hr/user-management" },
    ],
  },
  {
    labelKey: "articles",
    icon: FileText,
    href: "/dashboard/articles",
    group: "management",
    items: [
      { labelKey: "allArticles", href: "/dashboard/articles" },
      { labelKey: "myArticles", href: "/dashboard/articles/my-articles" },
      {
        labelKey: "addArticle",
        href: "/dashboard/articles/create-article",
      },
      {
        labelKey: "createCategory",
        href: "/dashboard/articles/create-category",
      },
    ],
  },
  {
    labelKey: "donation",
    icon: Heart,
    href: "/dashboard/donation",
    group: "management",
    items: [{ labelKey: "fund", href: "/dashboard/donation/fund" }],
  },
  {
    labelKey: "rbac",
    icon: Shield,
    href: "/dashboard/rbac",
    group: "system",
    items: [{ labelKey: "roles", href: "/dashboard/rbac/roles" }],
  },
];
