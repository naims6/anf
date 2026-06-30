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
        <Skeleton className="h-8 w-32" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl md:col-span-2" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground">User not found</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onToggleStatus}>
            <ToggleLeft className="mr-2 h-4 w-4" />
            {t("toggleStatus")}
          </Button>
          <Button variant="outline" size="sm" onClick={openEditSheet}>
            <Pencil className="mr-2 h-4 w-4" />
            {t("editUser")}
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t("deleteUser")}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center py-8">
            <Avatar className="mb-4 h-20 w-20">
              <AvatarFallback className="bg-primary/10 text-2xl text-primary">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5" />
              {user.email}
            </p>
            <span
              className={`mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                user.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {user.status === "active" ? t("active") : t("inactive")}
            </span>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader className="border-b px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-muted-foreground" />
                Role & Teams
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Role</p>
                <p className="mt-1 text-sm font-medium">{user.role.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Teams</p>
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {user.teams.length > 0 ? (
                    user.teams.map((team) => (
                      <span
                        key={team.id}
                        className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {team.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-muted-foreground">No teams</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Phone</p>
                <p className="mt-1 text-sm font-medium">{user.phone ?? "—"}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Member since</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <Key className="h-4 w-4 text-muted-foreground" />
                Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {user.permissions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.permissions.map((perm) => (
                    <span
                      key={perm.id}
                      className="inline-flex items-center rounded-md border bg-muted/50 px-3 py-1.5 text-xs font-medium text-muted-foreground"
                    >
                      {perm.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No permissions assigned</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="text-lg">{t("editUser")}</SheetTitle>
            <SheetDescription>{t("editUserDesc")}</SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmitEdit(onEditSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
              <div className="space-y-2">
                <Label htmlFor="edit-name">{t("nameLabel")}</Label>
                <Input
                  id="edit-name"
                  placeholder={t("namePlaceholder")}
                  {...registerEdit("name")}
                />
                {editErrors.name && (
                  <p className="text-xs text-destructive">
                    {editErrors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email">{t("emailLabel")}</Label>
                <Input
                  id="edit-email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...registerEdit("email")}
                />
                {editErrors.email && (
                  <p className="text-xs text-destructive">
                    {editErrors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-roleId">{t("roleLabel")}</Label>
                <Controller
                  name="roleId"
                  control={controlEdit}
                  render={({ field }) => (
                    <Select
                      value={field.value ? String(field.value) : undefined}
                      onValueChange={(val) => field.onChange(Number(val))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("rolePlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={String(role.id)}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {editErrors.roleId && (
                  <p className="text-xs text-destructive">
                    {editErrors.roleId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t("teamLabel")}</Label>
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
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t("teamPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">{t("teamPlaceholder")}</SelectItem>
                        {teams.map((team) => (
                          <SelectItem key={team.id} value={String(team.id)}>
                            {team.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>

            <SheetFooter className="shrink-0 border-t px-6 py-4">
              <SheetClose asChild>
                <Button variant="outline" type="button" disabled={submitting}>
                  {t("cancel")}
                </Button>
              </SheetClose>
              <Button type="submit" disabled={submitting}>
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
