"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { logoutAction } from "@/lib/actions/auth";
import { CurrentUser } from "@/lib/validations/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardHeader({ user }: { user: CurrentUser | null }) {
  const { locale, setLocale } = useLanguage();
  const t = useTranslations("Dashboard.header");

  const toggleLanguage = () => {
    const newLocale = locale === "en" ? "bn" : "en";
    setLocale(newLocale);
    const newPath = window.location.pathname.replace(
      /^\/(en|bn)/,
      `/${newLocale}`,
    );
    window.location.href = newPath;
  };

  const handleLogout = async () => {
    try {
      await logoutAction();
      toast.success(t("logoutSuccess"));
      window.location.href = `/${locale}`;
    } catch {
      toast.error(t("logoutFailed"));
    }
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b px-4 lg:px-6">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />

      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("search")} className="w-64 pl-8" />
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="min-w-[72px] gap-1.5"
        >
          <span
            className={
              locale === "bn" ? "font-semibold" : "text-muted-foreground"
            }
          >
            EN
          </span>
          <span className="text-xs text-muted-foreground">/</span>
          <span
            className={
              locale === "en" ? "font-semibold" : "text-muted-foreground"
            }
          >
            বাং
          </span>
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-xs text-primary">
                  {user?.name
                    ?.split(" ")
                    .map((n) => n[0])
                    .join("") || "AD"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>{t("profile")}</DropdownMenuItem>
            <DropdownMenuItem>{t("settings")}</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive"
              onClick={handleLogout}
            >
              {t("logout")}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
