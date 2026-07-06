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
  FolderTree,
  Layers,
  Loader2,
  ChevronRight,
  X,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";

import {
  createCategorySchema,
  type CreateCategoryFormData,
  type Category,
} from "@/lib/validations/categories";
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/categoryService";

import { PageHeader } from "@/components/shared/PageHeader";
import { PageFallback } from "@/components/shared/PageFallback";

function CreateCategoryContent() {
  const t = useTranslations("Dashboard");
  const sc = (key: string, vars?: Record<string, string | number | Date>) =>
    t(`category_${key}`, vars);

  const [loading, setLoading] = useState(true);
  const [columns, setColumns] = useState<Category[][]>([]);
  const [selectedColIds, setSelectedColIds] = useState<string[]>([]);
  const [loadingColIdx, setLoadingColIdx] = useState<number | null>(null);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formParentId, setFormParentId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

  const isEditing = editingCategory !== null;

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "", parentId: null },
  });

  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = form;

  const fetchRootCategories = useCallback(async () => {
    setLoading(true);
    setSelectedColIds([]);
    const res = await getAllCategories();
    if (res.data) {
      setColumns([res.data]);
    } else {
      toast.error(res.error || "Failed to load categories");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRootCategories();
  }, [fetchRootCategories]);

  useEffect(() => {
    if (dialogOpen) {
      setTimeout(() => setFocus("name"), 100);
    }
  }, [dialogOpen, setFocus]);

  async function handleColumnCategoryClick(cat: Category, colIdx: number) {
    const hasChildren = (cat._count?.childCategories ?? 0) > 0;
    const newSelectedIds = [...selectedColIds.slice(0, colIdx), cat.id];
    setSelectedColIds(newSelectedIds);

    if (hasChildren) {
      setLoadingColIdx(colIdx + 1);
      setColumns((prev) => [...prev.slice(0, colIdx + 1)]);

      const res = await getAllCategories(cat.id);
      if (res.data) {
        setColumns((prev) => [...prev.slice(0, colIdx + 1), res.data]);
      } else {
        toast.error(res.error || "Failed to load subcategories");
      }
      setLoadingColIdx(null);
    } else {
      setColumns((prev) => prev.slice(0, colIdx + 1));
    }
  }

  function openAddDialog(parentId: string | null) {
    setEditingCategory(null);
    setFormParentId(parentId);
    reset({ name: "", parentId });
    setDialogOpen(true);
  }

  function openEditDialog(cat: Category) {
    setEditingCategory(cat);
    setFormParentId(cat.parentId);
    reset({ name: cat.name, parentId: cat.parentId });
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingCategory(null);
    setFormParentId(null);
    reset({ name: "", parentId: null });
  }

  function findCategoryParentCol(id: string): number {
    for (let i = 0; i < columns.length; i++) {
      if (columns[i].some((c) => c.id === id)) return i;
    }
    return -1;
  }

  function getCategoryName(id: string | null): string {
    if (!id) return "";
    for (const col of columns) {
      const found = col.find((c) => c.id === id);
      if (found) return found.name;
    }
    return "";
  }

  async function onSubmit(data: CreateCategoryFormData) {
    setSubmitting(true);

    if (isEditing && editingCategory) {
      const res = await updateCategory(editingCategory.id, data);
      if (res.data) {
        const updated: Category = res.data;
        setColumns((prev) =>
          prev.map((col) =>
            col.map((c) => (c.id === updated.id ? { ...c, name: updated.name } : c)),
          ),
        );
        toast.success("Category updated");
        closeDialog();
      } else {
        toast.error(res.error || "Failed to update category");
      }
    } else {
      const res = await createCategory(data);
      if (res.data) {
        const newCat: Category = res.data;
        setColumns((prev) => {
          const next = [...prev];
          if (!data.parentId) {
            // Root category - add to first column
            next[0] = [newCat, ...next[0]];
          } else {
            // Child category - find parent column and add to next column
            const parentColIdx = findCategoryParentCol(data.parentId);
            const childColIdx = parentColIdx + 1;
            if (next[childColIdx]) {
              next[childColIdx] = [...next[childColIdx], newCat];
            }
            // Increment parent's child count
            if (parentColIdx >= 0) {
              next[parentColIdx] = next[parentColIdx].map((c) =>
                c.id === data.parentId
                  ? {
                      ...c,
                      _count: {
                        childCategories: (c._count?.childCategories ?? 0) + 1,
                      },
                    }
                  : c,
              );
            }
          }
          return next;
        });
        toast.success("Category created");
        closeDialog();
      } else {
        toast.error(res.error || "Failed to create category");
      }
    }
    setSubmitting(false);
  }

  async function confirmDelete() {
    if (!deletingCategory) return;
    const res = await deleteCategory(deletingCategory.id);
    if (res.success) {
      const deleted = deletingCategory;
      setColumns((prev) => {
        const next = prev.map((col) =>
          col.filter((c) => c.id !== deleted.id),
        );
        // Decrement parent's child count
        if (deleted.parentId) {
          const parentColIdx = findCategoryParentCol(deleted.parentId);
          if (parentColIdx >= 0) {
            next[parentColIdx] = next[parentColIdx].map((c) =>
              c.id === deleted.parentId
                ? {
                    ...c,
                    _count: {
                      childCategories: Math.max(
                        0,
                        (c._count?.childCategories ?? 1) - 1,
                      ),
                    },
                  }
                : c,
            );
          }
        }
        // Remove empty trailing columns
        while (next.length > 1 && next[next.length - 1].length === 0) {
          next.pop();
        }
        return next;
      });
      toast.success("Category deleted");
      setDeletingCategory(null);
    } else {
      toast.error(res.error || "Failed to delete category");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={sc("title")}
        subtitle={sc("subtitle")}
        action={
          <Button onClick={() => openAddDialog(null)} className="shadow-sm">
            <Plus className="mr-2 h-4 w-4" /> {sc("add")}
          </Button>
        }
      />

      <Card className="shadow-xs hover:shadow-md transition-all duration-300 border-border/80 rounded-2xl">
        <CardHeader className="border-b px-6 py-4 bg-muted/10 flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <FolderTree className="h-4.5 w-4.5 text-primary" />
            {sc("all")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : columns.length === 0 || columns[0]?.length === 0 ? (
            <div className="py-16 text-center text-sm text-muted-foreground border rounded-2xl bg-muted/5">
              <Layers className="mx-auto mb-2 h-10 w-10 text-muted-foreground/30" />
              <p className="font-medium">{sc("empty")}</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3"
                onClick={() => openAddDialog(null)}
              >
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                {sc("add")}
              </Button>
            </div>
          ) : (
            <div className="flex gap-2 border border-border/80 rounded-2xl overflow-x-auto p-2 bg-muted/10 min-h-[280px] max-w-full">
              {columns.map((colItems, colIdx) => (
                <div
                  key={colIdx}
                  className="flex-1 min-w-[200px] max-w-[240px] flex flex-col border border-border/60 bg-card rounded-xl overflow-hidden shadow-xs transition-all duration-200"
                >
                  <div className="bg-muted/40 border-b px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-muted-foreground">
                    {colIdx === 0
                      ? sc("all")
                      : selectedColIds[colIdx - 1]
                        ? getCategoryName(selectedColIds[colIdx - 1])
                        : `Level ${colIdx + 1}`}
                  </div>
                  <div className="flex-1 overflow-y-auto divide-y divide-border/60 max-h-[400px]">
                    {colItems.map((cat) => {
                      const isSelected = selectedColIds[colIdx] === cat.id;
                      const hasChildren =
                        (cat._count?.childCategories ?? 0) > 0;
                      return (
                        <div
                          key={cat.id}
                          className={cn(
                            "group flex items-center justify-between px-2.5 py-2 text-left text-xs transition-all duration-150 hover:bg-primary/5",
                            isSelected && "bg-primary/10",
                          )}
                        >
                          <button
                            type="button"
                            className="flex items-center gap-2 flex-1 min-w-0 text-left"
                            onClick={() =>
                              handleColumnCategoryClick(cat, colIdx)
                            }
                          >
                            <span
                              className={cn(
                                "truncate font-medium",
                                isSelected && "text-primary font-bold",
                              )}
                            >
                              {cat.name}
                            </span>
                            {hasChildren && (
                              <ChevronRight
                                className={cn(
                                  "h-3 w-3 shrink-0 text-muted-foreground/60",
                                  isSelected && "text-primary",
                                )}
                              />
                            )}
                          </button>

                          <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => openAddDialog(cat.id)}
                              className="flex h-6 w-6 items-center justify-center rounded hover:bg-primary/10 hover:text-primary text-muted-foreground/60 transition-colors"
                              title={sc("addSubcategory")}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditDialog(cat)}
                              className="flex h-6 w-6 items-center justify-center rounded hover:bg-primary/10 hover:text-primary text-muted-foreground/60 transition-colors"
                              title={sc("edit")}
                            >
                              <Pencil className="h-3 w-3" />
                            </button>
                            <button
                              type="button"
                              onClick={() => setDeletingCategory(cat)}
                              className="flex h-6 w-6 items-center justify-center rounded hover:bg-destructive/10 hover:text-destructive text-muted-foreground/60 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>

                          {!isSelected && (
                            <div className="flex items-center gap-0.5 shrink-0 sm:hidden">
                              <button
                                type="button"
                                onClick={() =>
                                  openAddDialog(cat.id)
                                }
                                className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-border/60">
                    <button
                      type="button"
                      onClick={() =>
                        openAddDialog(
                          colIdx === 0
                            ? null
                            : selectedColIds[colIdx - 1] ?? null,
                        )
                      }
                      className="flex w-full items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-primary bg-primary/5 hover:bg-primary/10 transition-colors rounded-b-xl"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {sc("add")}
                    </button>
                  </div>

                  {loadingColIdx === colIdx + 1 && (
                    <div className="flex items-center justify-center py-8 border-t border-border/60">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  )}
                </div>
              ))}

              {loadingColIdx !== null && loadingColIdx >= columns.length && (
                <div className="flex-1 min-w-[200px] max-w-[240px] flex flex-col border border-border/60 bg-card rounded-xl overflow-hidden shadow-xs justify-center items-center">
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeDialog}
          />
          <div className="relative w-full max-w-md animate-in fade-in zoom-in-95 duration-200 px-4">
            <Card className="shadow-xl border-border/80 rounded-2xl">
              <CardHeader className="border-b px-6 py-4 bg-muted/10 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold">
                    {isEditing ? sc("edit") : sc("add")}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {isEditing ? sc("editDesc") : sc("addDesc")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </CardHeader>
              <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="cat-name" className="text-sm font-semibold">
                      {sc("nameLabel")}
                    </Label>
                    <Input
                      id="cat-name"
                      placeholder={sc("namePlaceholder")}
                      className="h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
                      {...register("name")}
                      autoFocus
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">
                      {sc("parentLabel")}
                    </Label>
                    <div className="flex h-10 items-center rounded-xl border border-border/80 bg-muted/20 px-3.5 text-sm text-muted-foreground">
                      {formParentId
                        ? getCategoryName(formParentId)
                        : sc("parentPlaceholder")}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {sc("parentHint")}
                    </p>
                  </div>
                </CardContent>

                <div className="flex justify-end gap-3 border-t px-6 py-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeDialog}
                    disabled={submitting}
                    className="rounded-xl"
                  >
                    {sc("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl"
                  >
                    {submitting && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isEditing ? sc("update") : sc("save")}
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      )}

      <DeleteAlertDialog
        open={deletingCategory !== null}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        title={sc("deleteTitle")}
        description={sc("deleteDesc", { name: deletingCategory?.name ?? "" })}
        onConfirm={confirmDelete}
        confirmLabel={sc("delete")}
        cancelLabel={sc("cancel")}
      />
    </div>
  );
}

export default function CreateCategoryPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <CreateCategoryContent />
    </Suspense>
  );
}
