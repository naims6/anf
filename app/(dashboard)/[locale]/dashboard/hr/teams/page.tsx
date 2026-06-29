"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Plus, Pencil, Trash2, Users,
  Check, X,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import {
  teamSchema, type TeamFormData, type Team, type PaginationMeta,
} from "@/lib/validations/teams";
import type { Role } from "@/lib/validations/roles";
import {
  getAllTeams, createTeam, updateTeam, deleteTeam, getAllRolesForTeam,
} from "@/services/teamService";

import { SearchInput } from "@/components/shared/SearchInput";
import { PageHeader } from "@/components/shared/PageHeader";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { Pagination } from "@/components/shared/Pagination";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";
import { CrudSheet } from "@/components/shared/CrudSheet";
import { PageFallback } from "@/components/shared/PageFallback";

function TeamsContent() {
  const t = useTranslations("Dashboard.teams");
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const searchTerm = searchParams.get("searchTerm") || "";
  const limit = 10;

  const [searchInput, setSearchInput, updateParams] = useDebouncedSearch("searchTerm");
  const [teams, setTeams] = useState<Team[]>([]);
  const [parentOptions, setParentOptions] = useState<Team[]>([]);
  const [roleOptions, setRoleOptions] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingTeam, setDeletingTeam] = useState<Team | null>(null);
  const [referenceLoading, setReferenceLoading] = useState(false);

  const isEditing = editingTeam !== null;

  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: { name: "", parentId: null, roleId: null, isDefault: false },
  });
  const { register, handleSubmit, reset, control, formState: { errors } } = form;

  const fetchTeams = useCallback(async () => {
    setLoading(true);
    const res = await getAllTeams({ page, limit, searchTerm });
    if (res.data) {
      setTeams(res.data);
      if (res.pagination) setPagination(res.pagination);
    } else {
      toast.error(res.error || "Failed to load teams");
    }
    setLoading(false);
  }, [page, limit, searchTerm]);

  useEffect(() => { fetchTeams(); }, [fetchTeams]);

  const loadReferenceData = useCallback(async () => {
    if (referenceLoading) return;
    setReferenceLoading(true);
    const [teamsRes, rolesRes] = await Promise.all([
      getAllTeams({ limit: 100 }),
      getAllRolesForTeam(),
    ]);
    if (teamsRes.data) setParentOptions(teamsRes.data);
    if (rolesRes.data) setRoleOptions(rolesRes.data);
    setReferenceLoading(false);
  }, [referenceLoading]);

  const openAddSheet = () => {
    loadReferenceData();
    setEditingTeam(null);
    reset({ name: "", parentId: null, roleId: null, isDefault: false });
    setSheetOpen(true);
  };

  const openEditSheet = (team: Team) => {
    loadReferenceData();
    setEditingTeam(team);
    reset({
      name: team.name ?? "",
      parentId: team.parent?.id ?? null,
      roleId: team.role?.id ?? null,
      isDefault: team.isDefault ?? false,
    });
    setSheetOpen(true);
  };

  const buildTeam = (id: number, data: TeamFormData) => {
    const parent = data.parentId
      ? (parentOptions.find((p) => p.id === data.parentId) ?? null)
      : null;
    const role = data.roleId
      ? (roleOptions.find((r) => r.id === data.roleId) ?? null)
      : null;
    return {
      id,
      name: data.name,
      parent: parent ? { id: parent.id, name: parent.name } : null,
      role: role ? { id: role.id, name: role.name } : null,
      isDefault: data.isDefault,
    } as Team;
  };

  const onSubmit = async (data: TeamFormData) => {
    setSubmitting(true);
    if (isEditing && editingTeam) {
      const res = await updateTeam(editingTeam.id, data);
      if (res.data) {
        const updated = buildTeam(editingTeam.id, data);
        setTeams((prev) =>
          prev.map((t) => (t.id === editingTeam.id ? { ...t, ...updated } : t)),
        );
        toast.success("Team updated");
        setSheetOpen(false);
      } else {
        toast.error(res.error || "Failed to update team");
      }
    } else {
      const res = await createTeam(data);
      if (res.data) {
        const newTeam = buildTeam(res.data.id, data);
        setTeams((prev) => [{ ...newTeam, _count: { teamMembers: 0 } }, ...prev]);
        toast.success("Team created");
        setSheetOpen(false);
      } else {
        toast.error(res.error || "Failed to create team");
      }
    }
    setSubmitting(false);
  };

  const confirmDelete = async () => {
    if (!deletingTeam) return;
    const res = await deleteTeam(deletingTeam.id);
    if (res.success) {
      setTeams((prev) => prev.filter((t) => t.id !== deletingTeam.id));
      toast.success("Team deleted");
    } else {
      toast.error(res.error || "Failed to delete team");
    }
    setDeletingTeam(null);
  };

  const goToPage = (p: number) => updateParams({ page: String(p) });

  const filteredParents = parentOptions.filter((t) => t.id !== editingTeam?.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          <Button onClick={openAddSheet}>
            <Plus className="mr-2 h-4 w-4" /> {t("addTeam")}
          </Button>
        }
      />

      <SearchInput
        placeholder={t("searchTeams")}
        value={searchInput}
        onChange={setSearchInput}
      />

      <Card>
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base font-semibold">
            {t("allTeams")}
            {!loading && <span className="ml-2 text-xs font-normal text-muted-foreground">({pagination?.total ?? teams.length})</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
          ) : teams.length === 0 ? (
            <EmptyState
              icon={<Users className="h-10 w-10 text-muted-foreground/50" />}
              message={t("noTeams")}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3">{t("name")}</th>
                    <th className="px-6 py-3">{t("parentTeam")}</th>
                    <th className="px-6 py-3">{t("role")}</th>
                    <th className="px-6 py-3">{t("members")}</th>
                    <th className="px-6 py-3">{t("isDefault")}</th>
                    <th className="px-6 py-3 text-right">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team) => (
                    <tr key={team.id} className="border-b last:border-0 transition-colors hover:bg-muted/30">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <Users className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{team.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {team.parent?.name ?? "—"}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                          {team.role?.name ?? "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">
                          <Users className="h-3 w-3" /> {team._count?.teamMembers ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {team.isDefault ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                            <Check className="h-3 w-3" /> Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                            <X className="h-3 w-3" /> No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon-sm" onClick={() => openEditSheet(team)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => setDeletingTeam(team)}>
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
        title={isEditing ? t("editTeam") : t("addTeam")}
        description={isEditing ? t("editTeamDesc") : t("addTeamDesc")}
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
          {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <Label>{t("parentTeamLabel")}</Label>
          <Controller
            name="parentId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value != null ? String(field.value) : "none"}
                onValueChange={(val) => field.onChange(val === "none" ? null : Number(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("parentTeamPlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("parentTeamPlaceholder")}</SelectItem>
                  {filteredParents.map((team) => (
                    <SelectItem key={team.id} value={String(team.id)}>{team.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label>{t("roleLabel")}</Label>
          <Controller
            name="roleId"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value != null ? String(field.value) : "none"}
                onValueChange={(val) => field.onChange(val === "none" ? null : Number(val))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={t("rolePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{t("rolePlaceholder")}</SelectItem>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.id} value={String(role.id)}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex items-start gap-3 rounded-lg border p-4">
          <Controller
            name="isDefault"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="isDefault"
                checked={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
            )}
          />
          <div>
            <Label htmlFor="isDefault" className="font-medium">{t("isDefaultLabel")}</Label>
            <p className="text-xs text-muted-foreground">{t("isDefaultDesc")}</p>
          </div>
        </div>
      </CrudSheet>

      <DeleteAlertDialog
        open={deletingTeam !== null}
        onOpenChange={(open) => !open && setDeletingTeam(null)}
        title={t("deleteTeam")}
        description={t("deleteTeamDesc", { name: deletingTeam?.name ?? "" })}
        onConfirm={confirmDelete}
        confirmLabel={t("delete")}
        cancelLabel={t("cancel")}
      />
    </div>
  );
}

export default function TeamsPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <TeamsContent />
    </Suspense>
  );
}
