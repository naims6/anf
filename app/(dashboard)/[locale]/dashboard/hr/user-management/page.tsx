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
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  type User,
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

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
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

  const openEditSheet = (user: User) => {
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

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          <Button onClick={openAddSheet}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addUser")}
          </Button>
        }
      />

      <SearchInput
        placeholder={t("searchUsers")}
        value={searchInput}
        onChange={setSearchInput}
      />

      <Card>
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base font-semibold">
            {t("allUsers")}
            {!loading && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({pagination?.total ?? users.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
          ) : users.length === 0 ? (
            <EmptyState
              icon={<Users className="h-10 w-10 text-muted-foreground/50" />}
              message={t("noUsers")}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3">{t("name")}</th>
                    <th className="px-6 py-3">{t("role")}</th>
                    <th className="px-6 py-3">{t("status")}</th>
                    <th className="px-6 py-3 text-right">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/hr/user-management/${user.id}`}
                          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-xs text-primary">
                              {getInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">{user.role.name}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.status === "active" ? t("active") : t("inactive")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title={t("toggleStatus")}
                            onClick={() => onToggleStatus(user.id)}
                          >
                            <ToggleLeft className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            title={t("editUser")}
                            onClick={() => openEditSheet(user)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
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

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          onPageChange={goToPage}
        />
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="text-lg">{t("addUser")}</SheetTitle>
            <SheetDescription>{t("addUserDesc")}</SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
              <div className="space-y-2">
                <Label htmlFor="name">{t("nameLabel")}</Label>
                <Input
                  id="name"
                  placeholder={t("namePlaceholder")}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("emailLabel")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("passwordLabel")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
                    className="pr-10"
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
                  <p className="text-xs text-destructive">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="roleId">{t("roleLabel")}</Label>
                <Controller
                  name="roleId"
                  control={control}
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
                {errors.roleId && (
                  <p className="text-xs text-destructive">
                    {errors.roleId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t("teamLabel")}</Label>
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

export default function UserManagementPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <UserManagementContent />
    </Suspense>
  );
}
