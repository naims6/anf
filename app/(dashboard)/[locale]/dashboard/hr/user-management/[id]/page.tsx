"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  Mail,
  Shield,
  Users,
  Key,
  Pencil,
  Trash2,
  Loader2,
  ToggleLeft,
  Phone,
  UserCheck,
  UserX,
  User
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  getUserDetails,
  getAllRolesForUser,
  getAllTeamsForUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "@/services/userService";
import type { UserDetails, Role, TeamOption } from "@/lib/validations/users";
import { updateUserSchema, type UpdateUserFormData } from "@/lib/validations/users";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function UserProfilePage() {
  const t = useTranslations("Dashboard.userManagement");
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roles, setRoles] = useState<Role[]>([]);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const referenceFetched = useRef(false);

  const editForm = useForm<UpdateUserFormData>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: { name: "", email: "", roleId: 0, teamId: undefined },
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    control: controlEdit,
    formState: { errors: editErrors },
  } = editForm;

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getUserDetails(id);
      if (res.data) {
        setUser(res.data);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const ensureReferenceData = useCallback(async () => {
    if (referenceFetched.current) return;
    const [rolesRes, teamsRes] = await Promise.all([
      getAllRolesForUser(),
      getAllTeamsForUser(),
    ]);
    if (rolesRes.data) setRoles(rolesRes.data);
    if (teamsRes.data) setTeams(teamsRes.data);
    referenceFetched.current = true;
  }, []);

  const openEditSheet = () => {
    if (!user) return;
    ensureReferenceData();
    resetEdit({
      name: user.name,
      email: user.email,
      roleId: user.roleId,
      teamId: user.teams[0]?.id ?? undefined,
    });
    setEditSheetOpen(true);
  };

  const onEditSubmit = async (data: UpdateUserFormData) => {
    if (!user) return;
    setSubmitting(true);
    const res = await updateUser(user.id, {
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      teamId: data.teamId,
    });
    if (res.data) {
      toast.success(t("updateSuccess"));
      setEditSheetOpen(false);
      const refreshed = await getUserDetails(id);
      if (refreshed.data) setUser(refreshed.data);
    } else {
      toast.error(res.error || "Failed to update user");
    }
    setSubmitting(false);
  };

  const onDeleteConfirm = async () => {
    if (!user) return;
    const res = await deleteUser(user.id);
    if (res.success) {
      toast.success(t("deleteSuccess"));
      setDeleteDialogOpen(false);
      router.push("/dashboard/hr/user-management");
    } else {
      toast.error(res.error || "Failed to delete user");
    }
  };

  const onToggleStatus = async () => {
    if (!user) return;
    const res = await toggleUserStatus(user.id);
    if (res.data) {
      toast.success(t("statusToggled"));
      const refreshed = await getUserDetails(id);
      if (refreshed.data) setUser(refreshed.data);
    } else {
      toast.error(res.error || "Failed to toggle status");
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-36 rounded-xl" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl md:col-span-2" />
        </div>
        <Skeleton className="h-48 rounded-2xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center bg-card rounded-2xl border border-border">
        <UserX className="h-12 w-12 text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground font-medium">User not found</p>
        <Button variant="outline" className="mt-4 rounded-xl" onClick={() => router.back()}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Bar with refined navigation and actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => router.back()}
          className="h-10 rounded-xl px-4 border-border/80 hover:bg-muted/50 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 text-muted-foreground" />
          Back
        </Button>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onToggleStatus}
            className="h-10 rounded-xl px-4 border-border/80 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <ToggleLeft className="mr-2 h-4.5 w-4.5" />
            {t("toggleStatus")}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={openEditSheet}
            className="h-10 rounded-xl px-4 border-border/80 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <Pencil className="mr-2 h-4 w-4" />
            {t("editUser")}
          </Button>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={() => setDeleteDialogOpen(true)}
            className="h-10 rounded-xl px-4 shadow-sm hover:shadow-md hover:bg-destructive/95 transition-all"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t("deleteUser")}
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Side: Avatar/Profile Card */}
        <Card className="md:col-span-1 border border-border/80 shadow-xs hover:shadow-md transition-all duration-300 overflow-hidden">
          <div className="h-2 w-full bg-primary/25" />
          <CardContent className="flex flex-col items-center py-10 px-6">
            <Avatar className="mb-4 h-24 w-24 border-4 border-card shadow-md">
              <AvatarFallback className="bg-primary/10 text-3xl font-extrabold text-primary">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-center tracking-tight text-foreground/90">{user.name}</h2>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground font-medium mt-1">
              <Mail className="h-3.5 w-3.5 text-muted-foreground/60" />
              {user.email}
            </p>
            
            <div className="mt-5">
              {user.status === "active" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-950/30 px-3.5 py-1 text-xs font-semibold text-green-700 dark:text-green-400 border border-green-200/50">
                  <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
                  {t("active")}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 dark:bg-slate-900/30 px-3.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200/40">
                  <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-slate-500" />
                  {t("inactive")}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Account metadata details */}
        <div className="space-y-6 md:col-span-2">
          <Card className="border border-border/80 shadow-xs hover:shadow-md transition-all duration-300">
            <CardHeader className="border-b px-6 py-4 bg-muted/20">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Shield className="h-4 w-4 text-primary" />
                Role & Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Role</p>
                <div className="mt-2">
                  <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50">
                    <Shield className="h-3 w-3" />
                    {user.role.name}
                  </span>
                </div>
              </div>
              
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Teams</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {user.teams.length > 0 ? (
                    user.teams.map((team) => (
                      <span
                        key={team.id}
                        className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary border border-primary/20"
                      >
                        <Users className="h-3 w-3" />
                        {team.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground italic">No teams assigned</span>
                  )}
                </div>
              </div>
              
              <div className="border-t border-border/40 pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Phone</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  {user.phone ?? <span className="text-xs text-muted-foreground/60 italic font-normal">—</span>}
                </p>
              </div>
              
              <div className="border-t border-border/40 pt-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Member since</p>
                <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-foreground/80">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Permissions detail card */}
          <Card className="border border-border/80 shadow-xs hover:shadow-md transition-all duration-300">
            <CardHeader className="border-b px-6 py-4 bg-muted/20">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Key className="h-4 w-4 text-primary" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {user.permissions.length > 0 ? (
                <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {user.permissions.map((perm) => (
                    <div
                      key={perm.id}
                      className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/30 px-3 py-2 text-xs font-medium text-foreground/80 hover:border-primary/30 transition-all"
                    >
                      <Key className="h-3 w-3 text-primary/70 shrink-0" />
                      <span className="truncate">{perm.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-medium text-muted-foreground italic">No permissions assigned</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Restyled Sheet: Edit User Profile */}
      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md p-0 rounded-l-2xl border-l border-border/80">
          <SheetHeader className="border-b px-6 py-5 bg-muted/10">
            <SheetTitle className="text-lg font-bold">{t("editUser")}</SheetTitle>
            <SheetDescription className="text-xs">{t("editUserDesc")}</SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmitEdit(onEditSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-sm font-semibold">{t("nameLabel")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <Input
                    id="edit-name"
                    placeholder={t("namePlaceholder")}
                    className="pl-9 h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
                    {...registerEdit("name")}
                  />
                </div>
                {editErrors.name && (
                  <p className="text-xs font-medium text-destructive">
                    {editErrors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-sm font-semibold">{t("emailLabel")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <Input
                    id="edit-email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="pl-9 h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
                    {...registerEdit("email")}
                  />
                </div>
                {editErrors.email && (
                  <p className="text-xs font-medium text-destructive">
                    {editErrors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-roleId" className="text-sm font-semibold">{t("roleLabel")}</Label>
                <Controller
                  name="roleId"
                  control={controlEdit}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : undefined}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full h-10 border-border/80 focus:ring-primary/20 rounded-xl">
                        <SelectValue placeholder={t("rolePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={String(role.id)} className="rounded-lg">
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {editErrors.roleId && (
                  <p className="text-xs font-medium text-destructive">
                    {editErrors.roleId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t("teamLabel")}</Label>
                <Controller
                  name="teamId"
                  control={controlEdit}
                  render={({ field }) => (
                    <Select
                      value={field.value != null ? String(field.value) : "none"}
                      onValueChange={(val) =>
                        field.onChange(val === "none" ? undefined : Number(val))
                      }
                    >
                      <SelectTrigger className="w-full h-10 border-border/80 focus:ring-primary/20 rounded-xl">
                        <SelectValue placeholder={t("teamPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="none" className="rounded-lg">{t("teamPlaceholder")}</SelectItem>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={String(team.id)} className="rounded-lg">
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <SheetFooter className="shrink-0 border-t px-6 py-4 bg-muted/10">
              <SheetClose asChild>
                <Button variant="outline" type="button" className="rounded-xl" disabled={submitting}>
                  {t("cancel")}
                </Button>
              </SheetClose>
              <Button type="submit" className="rounded-xl px-5" disabled={submitting}>
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {t("save")}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      <DeleteAlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t("deleteUserTitle")}
        description={t("deleteUserConfirm")}
        confirmLabel={t("deleteUser")}
        cancelLabel={t("cancel")}
        onConfirm={onDeleteConfirm}
      />
    </div>
  );
}
