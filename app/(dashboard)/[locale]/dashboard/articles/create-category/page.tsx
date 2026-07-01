"use client";

import { useState, useEffect, useCallback, Suspense, Fragment } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  FolderTree,
  FolderOpen,
  Folder,
  Loader2,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

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
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { EmptyState } from "@/components/shared/EmptyState";
import { PageFallback } from "@/components/shared/PageFallback";

interface TreeNode {
  id: string;
  name: string;
  parentId: string | null;
  depth: number;
  _count?: { childCategories: number };
}

function normalizeParentId(cat: Category): Category {
  const obj = cat as unknown as Record<string, unknown>;
  const raw =
    obj.parentId ??
    obj.parent_id ??
    (obj.parent as Record<string, unknown>)?.id;
  return {
    ...cat,
    parentId: raw !== null && raw !== undefined ? String(raw) : null,
  };
}

function getParentName(list: Category[], node: TreeNode): string {
  if (!node.parentId) return "";
  const parent = list.find((c) => c.id === node.parentId);
  return parent ? parent.name : "";
}

function CreateCategoryContent() {
  const t = useTranslations("Dashboard");
  const sc = (key: string, vars?: Record<string, string | number | Date>) =>
    t(`category_${key}`, vars);

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadedParents, setLoadedParents] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadingChildren, setLoadingChildren] = useState<Set<string>>(
    new Set(),
  );
  const [searchInput, setSearchInput] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );

  const isEditing = editingCategory !== null;

  const form = useForm<CreateCategoryFormData>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: { name: "", parentId: null },
  });
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = form;

  const fetchRootCategories = useCallback(async () => {
    setLoading(true);
    const res = await getAllCategories();
    if (res.data) {
      setCategories(res.data.map(normalizeParentId));
      setLoadedParents(new Set());
    } else {
      toast.error(res.error || "Failed to load categories");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRootCategories();
  }, [fetchRootCategories]);

  const loadChildren = useCallback(
    async (parentId: string) => {
      if (loadedParents.has(parentId)) return;
      setLoadingChildren((prev) => new Set(prev).add(parentId));
      const res = await getAllCategories(parentId);
      if (res.data) {
        const children = res.data.map(normalizeParentId);
        setCategories((prev) => {
          const existing = new Set(prev.map((c) => c.id));
          const newOnes = children.filter((c) => !existing.has(c.id));
          return newOnes.length > 0 ? [...prev, ...newOnes] : prev;
        });
        setLoadedParents((prev) => new Set(prev).add(parentId));
      } else {
        toast.error(res.error || "Failed to load subcategories");
      }
      setLoadingChildren((prev) => {
        const next = new Set(prev);
        next.delete(parentId);
        return next;
      });
    },
    [loadedParents],
  );

  const toggleExpand = (node: TreeNode) => {
    const isExpanded = expandedIds.has(node.id);
    if (isExpanded) {
      setExpandedIds((prev) => {
        const next = new Set(prev);
        next.delete(node.id);
        return next;
      });
    } else {
      setExpandedIds((prev) => new Set(prev).add(node.id));
      loadChildren(node.id);
    }
  };

  const tree: TreeNode[] = categories
    .filter((c) => !c.parentId)
    .map((c) => ({
      id: c.id,
      name: c.name,
      parentId: null,
      depth: 0,
      _count: c._count,
    }));

  const flattenForSearch = useCallback(
    (node: TreeNode): TreeNode[] => {
      const result: TreeNode[] = [node];
      const children = categories
        .filter((c) => c.parentId === node.id)
        .map((c) => ({
          id: c.id,
          name: c.name,
          parentId: c.parentId,
          depth: node.depth + 1,
          _count: c._count,
        }));
      for (const child of children) {
        result.push(...flattenForSearch(child));
      }
      return result;
    },
    [categories],
  );

  const searchedTree = searchInput
    ? tree.filter((node) => {
        const flat = flattenForSearch(node);
        return flat.some((n) =>
          n.name.toLowerCase().includes(searchInput.toLowerCase()),
        );
      })
    : tree;

  const parentOptions = editingCategory
    ? categories.filter((c) => c.id !== editingCategory.id)
    : categories;

  return (
    <div className="space-y-6">
      <PageHeader
        title={sc("title")}
        subtitle={sc("subtitle")}
        action={
          <Button
            onClick={() => {
              setEditingCategory(null);
              reset({ name: "", parentId: null });
              setSheetOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> {sc("add")}
          </Button>
        }
      />

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={sc("search")}
          className="pl-9"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <Card className="shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <FolderTree className="h-4 w-4 text-muted-foreground" />
            {sc("all")}
            {!loading && (
              <span className="text-xs font-normal text-muted-foreground">
                ({categories.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
          ) : categories.length === 0 ? (
            <EmptyState
              icon={
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/5">
                  <FolderTree className="h-7 w-7 text-primary/40" />
                </div>
              }
              message={sc("empty")}
              action={
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingCategory(null);
                    reset({ name: "", parentId: null });
                    setSheetOpen(true);
                  }}
                >
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  {sc("add")}
                </Button>
              }
            />
          ) : searchedTree.length === 0 ? (
            <EmptyState
              icon={<Search className="h-8 w-8 text-muted-foreground/50" />}
              message={`${sc("noResults")} "${searchInput}"`}
            />
          ) : (
            <TooltipProvider>
              <div className="divide-y">
                {searchedTree.map((node) => (
                  <Fragment key={node.id}>{renderTreeNode(node)}</Fragment>
                ))}
              </div>
            </TooltipProvider>
          )}
        </CardContent>
      </Card>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="text-lg">
              {isEditing ? sc("edit") : sc("add")}
            </SheetTitle>
            <SheetDescription>
              {isEditing ? sc("editDesc") : sc("addDesc")}
            </SheetDescription>
          </SheetHeader>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
              <div className="space-y-2">
                <Label htmlFor="name">{sc("nameLabel")}</Label>
                <Input
                  id="name"
                  placeholder={sc("namePlaceholder")}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{sc("parentLabel")}</Label>
                <Controller
                  name="parentId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value ?? "none"}
                      onValueChange={(val) =>
                        field.onChange(val === "none" ? null : val)
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={sc("parentPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">
                          {sc("parentPlaceholder")}
                        </SelectItem>
                        {parentOptions.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <p className="text-xs text-muted-foreground">
                  {sc("parentHint")}
                </p>
              </div>
            </div>

            <SheetFooter className="shrink-0 border-t px-6 py-4">
              <SheetClose asChild>
                <Button variant="outline" type="button" disabled={submitting}>
                  {sc("cancel")}
                </Button>
              </SheetClose>
              <Button type="submit" disabled={submitting}>
                {submitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isEditing ? sc("update") : sc("save")}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

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

  function renderTreeNode(node: TreeNode) {
    const childCategories = categories
      .filter((c) => c.parentId === node.id)
      .map((c) => ({
        id: c.id,
        name: c.name,
        parentId: c.parentId,
        depth: node.depth + 1,
        _count: c._count,
      }));
    const childCount = node._count?.childCategories ?? childCategories.length;
    const hasChildren = childCount > 0;
    const isExpanded = expandedIds.has(node.id);
    const parentName = getParentName(categories, node);
    const isLoading = loadingChildren.has(node.id);

    return (
      <div key={node.id}>
        <div
          className="flex cursor-pointer items-center gap-2 border-b border-border/50 px-4 py-3 transition-colors hover:bg-muted/40 last:border-b-0"
          style={{ paddingLeft: `${node.depth * 28 + 16}px` }}
          onClick={() => toggleExpand(node)}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
            ) : hasChildren ? (
              isExpanded ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </span>

          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/8 text-primary">
            {hasChildren ? (
              isExpanded ? (
                <FolderOpen className="h-3.5 w-3.5" />
              ) : (
                <Folder className="h-3.5 w-3.5" />
              )
            ) : (
              <FolderTree className="h-3.5 w-3.5" />
            )}
          </span>

          {childCount > 0 && (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 px-1.5 text-[10px] font-medium text-primary">
                  {childCount}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="text-xs">
                  {childCount}{" "}
                  {childCount === 1 ? sc("subcategory") : sc("subcategories")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}

          <span className="flex-1 truncate text-sm font-medium">
            {node.name}
          </span>

          {parentName && (
            <span className="hidden shrink-0 text-xs text-muted-foreground sm:inline">
              {parentName}
            </span>
          )}

          <div
            className="flex shrink-0 items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => {
                setEditingCategory(null);
                reset({ name: "", parentId: node.id });
                setSheetOpen(true);
              }}
              title={sc("addSubcategory")}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={() => {
                const cat = categories.find((c) => c.id === node.id);
                if (cat) {
                  setEditingCategory(cat);
                  reset({ name: cat.name, parentId: cat.parentId });
                  setSheetOpen(true);
                }
              }}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => {
                const cat = categories.find((c) => c.id === node.id);
                if (cat) setDeletingCategory(cat);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {hasChildren && isExpanded && (
          <div>
            {childCategories.map((child) => (
              <Fragment key={child.id}>{renderTreeNode(child)}</Fragment>
            ))}
          </div>
        )}
      </div>
    );
  }

  async function onSubmit(data: CreateCategoryFormData) {
    setSubmitting(true);
    const payload = {
      name: data.name,
      parentId: data.parentId || undefined,
    };

    if (isEditing && editingCategory) {
      const res = await updateCategory(editingCategory.id, payload);
      if (res.data) {
        setCategories((prev) =>
          prev.map((c) =>
            c.id === editingCategory.id
              ? { ...c, name: data.name, parentId: data.parentId ?? null }
              : c,
          ),
        );
        toast.success("Category updated");
        setSheetOpen(false);
      } else {
        toast.error(res.error || "Failed to update category");
      }
    } else {
      const res = await createCategory(payload);
      if (res.data) {
        const parent = data.parentId
          ? (categories.find((c) => c.id === data.parentId) ?? null)
          : null;
        const newCat: Category = {
          id: res.data.id,
          name: data.name,
          parentId: data.parentId ?? null,
          parent: parent ? { id: parent.id, name: parent.name } : null,
        };
        setCategories((prev) => {
          const normalized = normalizeParentId(newCat);
          const withNew = [normalized, ...prev];
          if (data.parentId) {
            return withNew.map((c) =>
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
          return withNew;
        });
        toast.success("Category created");
        setSheetOpen(false);
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
      setCategories((prev) => {
        const without = prev.filter((c) => c.id !== deletingCategory.id);
        if (deletingCategory.parentId) {
          return without.map((c) =>
            c.id === deletingCategory.parentId
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
        return without;
      });
      toast.success("Category deleted");
    } else {
      toast.error(res.error || "Failed to delete category");
    }
    setDeletingCategory(null);
  }
}

export default function CreateCategoryPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <CreateCategoryContent />
    </Suspense>
  );
}
