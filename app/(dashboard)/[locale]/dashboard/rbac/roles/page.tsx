"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Shield,
  ShieldCheck,
  Loader2,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
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
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

import {
  roleSchema,
  type RoleFormData,
  type Role,
  type Permission,
} from "@/lib/validations/roles";
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getAllPermissions,
} from "@/services/roleService";

export default function RolesPage() {
  const t = useTranslations("Dashboard.roles");

  // ─── State ──────────────────────────────────────────────────────────────────
  const [roles, setRoles] = useState<Role[]>([]);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [permsLoading, setPermsLoading] = useState(false);
  const permsFetched = useRef(false);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);

  const isEditing = editingRole !== null;

  // ─── Form ────────────────────────────────────────────────────────────────────
  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: "", description: "", permissionIds: [] },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = form;

  const selectedIds = watch("permissionIds");

  // ─── Fetch roles on mount, permissions lazy when sheet opens ──────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await getAllRoles();
    if (res.data) {
      setRoles(res.data);
    } else {
      toast.error(res.error || "Failed to load roles");
    }
    setLoading(false);
  }, []);

  const ensurePermissions = useCallback(async () => {
    if (permsFetched.current) return;
    setPermsLoading(true);
    const res = await getAllPermissions();
    if (res.data) {
      setAllPermissions(res.data);
      permsFetched.current = true;
    } else {
      toast.error(res.error || "Failed to load permissions");
    }
    setPermsLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ─── Derived ────────────────────────────────────────────────────────────────
  const filteredRoles = useMemo(
    () =>
      roles.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [roles, search],
  );

  // ─── Handlers ───────────────────────────────────────────────────────────────
  const openAddSheet = () => {
    ensurePermissions();
    setEditingRole(null);
    reset({ name: "", description: "", permissionIds: [] });
    setSheetOpen(true);
  };

  const openEditSheet = (role: Role) => {
    ensurePermissions();
    setEditingRole(role);
    reset({
      name: role.name,
      description: role.description,
      permissionIds: role.permissions.map((p) => p.id),
    });
    setSheetOpen(true);
  };

  const onSubmit = async (data: RoleFormData) => {
    setSubmitting(true);
    if (isEditing && editingRole) {
      const res = await updateRole(editingRole.id, data);
      if (res.data) {
        setRoles((prev) =>
          prev.map((r) =>
            r.id === editingRole.id
              ? {
                  ...r,
                  name: data.name,
                  description: data.description,
                  permissions: allPermissions.filter((p) =>
                    data.permissionIds.includes(p.id),
                  ),
                }
              : r,
          ),
        );
        toast.success("Role updated");
        setSheetOpen(false);
      } else {
        toast.error(res.error || "Failed to update role");
      }
    } else {
      const res = await createRole(data);
      if (res.data) {
        const newRole: Role = {
          id: res.data.id,
          name: data.name,
          description: data.description,
          permissions: allPermissions.filter((p) =>
            data.permissionIds.includes(p.id),
          ),
        };
        setRoles((prev) => [...prev, newRole]);
        toast.success("Role created");
        setSheetOpen(false);
      } else {
        toast.error(res.error || "Failed to create role");
      }
    }
    setSubmitting(false);
  };

  const handleDelete = (role: Role) => {
    setDeletingRole(role);
  };

  const confirmDelete = async () => {
    if (!deletingRole) return;
    const res = await deleteRole(deletingRole.id);
    if (res.success) {
      setRoles((prev) => prev.filter((r) => r.id !== deletingRole.id));
      toast.success("Role deleted");
    } else {
      toast.error(res.error || "Failed to delete role");
    }
    setDeletingRole(null);
  };

  const togglePermission = (id: number) => {
    const current = selectedIds || [];
    setValue(
      "permissionIds",
      current.includes(id) ? current.filter((p) => p !== id) : [...current, id],
      { shouldValidate: true },
    );
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-72" />
        <Card>
          <CardContent className="p-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="mb-4 h-12 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ── Header ───────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={openAddSheet}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addRole")}
        </Button>
      </div>

      {/* ── Search ────────────────────────────────────────────────────── */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("searchRoles")}
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ── Table ─────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base font-semibold">
            {t("allRoles")}
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              ({filteredRoles.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredRoles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Shield className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">{t("noRoles")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3">{t("name")}</th>
                    <th className="px-6 py-3">{t("description")}</th>
                    <th className="px-6 py-3">{t("permissions")}</th>
                    <th className="px-6 py-3 text-right">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoles.map((role) => (
                    <tr
                      key={role.id}
                      className="border-b last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{role.name}</span>
                        </div>
                      </td>
                      <td className="max-w-xs truncate px-6 py-4 text-muted-foreground">
                        {role.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((perm) => (
                            <span
                              key={perm.id}
                              className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                            >
                              {perm.name}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEditSheet(role)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => handleDelete(role)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
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

      {/* ── Add / Edit Sheet ──────────────────────────────────────────── */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="text-lg">
              {isEditing ? t("editRole") : t("addRole")}
            </SheetTitle>
            <SheetDescription>
              {isEditing ? t("editRoleDesc") : t("addRoleDesc")}
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-6 py-5">
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
                <Label htmlFor="description">{t("descLabel")}</Label>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      id="description"
                      rows={3}
                      placeholder={t("descPlaceholder")}
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                  )}
                />
                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>{t("permissions")}</Label>
                  {errors.permissionIds && (
                    <p className="text-xs text-destructive">
                      {errors.permissionIds.message}
                    </p>
                  )}
                </div>
                {allPermissions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No permissions available.
                  </p>
                ) : (
                  <div className="grid gap-2">
                    {allPermissions.map((perm) => (
                      <label
                        key={perm.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-accent",
                          (selectedIds || []).includes(perm.id) &&
                            "border-primary/50 bg-primary/5",
                        )}
                      >
                        <input
                          type="checkbox"
                          checked={(selectedIds || []).includes(perm.id)}
                          onChange={() => togglePermission(perm.id)}
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        {perm.name}
                      </label>
                    ))}
                  </div>
                )}
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
                {isEditing ? t("update") : t("save")}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={deletingRole !== null}
        onOpenChange={(open) => !open && setDeletingRole(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <AlertDialogTitle>{t("deleteRole")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("deleteRoleDesc", { name: deletingRole?.name ?? "" })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDelete}
            >
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
