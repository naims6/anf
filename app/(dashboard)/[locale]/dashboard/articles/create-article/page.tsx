"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  Loader2,
  FileText,
  ChevronRight,
  Check,
  Layers,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

import {
  createArticleSchema,
  type CreateArticleFormData,
} from "@/lib/validations/articles";
import { createArticle } from "@/services/articleService";
import { getAllCategories } from "@/services/categoryService";
import { getAllTeams } from "@/services/teamService";
import type { Category } from "@/lib/validations/categories";

import { PageHeader } from "@/components/shared/PageHeader";
import { PageFallback } from "@/components/shared/PageFallback";

function CreateArticleContent() {
  const t = useTranslations("Dashboard");
  const sa = (key: string, vars?: Record<string, string | number | Date>) =>
    t(`article_${key}`, vars);

  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const referenceFetched = useRef(false);

  const form = useForm<CreateArticleFormData>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      teamId: 0,
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const categoryId = watch("categoryId");

  const ensureReferenceData = useCallback(async () => {
    if (referenceFetched.current) return;
    setLoading(true);
    const [teamsRes] = await Promise.all([getAllTeams()]);
    if (teamsRes.data) setTeams(teamsRes.data);
    else toast.error(teamsRes.error || "Failed to load teams");
    referenceFetched.current = true;
    setLoading(false);
  }, []);

  useEffect(() => {
    ensureReferenceData();
  }, [ensureReferenceData]);

  const onSubmit = async (data: CreateArticleFormData) => {
    setSubmitting(true);
    const res = await createArticle(data);
    if (res.data) {
      toast.success(sa("createSuccess"));
      form.reset({
        title: "",
        description: "",
        categoryId: "",
        teamId: 0,
      });
      setCurrentCategories([]);
      setBreadcrumb([]);
      setSelectedCatPath("");
      fetchRootCategories();
    } else {
      toast.error(res.error || sa("createError"));
    }
    setSubmitting(false);
  };

  const [currentCategories, setCurrentCategories] = useState<Category[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [loadingCat, setLoadingCat] = useState(false);
  const [selectedCatPath, setSelectedCatPath] = useState("");

  const fetchRootCategories = useCallback(async () => {
    setLoadingCat(true);
    const res = await getAllCategories();
    if (res.data) setCurrentCategories(res.data);
    else toast.error(res.error || "Failed to load categories");
    setLoadingCat(false);
  }, []);

  useEffect(() => {
    fetchRootCategories();
  }, [fetchRootCategories]);

  function handleCategoryClick(cat: Category) {
    const hasChildren = (cat._count?.childCategories ?? 0) > 0;

    if (hasChildren) {
      setBreadcrumb((prev) => [...prev, { id: cat.id, name: cat.name }]);
      setLoadingCat(true);
      getAllCategories(cat.id).then((res) => {
        if (res.data) setCurrentCategories(res.data);
        else toast.error(res.error || "Failed to load subcategories");
        setLoadingCat(false);
      });
    } else {
      const path = [...breadcrumb.map((b) => b.name), cat.name].join(" > ");
      setSelectedCatPath(path);
      setValue("categoryId", cat.id, { shouldValidate: true });
    }
  }

  function handleBreadcrumbClick(index: number) {
    const newBreadcrumb = index < 0 ? [] : breadcrumb.slice(0, index + 1);
    setBreadcrumb(newBreadcrumb);
    setLoadingCat(true);
    const parentId =
      newBreadcrumb.length > 0
        ? newBreadcrumb[newBreadcrumb.length - 1].id
        : undefined;
    getAllCategories(parentId).then((res) => {
      if (res.data) setCurrentCategories(res.data);
      else toast.error(res.error || "Failed to load categories");
      setLoadingCat(false);
    });
  }

  function handleChangeCategory() {
    setValue("categoryId", "", { shouldValidate: false });
    setSelectedCatPath("");
    setBreadcrumb([]);
    fetchRootCategories();
  }

  const hasSelectedCategory = !!categoryId;

  return (
    <div className="space-y-6">
      <PageHeader title={sa("title")} subtitle={sa("subtitle")} />

      <Card className="shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <FileText className="h-4 w-4 text-muted-foreground" />
            {sa("details")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto max-w-2xl space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="title">{sa("titleLabel")}</Label>
                <Input
                  id="title"
                  placeholder={sa("titlePlaceholder")}
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{sa("descriptionLabel")}</Label>
                <textarea
                  id="description"
                  placeholder={sa("descriptionPlaceholder")}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{sa("categoryLabel")}</Label>

                {hasSelectedCategory ? (
                  <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2.5 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    <span className="flex-1 truncate text-muted-foreground">
                      {selectedCatPath}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-7 shrink-0 text-xs"
                      onClick={handleChangeCategory}
                    >
                      {sa("changeCategory")}
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    {breadcrumb.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 border-b px-3 py-2 text-xs text-muted-foreground">
                        <button
                          type="button"
                          className="hover:text-foreground transition-colors"
                          onClick={() => handleBreadcrumbClick(-1)}
                        >
                          {sa("allCategories")}
                        </button>
                        {breadcrumb.map((item, idx) => (
                          <span
                            key={item.id}
                            className="flex items-center gap-1"
                          >
                            <ChevronRight className="h-3 w-3" />
                            <button
                              type="button"
                              className="hover:text-foreground transition-colors"
                              onClick={() => handleBreadcrumbClick(idx)}
                            >
                              {item.name}
                            </button>
                          </span>
                        ))}
                      </div>
                    )}

                    {loadingCat ? (
                      <div className="flex items-center justify-center py-8">
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      </div>
                    ) : currentCategories.length === 0 ? (
                      <div className="py-8 text-center text-sm text-muted-foreground">
                        <Layers className="mx-auto mb-2 h-8 w-8 text-muted-foreground/50" />
                        {sa("noCategories")}
                      </div>
                    ) : (
                      <div className="divide-y">
                        {currentCategories.map((cat) => {
                          const hasChildren =
                            (cat._count?.childCategories ?? 0) > 0;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              className={cn(
                                "flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/50",
                                !hasChildren && "cursor-pointer",
                                hasChildren && "cursor-pointer",
                              )}
                              onClick={() => handleCategoryClick(cat)}
                            >
                              <span className="flex-1 font-medium">
                                {cat.name}
                              </span>
                              {hasChildren ? (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  {(cat._count?.childCategories ?? 0) > 0 && (
                                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                                      {cat._count?.childCategories}
                                    </span>
                                  )}
                                  <ChevronRight className="h-3.5 w-3.5" />
                                </span>
                              ) : (
                                <span className="text-[10px] text-muted-foreground">
                                  {sa("selectLeaf")}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {errors.categoryId && (
                  <p className="text-xs text-destructive">
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{sa("teamLabel")}</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={String(form.watch("teamId"))}
                  onChange={(e) =>
                    setValue("teamId", Number(e.target.value), {
                      shouldValidate: true,
                    })
                  }
                >
                  <option value="0" disabled>
                    {sa("teamPlaceholder")}
                  </option>
                  {teams.map((team) => (
                    <option key={team.id} value={String(team.id)}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {errors.teamId && (
                  <p className="text-xs text-destructive">
                    {errors.teamId.message}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button type="submit" disabled={submitting}>
                  {submitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {sa("submit")}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function CreateArticlePage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <CreateArticleContent />
    </Suspense>
  );
}
