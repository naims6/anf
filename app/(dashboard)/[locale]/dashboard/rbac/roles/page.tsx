"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Pencil,
  Trash2,
  Shield,
  ShieldCheck,
  Plus,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useDebouncedSearch } from "@/hooks/use-debounced-search";

import {
  roleSchema,
  type RoleFormData,
  type Role,
  type Permission,
  type PaginationMeta,
} from "@/lib/validations/roles";
import {
  getAllRoles,
  createRole,
  updateRole,
  deleteRole,
  getAllPermissions,
} from "@/services/roleService";

import { SearchInput } from "@/components/shared/SearchInput";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";
import { CrudSheet } from "@/components/shared/CrudSheet";
import { PageFallback } from "@/components/shared/PageFallback";

function RolesContent() {
  const t = useTranslations("Dashboard.roles");
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const sortBy = searchParams.get("sortBy") || undefined;
  const sortOrder = searchParams.get("sortOrder") || undefined;
  const limit = Number(searchParams.get("limit")) || 5;

  const [searchInput, setSearchInput, updateParams] =
    useDebouncedSearch("searchTerm");

  const [roles, setRoles] = useState<Role[]>([]);
  const [allPermissions, setAllPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const permsFetched = useRef(false);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);

  const isEditing = editingRole !== null;

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await getAllRoles({
      page,
      limit,
      searchTerm,
      sortBy,
      sortOrder,
    });
    if (res.data) {
      setRoles(res.data);
      if (res.pagination) setPagination(res.pagination);
    } else {
      toast.error(res.error || "Failed to load roles");
    }
    setLoading(false);
  }, [page, limit, searchTerm, sortBy, sortOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const ensurePermissions = useCallback(async () => {
    if (permsFetched.current) return;
    const res = await getAllPermissions();
    if (res.data) {
      setAllPermissions(res.data);
      permsFetched.current = true;
    } else {
      toast.error(res.error || "Failed to load permissions");
    }
  }, []);

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

  const goToPage = (p: number) => {
    updateParams({ page: String(p) });
  };

  const toggleSort = (column: string) => {
    if (sortBy !== column) {
      updateParams({ sortBy: column, sortOrder: "asc" });
    } else if (sortOrder === "asc") {
      updateParams({ sortBy: column, sortOrder: "desc" });
    } else {
      updateParams({ sortBy: undefined, sortOrder: undefined });
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column)
      return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-50" />;
    return sortOrder === "asc" ? (
      <ArrowUp className="ml-1 inline h-3 w-3 text-primary" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3 text-primary" />
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          <Button onClick={openAddSheet}>
            <Plus className="mr-2 h-4 w-4" />
            {t("addRole")}
          </Button>
        }
      />

      <SearchInput
        placeholder={t("searchRoles")}
        value={searchInput}
        onChange={setSearchInput}
      />

      <Card>
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base font-semibold">
            {t("allRoles")}
            {!loading && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({roles.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
          ) : roles.length === 0 ? (
            <EmptyState
              icon={<Shield className="h-10 w-10 text-muted-foreground/50" />}
              message={t("noRoles")}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3">
                      <button
                        className="flex items-center gap-1 hover:text-foreground"
                        onClick={() => toggleSort("name")}
                      >
                        {t("name")}
                        <SortIcon column="name" />
                      </button>
                    </th>
                    <th className="px-6 py-3">
                      <button
                        className="flex items-center gap-1 hover:text-foreground"
                        onClick={() => toggleSort("description")}
                      >
                        {t("description")}
                        <SortIcon column="description" />
                      </button>
                    </th>
                    <th className="px-6 py-3">{t("permissions")}</th>
                    <th className="px-6 py-3 text-right">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
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
                            onClick={() => setDeletingRole(role)}
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

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          onPageChange={goToPage}
        />
      )}

      <CrudSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title={isEditing ? t("editRole") : t("addRole")}
        description={isEditing ? t("editRoleDesc") : t("addRoleDesc")}
        onSubmit={handleSubmit(onSubmit)}
        submitting={submitting}
        isEditing={isEditing}
        saveLabel={t("save")}
        updateLabel={t("update")}
        cancelLabel={t("cancel")}
      >
        <div className="space-y-2">
          <Label htmlFor="name">{t("nameLabel")}</Label>
          <Input
            id="name"
            placeholder={t("namePlaceholder")}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
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
      </CrudSheet>

      <DeleteAlertDialog
        open={deletingRole !== null}
        onOpenChange={(open) => !open && setDeletingRole(null)}
        title={t("deleteRole")}
        description={t("deleteRoleDesc", { name: deletingRole?.name ?? "" })}
        onConfirm={confirmDelete}
        confirmLabel={t("delete")}
        cancelLabel={t("cancel")}
      />
    </div>
  );
}

export default function RolesPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RolesContent />
    </Suspense>
  );
}
