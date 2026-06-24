"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { logoutAction } from "@/app/actions/auth";
import { CurrentUser } from "@/lib/validations/auth";

export default function UserMenu({ user }: { user: CurrentUser }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutAction();
      toast.success("Logged out successfully");
      router.refresh();
    } catch {
      toast.error("Failed to logout");
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-background hover:bg-muted transition-colors">
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium max-w-[120px] truncate">
            {user.name}
          </span>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/dashboard" className="cursor-pointer">
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          <LogOut className="h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
