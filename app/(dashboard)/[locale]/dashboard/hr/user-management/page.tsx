"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Plus,
  Loader2,
  Users,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  ToggleLeft,
  UserCheck,
  UserX,
  Shield,
  Mail,
  User,
  ShieldAlert
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard/stat-card";
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

import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import {
  createUserSchema,
  updateUserSchema,
  type CreateUserFormData,
  type UpdateUserFormData,
  type User as UserType,
  type Role,
  type TeamOption,
  type PaginationMeta,
} from "@/lib/validations/users";
import {
  getAllUsers,
  getAllRolesForUser,
  getAllTeamsForUser,
  createUser,
  updateUser,
  deleteUser,
  toggleUserStatus,
} from "@/services/userService";

import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";

import { SearchInput } from "@/components/shared/SearchInput";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { PageFallback } from "@/components/shared/PageFallback";

function UserManagementContent() {
  const t = useTranslations("Dashboard.userManagement");
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const limit = 10;

  const [searchInput, setSearchInput, updateParams] = useDebouncedSearch("searchTerm");

  const [users, setUsers] = useState<UserType[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);
  const [editSheetOpen, setEditSheetOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);
  const referenceFetched = useRef(false);

  const form = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { name: "", email: "", password: "", roleId: 0, teamId: undefined },
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = form;

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

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    const res = await getAllUsers({ page, limit, searchTerm });
    if (res.data) {
      setUsers(res.data);
      if (res.pagination) setPagination(res.pagination);
    } else {
      toast.error(res.error || "Failed to load users");
    }
    setLoading(false);
  }, [page, limit, searchTerm]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const ensureReferenceData = useCallback(async () => {
    if (referenceFetched.current) return;
    const [rolesRes, teamsRes] = await Promise.all([
      getAllRolesForUser(),
      getAllTeamsForUser(),
    ]);
    if (rolesRes.data) setRoles(rolesRes.data);
    else toast.error(rolesRes.error || "Failed to load roles");
    if (teamsRes.data) setTeams(teamsRes.data);
    else toast.error(teamsRes.error || "Failed to load teams");
    referenceFetched.current = true;
  }, []);

  const openAddSheet = () => {
    ensureReferenceData();
    reset({ name: "", email: "", password: "", roleId: 0, teamId: undefined });
    setSheetOpen(true);
  };

  const onSubmit = async (data: CreateUserFormData) => {
    setSubmitting(true);
    const res = await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
      teamId: data.teamId,
      roleId: data.roleId,
    });
    if (res.data) {
      toast.success("User created successfully");
      setSheetOpen(false);
      fetchUsers();
    } else {
      toast.error(res.error || "Failed to create user");
    }
    setSubmitting(false);
  };

  const openEditSheet = (user: UserType) => {
    ensureReferenceData();
    setEditingUser(user);
    resetEdit({
      name: user.name,
      email: user.email,
      roleId: user.role.id,
      teamId: user.team?.id ?? undefined,
    });
    setEditSheetOpen(true);
  };

  const onEditSubmit = async (data: UpdateUserFormData) => {
    if (!editingUser) return;
    setSubmitting(true);
    const res = await updateUser(editingUser.id, {
      name: data.name,
      email: data.email,
      roleId: data.roleId,
      teamId: data.teamId,
    });
    if (res.data) {
      toast.success(t("updateSuccess"));
      setEditSheetOpen(false);
      setEditingUser(null);
      fetchUsers();
    } else {
      toast.error(res.error || "Failed to update user");
    }
    setSubmitting(false);
  };

  const openDeleteDialog = (userId: string) => {
    setDeletingUserId(userId);
    setDeleteDialogOpen(true);
  };

  const onDeleteConfirm = async () => {
    if (!deletingUserId) return;
    const res = await deleteUser(deletingUserId);
    if (res.success) {
      toast.success(t("deleteSuccess"));
      setDeleteDialogOpen(false);
      setDeletingUserId(null);
      fetchUsers();
    } else {
      toast.error(res.error || "Failed to delete user");
    }
  };

  const onToggleStatus = async (userId: string) => {
    const res = await toggleUserStatus(userId);
    if (res.data) {
      toast.success(t("statusToggled"));
      fetchUsers();
    } else {
      toast.error(res.error || "Failed to toggle status");
    }
  };

  const goToPage = (p: number) => {
    updateParams({ page: String(p) });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Dynamically generated stat card statistics
  const totalUsersCount = pagination?.total ?? users.length;
  const activeUsersCount = users.filter((u) => u.status === "active").length;
  const inactiveUsersCount = users.filter((u) => u.status !== "active").length;
  const adminUsersCount = users.filter((u) => u.role.name.toLowerCase().includes("admin") || u.role.name.toLowerCase().includes("super")).length;

  return (
    <div className="space-y-8">
      {/* Header with optimized title layout and action button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground/90">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button 
          onClick={openAddSheet}
          className="shadow-sm hover:shadow-md hover:bg-primary/95 transition-all duration-300 rounded-xl"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t("addUser")}
        </Button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("allUsers")}
          value={totalUsersCount}
          icon={<Users className="h-5 w-5" />}
          description="Total registered accounts"
        />
        <StatCard
          title="Active Accounts"
          value={activeUsersCount}
          icon={<UserCheck className="h-5 w-5" />}
          description="Users currently active on the platform"
        />
        <StatCard
          title="Inactive Accounts"
          value={inactiveUsersCount}
          icon={<UserX className="h-5 w-5" />}
          description="Accounts currently suspended or pending"
        />
        <StatCard
          title="Administrators"
          value={adminUsersCount}
          icon={<ShieldAlert className="h-5 w-5" />}
          description="Users with high level administrative access"
        />
      </div>

      {/* Modern Filter / Search container */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-xl border border-border/60">
        <div className="flex-1 max-w-sm">
          <SearchInput
            placeholder={t("searchUsers")}
            value={searchInput}
            onChange={setSearchInput}
          />
        </div>
      </div>

      {/* Refactored Table Card with stunning look and feel */}
      <Card className="overflow-hidden border border-border/80 shadow-xs hover:shadow-md transition-all duration-300">
        <CardHeader className="border-b px-6 py-4 bg-muted/20">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>{t("allUsers")}</span>
            {!loading && (
              <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                {totalUsersCount} {totalUsersCount === 1 ? "User" : "Users"}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
          ) : users.length === 0 ? (
            <EmptyState
              icon={<Users className="h-12 w-12 text-muted-foreground/40" />}
              message={t("noUsers")}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4">{t("name")}</th>
                    <th className="px-6 py-4">{t("role")}</th>
                    <th className="px-6 py-4">{t("status")}</th>
                    <th className="px-6 py-4 text-right">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="group transition-all duration-200 hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/hr/user-management/${user.id}`}
                          className="flex items-center gap-3 hover:opacity-90 transition-all duration-200"
                        >
                          <Avatar className="h-9 w-9 border border-border shadow-xs group-hover:scale-105 transition-transform duration-200">
                            <AvatarFallback className="bg-primary/10 text-xs font-bold text-primary">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-200">{user.name}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium mt-0.5">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50">
                          <Shield className="h-3 w-3" />
                          {user.role.name}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.status === "active" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-950/30 px-2.5 py-1 text-xs font-semibold text-green-700 dark:text-green-400 border border-green-200/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
                            {t("active")}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 dark:bg-slate-900/30 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200/40">
                            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500" />
                            {t("inactive")}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg"
                            title={t("toggleStatus")}
                            onClick={() => onToggleStatus(user.id)}
                          >
                            <ToggleLeft className="h-4.5 w-4.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg"
                            title={t("editUser")}
                            onClick={() => openEditSheet(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive text-destructive/80 transition-all duration-200 rounded-lg"
                            title={t("deleteUser")}
                            onClick={() => openDeleteDialog(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination wrapper for margins */}
      {pagination && (
        <div className="pt-2">
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            onPageChange={goToPage}
          />
        </div>
      )}

      {/* Restyled Sheet: Add User */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md p-0 rounded-l-2xl border-l border-border/80">
          <SheetHeader className="border-b px-6 py-5 bg-muted/10">
            <SheetTitle className="text-lg font-bold">{t("addUser")}</SheetTitle>
            <SheetDescription className="text-xs">{t("addUserDesc")}</SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">{t("nameLabel")}</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <Input
                    id="name"
                    placeholder={t("namePlaceholder")}
                    className="pl-9 h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">{t("emailLabel")}</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    className="pl-9 h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">{t("passwordLabel")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    className="pr-10 h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="roleId" className="text-sm font-semibold">{t("roleLabel")}</Label>
                <Controller
                  name="roleId"
                  control={control}
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
                {errors.roleId && (
                  <p className="text-xs font-medium text-destructive">
                    {errors.roleId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">{t("teamLabel")}</Label>
                <Controller
                  name="teamId"
                  control={control}
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

      {/* Restyled Sheet: Edit User */}
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

export default function UserManagementPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <UserManagementContent />
    </Suspense>
  );
}
