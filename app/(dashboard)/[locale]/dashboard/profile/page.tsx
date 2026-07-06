"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Calendar,
  Mail,
  Shield,
  Key,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  Phone,
  BadgeCheck,
  Users,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { getMyProfile } from "@/services/userService";
import { changePasswordAction } from "@/services/authService";
import {
  changePasswordSchema,
  type ChangePasswordPayload,
} from "@/lib/validations/auth";
import type { UserDetails } from "@/lib/validations/users";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function MyProfilePage() {
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordPayload>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getMyProfile();
      if (res.data) {
        setUser(res.data);
      } else {
        console.error("Failed to load profile:", res.error);
        toast.error(res.error || "Could not load profile");
      }
      setLoading(false);
    }
    load();
  }, []);

  const onChangePassword = async (data: ChangePasswordPayload) => {
    const res = await changePasswordAction(data);
    if (res.success) {
      toast.success(res.message || "Password changed successfully");
      reset();
    } else {
      toast.error(res.error || "Failed to change password");
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-36 rounded-xl" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64 rounded-xl" />
          <Skeleton className="h-64 rounded-xl" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Shield className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold">Profile unavailable</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Could not load profile data. Please try again later.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ─── Page Header ────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account details and security
          </p>
        </div>
      </div>

      {/* ─── Profile Banner ─────────────────────────────────────────────── */}
      <Card className="relative overflow-hidden border-none bg-gradient-to-r from-primary/10 via-primary/5 to-background shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
        <CardContent className="relative flex flex-col items-center gap-4 p-6 sm:flex-row sm:gap-6">
          <Avatar className="h-20 w-20 border-2 border-background shadow-md sm:h-24 sm:w-24">
            <AvatarFallback className="bg-primary/10 text-2xl text-primary">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <h2 className="text-xl font-semibold sm:text-2xl">
                {user.name}
              </h2>
              <span
                className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  user.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <BadgeCheck className="h-3 w-3" />
                {user.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="mt-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                {user.email}
              </p>
              {user.phone && (
                <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Phone className="h-3.5 w-3.5" />
                  {user.phone}
                </p>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                <ShieldCheck className="h-3 w-3" />
                {user.role.name}
              </span>
              {user.teams.map((team) => (
                <span
                  key={team.id}
                  className="inline-flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                  <Users className="h-3 w-3" />
                  {team.name}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ─── Main Content Grid ──────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* ── Account Details ──────────────────────────────────────────── */}
        <Card className="shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Shield className="h-4 w-4 text-muted-foreground" />
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Role
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10">
                    <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{user.role.name}</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Teams
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {user.teams.length > 0 ? (
                    user.teams.map((team) => (
                      <span
                        key={team.id}
                        className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                      >
                        <Users className="h-3 w-3" />
                        {team.name}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">—</p>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Email
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Phone
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  {user.phone ?? "—"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Member Since
                </p>
                <p className="mt-1.5 flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Permissions ──────────────────────────────────────────────── */}
        <Card className="shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="flex items-center gap-2 text-base">
              <Key className="h-4 w-4 text-muted-foreground" />
              Permissions
              {user.permissions.length > 0 && (
                <span className="ml-auto inline-flex items-center justify-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {user.permissions.length}
                </span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {user.permissions.length > 0 ? (
              <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                {user.permissions.map((perm) => (
                  <div
                    key={perm.id}
                    className="flex items-center gap-2 rounded-lg border bg-muted/30 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/50"
                  >
                    <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                    <span className="capitalize">
                      {perm.name.replace(/_/g, " ")}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Key className="h-5 w-5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No permissions assigned
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ─── Change Password ────────────────────────────────────────────── */}
      <Card className="shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Lock className="h-4 w-4 text-muted-foreground" />
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form
            onSubmit={handleSubmit(onChangePassword)}
            className="max-w-lg space-y-5"
            noValidate
          >
            <div className="space-y-2">
              <Label htmlFor="old-password">Current Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="old-password"
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Enter your current password"
                  className="h-10 pl-10 pr-10"
                  {...register("oldPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showOldPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <p className="text-xs text-destructive">
                  {errors.oldPassword.message}
                </p>
              )}
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New password"
                    className="h-10 pl-10 pr-10"
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.newPassword && (
                  <p className="text-xs text-destructive">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    className="h-10 pl-10 pr-10"
                    {...register("confirmNewPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmNewPassword && (
                  <p className="text-xs text-destructive">
                    {errors.confirmNewPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
              <InfoIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Password must be at least 6 characters long
              </p>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting} className="px-6">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}
