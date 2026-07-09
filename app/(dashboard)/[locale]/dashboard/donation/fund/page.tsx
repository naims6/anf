"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Heart,
  ToggleLeft,
  ToggleRight,
  Calendar,
  Languages,
  Search,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StatCard } from "@/components/dashboard/stat-card";

import {
  createTohbilFundSchema,
  type CreateTohbilFundFormData,
  type TohbilFund,
} from "@/lib/validations/tohbilFund";
import {
  getAllTohbilFunds,
  createTohbilFund,
  updateTohbilFund,
  deleteTohbilFund,
  toggleTohbilFundStatus,
} from "@/services/tohbilFundService";

import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";
import { CrudDialog } from "@/components/shared/CrudDialog";
import { PageFallback } from "@/components/shared/PageFallback";

function FundContent() {
  const t = useTranslations("Dashboard.funds");

  const [funds, setFunds] = useState<TohbilFund[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingFund, setEditingFund] = useState<TohbilFund | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingFund, setDeletingFund] = useState<TohbilFund | null>(null);

  const isEditing = editingFund !== null;

  const form = useForm<CreateTohbilFundFormData>({
    resolver: zodResolver(createTohbilFundSchema),
    defaultValues: { name: "", nameBN: "" },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const fetchFunds = useCallback(async () => {
    setLoading(true);
    const res = await getAllTohbilFunds(
      searchTerm ? { searchTerm } : undefined,
    );
    if (res.data) {
      setFunds(res.data);
    } else {
      toast.error(res.error || "Failed to load funds");
    }
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchFunds();
  }, [fetchFunds]);

  const openAddSheet = () => {
    setEditingFund(null);
    reset({ name: "", nameBN: "" });
    setSheetOpen(true);
  };

  const openEditSheet = (fund: TohbilFund) => {
    setEditingFund(fund);
    reset({ name: fund.name, nameBN: fund.nameBN });
    setSheetOpen(true);
  };

  const onSubmit = async (data: CreateTohbilFundFormData) => {
    setSubmitting(true);
    if (isEditing && editingFund) {
      const res = await updateTohbilFund(editingFund.id, data);
      if (res.data) {
        setFunds((prev) =>
          prev.map((f) =>
            f.id === editingFund.id ? { ...f, ...res.data } : f,
          ),
        );
        toast.success(t("updateSuccess"));
        setSheetOpen(false);
      } else {
        toast.error(res.error || t("updateError"));
      }
    } else {
      const res = await createTohbilFund(data);
      if (res.data) {
        setFunds((prev) => [res.data, ...prev]);
        toast.success(t("createSuccess"));
        setSheetOpen(false);
      } else {
        toast.error(res.error || t("createError"));
      }
    }
    setSubmitting(false);
  };

  const confirmDelete = async () => {
    if (!deletingFund) return;
    const res = await deleteTohbilFund(deletingFund.id);
    if (res.success) {
      setFunds((prev) => prev.filter((f) => f.id !== deletingFund.id));
      toast.success(t("deleteSuccess"));
    } else {
      toast.error(res.error || t("deleteError"));
    }
    setDeletingFund(null);
  };

  const onToggleStatus = async (fund: TohbilFund) => {
    const res = await toggleTohbilFundStatus(fund.id);
    if (res.data) {
      setFunds((prev) =>
        prev.map((f) =>
          f.id === fund.id ? { ...f, isActive: res.data.isActive } : f,
        ),
      );
      toast.success(t("statusToggled"));
    } else {
      toast.error(res.error || t("toggleError"));
    }
  };

  const totalFundsCount = funds.length;
  const activeFundsCount = funds.filter((f) => f.isActive).length;
  const inactiveFundsCount = funds.filter((f) => !f.isActive).length;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground/90">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>
        <Button
          onClick={openAddSheet}
          className="shadow-sm hover:shadow-md hover:bg-primary/95 transition-all duration-300 rounded-xl"
        >
          <Plus className="mr-2 h-4 w-4" /> {t("addFund")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title={t("allFunds")}
          value={totalFundsCount}
          icon={<Heart className="h-5 w-5" />}
          description="Total donation funds"
        />
        <StatCard
          title={t("active")}
          value={activeFundsCount}
          icon={<ToggleRight className="h-5 w-5" />}
          description="Currently active funds"
        />
        <StatCard
          title={t("inactive")}
          value={inactiveFundsCount}
          icon={<ToggleLeft className="h-5 w-5" />}
          description="Currently inactive funds"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-xl border border-border/60">
        <div className="flex-1 max-w-sm relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchFunds")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
          />
        </div>
      </div>

      <Card className="overflow-hidden border border-border/80 shadow-xs hover:shadow-md transition-all duration-300">
        <CardHeader className="border-b px-6 py-4 bg-muted/20">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>{t("allFunds")}</span>
            {!loading && (
              <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                {totalFundsCount}{" "}
                {totalFundsCount === 1 ? "Fund" : "Funds"}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
          ) : funds.length === 0 ? (
            <EmptyState
              icon={<Heart className="h-12 w-12 text-muted-foreground/40" />}
              message={t("noFunds")}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4">{t("name")}</th>
                    <th className="px-6 py-4">{t("nameBN")}</th>
                    <th className="px-6 py-4">{t("status")}</th>
                    <th className="px-6 py-4">{t("createdAt")}</th>
                    <th className="px-6 py-4 text-right">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {funds.map((fund) => (
                    <tr
                      key={fund.id}
                      className="group transition-all duration-200 hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:scale-105 transition-transform duration-200">
                            <Heart className="h-4 w-4" />
                          </div>
                          <span className="font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-200">
                            {fund.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md text-xs font-medium text-foreground/75 border border-border/40">
                          <Languages className="h-3 w-3 text-muted-foreground" />
                          {fund.nameBN}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {fund.isActive ? (
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
                      <td className="px-6 py-4 text-muted-foreground font-medium">
                        <span className="inline-flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3" />
                          {new Date(fund.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg"
                            title={t("toggleStatus")}
                            onClick={() => onToggleStatus(fund)}
                          >
                            {fund.isActive ? (
                              <ToggleRight className="h-4.5 w-4.5" />
                            ) : (
                              <ToggleLeft className="h-4.5 w-4.5" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-lg"
                            title={t("editFund")}
                            onClick={() => openEditSheet(fund)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive text-destructive/80 transition-all duration-200 rounded-lg"
                            title={t("deleteFund")}
                            onClick={() => setDeletingFund(fund)}
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

      <CrudDialog
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title={isEditing ? t("editFund") : t("addFund")}
        description={isEditing ? t("editFundDesc") : t("addFundDesc")}
        onSubmit={handleSubmit(onSubmit)}
        submitting={submitting}
        isEditing={isEditing}
        saveLabel={t("save")}
        updateLabel={t("update")}
        cancelLabel={t("cancel")}
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm font-semibold">
            {t("nameLabel")}
          </Label>
          <div className="relative">
            <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
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
          <Label htmlFor="nameBN" className="text-sm font-semibold">
            {t("nameBNLabel")}
          </Label>
          <div className="relative">
            <Languages className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
            <Input
              id="nameBN"
              placeholder={t("nameBNPlaceholder")}
              className="pl-9 h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
              {...register("nameBN")}
            />
          </div>
          {errors.nameBN && (
            <p className="text-xs font-medium text-destructive">
              {errors.nameBN.message}
            </p>
          )}
        </div>
      </CrudDialog>

      <DeleteAlertDialog
        open={deletingFund !== null}
        onOpenChange={(open) => !open && setDeletingFund(null)}
        title={t("deleteFund")}
        description={t("deleteFundDesc", {
          name: deletingFund?.name ?? "",
        })}
        onConfirm={confirmDelete}
        confirmLabel={t("delete")}
        cancelLabel={t("cancel")}
      />
    </div>
  );
}

export default function FundPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <FundContent />
    </Suspense>
  );
}
