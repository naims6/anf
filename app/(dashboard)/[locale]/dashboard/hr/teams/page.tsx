"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Plus, Pencil, Trash2, Users,
  Check, X, Shield, Layers, UserCheck, HelpCircle
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { StatCard } from "@/components/dashboard/stat-card";

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

  // Dynamic dashboard stats calculations
  const totalTeamsCount = pagination?.total ?? teams.length;
  const defaultTeamsCount = teams.filter((t) => t.isDefault).length;
  const parentTeamsCount = teams.filter((t) => !t.parent).length;
  const totalTeamMembers = teams.reduce((acc, t) => acc + (t._count?.teamMembers ?? 0), 0);

  return (
    <div className="space-y-8">
      {/* Header section with refined action button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground/90">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button 
          onClick={openAddSheet}
          className="shadow-sm hover:shadow-md hover:bg-primary/95 transition-all duration-300 rounded-xl"
        >
          <Plus className="mr-2 h-4 w-4" /> {t("addTeam")}
        </Button>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("allTeams")}
          value={totalTeamsCount}
          icon={<Layers className="h-5 w-5" />}
          description="Total active organizational departments"
        />
        <StatCard
          title="Default Teams"
          value={defaultTeamsCount}
          icon={<UserCheck className="h-5 w-5" />}
          description="Automatically assigned to new members"
        />
        <StatCard
          title="Parent Teams"
          value={parentTeamsCount}
          icon={<Shield className="h-5 w-5" />}
          description="Top level functional teams"
        />
        <StatCard
          title="Total Members"
          value={totalTeamMembers}
          icon={<Users className="h-5 w-5" />}
          description="Members assigned to loaded teams"
        />
      </div>

      {/* Control bar with glassmorphic style Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-xl border border-border/60">
        <div className="flex-1 max-w-sm">
          <SearchInput
            placeholder={t("searchTeams")}
            value={searchInput}
            onChange={setSearchInput}
          />
        </div>
      </div>

      {/* Gorgeous Table Card */}
      <Card className="overflow-hidden border border-border/80 shadow-xs hover:shadow-md transition-all duration-300">
        <CardHeader className="border-b px-6 py-4 bg-muted/20">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>{t("allTeams")}</span>
            {!loading && (
              <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                {totalTeamsCount} {totalTeamsCount === 1 ? "Team" : "Teams"}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
          ) : teams.length === 0 ? (
            <EmptyState
              icon={<Users className="h-12 w-12 text-muted-foreground/40" />}
              message={t("noTeams")}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4">{t("name")}</th>
                    <th className="px-6 py-4">{t("parentTeam")}</th>
                    <th className="px-6 py-4">{t("role")}</th>
                    <th className="px-6 py-4">{t("members")}</th>
                    <th className="px-6 py-4">{t("isDefault")}</th>
                    <th className="px-6 py-4 text-right">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {teams.map((team) => (
                    <tr 
                      key={team.id} 
                      className="group transition-all duration-200 hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform duration-200">
                            <Users className="h-4 w-4" />
                          </div>
                          <span className="font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-200">
                            {team.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-medium">
                        {team.parent?.name ? (
                          <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md text-xs font-medium text-foreground/75 border border-border/40">
                            <Layers className="h-3 w-3 text-muted-foreground" />
                            {team.parent.name}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground/60 italic">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {team.role?.name ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400 border border-emerald-200/50">
                            <Shield className="h-3 w-3" />
                            {team.role.name}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground/60 italic">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 px-3 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400 border border-blue-200/50">
                          <Users className="h-3 w-3" /> {team._count?.teamMembers ?? 0}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {team.isDefault ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 dark:bg-green-950/30 px-2.5 py-1 text-xs font-semibold text-green-700 dark:text-green-400 border border-green-200/50">
                            <Check className="h-3.5 w-3.5" /> Default
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-slate-50 dark:bg-slate-900/30 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 border border-slate-200/40">
                            <X className="h-3.5 w-3.5 text-slate-400" /> Regular
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg"
                            onClick={() => openEditSheet(team)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive text-destructive/80 transition-all duration-200 rounded-lg"
                            onClick={() => setDeletingTeam(team)}
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

      {/* Pagination component with layout container spacing */}
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

      {/* Restyled Sheet form fields */}
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
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold">{t("nameLabel")}</Label>
            <Input
              id="name"
              placeholder={t("namePlaceholder")}
              className="h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
              {...register("name")}
            />
            {errors.name && <p className="text-xs font-medium text-destructive">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">{t("parentTeamLabel")}</Label>
            <Controller
              name="parentId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value != null ? String(field.value) : "none"}
                  onValueChange={(val) => field.onChange(val === "none" ? null : Number(val))}
                >
                  <SelectTrigger className="w-full h-10 border-border/80 focus:ring-primary/20 rounded-xl">
                    <SelectValue placeholder={t("parentTeamPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="none" className="rounded-lg">{t("parentTeamPlaceholder")}</SelectItem>
                    {filteredParents.map((team) => (
                      <SelectItem key={team.id} value={String(team.id)} className="rounded-lg">{team.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold">{t("roleLabel")}</Label>
            <Controller
              name="roleId"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value != null ? String(field.value) : "none"}
                  onValueChange={(val) => field.onChange(val === "none" ? null : Number(val))}
                >
                  <SelectTrigger className="w-full h-10 border-border/80 focus:ring-primary/20 rounded-xl">
                    <SelectValue placeholder={t("rolePlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="none" className="rounded-lg">{t("rolePlaceholder")}</SelectItem>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.id} value={String(role.id)} className="rounded-lg">{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border/85 bg-muted/20 p-4 transition-all duration-200 hover:border-primary/25">
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
                  className="mt-1 h-4.5 w-4.5 rounded-md border-border text-primary focus:ring-primary/25 cursor-pointer accent-primary"
                />
              )}
            />
            <div className="grid gap-0.5 leading-none">
              <Label htmlFor="isDefault" className="font-semibold text-sm cursor-pointer select-none">{t("isDefaultLabel")}</Label>
              <p className="text-xs text-muted-foreground">{t("isDefaultDesc")}</p>
            </div>
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
