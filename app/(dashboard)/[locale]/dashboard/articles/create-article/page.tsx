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
  Tag
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      setSelectedCatPath("");
      setSelectedColIds([]);
      fetchRootCategories();
    } else {
      toast.error(res.error || sa("createError"));
    }
    setSubmitting(false);
  };

  const [columns, setColumns] = useState<Category[][]>([]);
  const [selectedColIds, setSelectedColIds] = useState<string[]>([]);
  const [loadingColIdx, setLoadingColIdx] = useState<number | null>(null);
  const [loadingCat, setLoadingCat] = useState(false);
  const [selectedCatPath, setSelectedCatPath] = useState("");

  const fetchRootCategories = useCallback(async () => {
    setLoadingCat(true);
    const res = await getAllCategories();
    if (res.data) {
      setColumns([res.data]);
    } else {
      toast.error(res.error || "Failed to load categories");
    }
    setLoadingCat(false);
  }, []);

  useEffect(() => {
    fetchRootCategories();
  }, [fetchRootCategories]);

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
      const pathNames = newSelectedIds.map((id, idx) => {
        const found = idx === colIdx ? cat : columns[idx]?.find((c) => c.id === id);
        return found ? found.name : "";
      }).filter(Boolean);
      
      const path = pathNames.join(" > ");
      setSelectedCatPath(path);
      setValue("categoryId", cat.id, { shouldValidate: true });
    }
  }

  function handleChangeCategory() {
    setValue("categoryId", "", { shouldValidate: false });
    setSelectedCatPath("");
    setSelectedColIds([]);
    fetchRootCategories();
  }

  const hasSelectedCategory = !!categoryId;

  return (
    <div className="space-y-6">
      <PageHeader title={sa("title")} subtitle={sa("subtitle")} />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Form Details Card */}
            <div className="lg:col-span-5 space-y-6">
              <Card className="shadow-xs hover:shadow-md transition-all duration-300 border-border/80 rounded-2xl">
                <CardHeader className="border-b px-6 py-4 bg-muted/10">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <FileText className="h-4.5 w-4.5 text-primary" />
                    {sa("details")}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Provide the title, details, and assign a team for the article.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-semibold">
                      {sa("titleLabel")}
                    </Label>
                    <Input
                      id="title"
                      placeholder={sa("titlePlaceholder")}
                      className="h-10 border-border/80 focus-visible:ring-primary/20 rounded-xl"
                      {...register("title")}
                    />
                    {errors.title && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-semibold">
                      {sa("descriptionLabel")}
                    </Label>
                    <textarea
                      id="description"
                      placeholder={sa("descriptionPlaceholder")}
                      className="flex min-h-[140px] w-full rounded-xl border border-border/80 bg-transparent px-3 py-2 text-sm shadow-xs placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register("description")}
                    />
                    {errors.description && (
                      <p className="text-xs font-medium text-destructive">
                        {errors.description.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="team" className="text-sm font-semibold">
                      {sa("teamLabel")}
                    </Label>
                    <select
                      id="team"
                      className="flex h-10 w-full rounded-xl border border-border/80 bg-background px-3 py-2 text-sm shadow-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                      value={String(watch("teamId"))}
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
                      <p className="text-xs font-medium text-destructive">
                        {errors.teamId.message}
                      </p>
                    )}
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto px-6 h-10 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl font-medium"
                    >
                      {submitting && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {sa("submit")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Selector Card */}
            <div className="lg:col-span-7">
              <Card className="shadow-xs hover:shadow-md transition-all duration-300 border-border/80 rounded-2xl h-full flex flex-col">
                <CardHeader className="border-b px-6 py-4 bg-muted/10">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <Layers className="h-4.5 w-4.5 text-primary" />
                    Category Assignment
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Select a leaf category from the cascading selector columns.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4 flex-1">
                    {hasSelectedCategory ? (
                      <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/50 bg-emerald-50/30 p-4 text-sm transition-all duration-300">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                          <Check className="h-4.5 w-4.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                            Selected Path
                          </p>
                          <p className="text-sm font-semibold text-foreground/80 truncate mt-0.5">
                            {selectedCatPath}
                          </p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-8 shrink-0 text-xs text-primary hover:bg-primary/5 font-semibold"
                          onClick={handleChangeCategory}
                        >
                          {sa("changeCategory")}
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <Label className="text-sm font-semibold">
                          {sa("categoryLabel")}
                        </Label>

                        {loadingCat ? (
                          <div className="flex items-center justify-center py-16 border rounded-2xl bg-muted/5">
                            <Loader2 className="h-6 w-6 animate-spin text-primary" />
                          </div>
                        ) : columns.length === 0 ? (
                          <div className="py-16 text-center text-sm text-muted-foreground border rounded-2xl bg-muted/5">
                            <Layers className="mx-auto mb-2 h-10 w-10 text-muted-foreground/30" />
                            {sa("noCategories")}
                          </div>
                        ) : (
                          <div className="flex gap-3 border border-border/80 rounded-2xl overflow-x-auto p-3 bg-muted/10 h-[320px] max-w-full">
                            {columns.map((colItems, colIdx) => (
                              <div
                                key={colIdx}
                                className="flex-1 min-w-[190px] max-w-[230px] flex flex-col border border-border/60 bg-card rounded-xl overflow-hidden h-full shadow-xs transition-all duration-200"
                              >
                                <div className="bg-muted/40 border-b px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                  Level {colIdx + 1}
                                </div>
                                <div className="flex-1 overflow-y-auto divide-y divide-border/60 scrollbar-thin">
                                  {colItems.map((cat) => {
                                    const hasChildren = (cat._count?.childCategories ?? 0) > 0;
                                    const isSelected = selectedColIds[colIdx] === cat.id;
                                    return (
                                      <button
                                        key={cat.id}
                                        type="button"
                                        className={cn(
                                          "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-all duration-150 hover:bg-primary/5 hover:text-primary",
                                          isSelected && "bg-primary/10 text-primary font-bold border-r-2 border-primary"
                                        )}
                                        onClick={() => handleColumnCategoryClick(cat, colIdx)}
                                      >
                                        <span className="truncate pr-2 font-medium">{cat.name}</span>
                                        {hasChildren ? (
                                          <span className="flex items-center gap-1 shrink-0 text-[10px] text-muted-foreground">
                                            {(cat._count?.childCategories ?? 0) > 0 && (
                                              <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold text-primary">
                                                {cat._count?.childCategories}
                                              </span>
                                            )}
                                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60" />
                                          </span>
                                        ) : (
                                          <span className="text-[9px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded font-bold shrink-0">
                                            {sa("selectLeaf")}
                                          </span>
                                        )}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}

                            {loadingColIdx !== null && (
                              <div className="flex-1 min-w-[190px] max-w-[230px] flex flex-col border border-border/60 bg-card rounded-xl overflow-hidden h-full shadow-xs justify-center items-center">
                                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {errors.categoryId && (
                    <p className="text-xs font-semibold text-destructive mt-3 flex items-center gap-1">
                      <Tag className="h-3 w-3" />
                      {errors.categoryId.message}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
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
