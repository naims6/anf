"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Search, Plus, Pencil, Trash2, Users,
  Loader2, AlertTriangle, ChevronLeft, ChevronRight, Check, X,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle,
  SheetDescription, SheetClose, SheetFooter,
} from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle,
  AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { useDebouncedSearch } from "@/hooks/use-debounced-search";
import {
  teamSchema, type TeamFormData, type Team, type PaginationMeta,
} from "@/lib/validations/teams";
import type { Role } from "@/lib/validations/roles";
import {
  getAllTeams, createTeam, updateTeam, deleteTeam, getAllRolesForTeam,
} from "@/services/teamService";

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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={openAddSheet}>
          <Plus className="mr-2 h-4 w-4" /> {t("addTeam")}
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("searchTeams")}
          className="pl-9"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base font-semibold">
            {t("allTeams")}
            {!loading && <span className="ml-2 text-xs font-normal text-muted-foreground">({pagination?.total ?? teams.length})</span>}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-6">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="mb-4 h-12 w-full" />)}
            </div>
          ) : teams.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Users className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">{t("noTeams")}</p>
            </div>
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

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
          </p>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" disabled={pagination.page <= 1} onClick={() => goToPage(pagination.page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <Button key={p} variant={p === pagination.page ? "default" : "outline"} size="sm" className="min-w-[2rem]" onClick={() => goToPage(p)}>
                {p}
              </Button>
            ))}
            <Button variant="outline" size="sm" disabled={pagination.page >= pagination.totalPages} onClick={() => goToPage(pagination.page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="text-lg">{isEditing ? t("editTeam") : t("addTeam")}</SheetTitle>
            <SheetDescription>{isEditing ? t("editTeamDesc") : t("addTeamDesc")}</SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
              <div className="space-y-2">
                <Label htmlFor="name">{t("nameLabel")}</Label>
                <Input id="name" placeholder={t("namePlaceholder")} {...register("name")} />
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
            </div>
            <SheetFooter className="shrink-0 border-t px-6 py-4">
              <SheetClose asChild>
                <Button variant="outline" type="button" disabled={submitting}>{t("cancel")}</Button>
              </SheetClose>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? t("update") : t("save")}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      <AlertDialog open={deletingTeam !== null} onOpenChange={(open) => !open && setDeletingTeam(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <AlertDialogTitle>{t("deleteTeam")}</AlertDialogTitle>
            <AlertDialogDescription>{t("deleteTeamDesc", { name: deletingTeam?.name ?? "" })}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90" onClick={confirmDelete}>
              {t("delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function TeamsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-72" />
          <Card>
            <CardContent className="p-6">
              {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="mb-4 h-12 w-full" />)}
            </CardContent>
          </Card>
        </div>
      }
    >
      <TeamsContent />
    </Suspense>
  );
}
