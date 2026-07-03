"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  FileText,
  Layers,
  Loader2,
  Check,
  ChevronRight,
  Tag,
  Save,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { ArticleDetail, UpdateArticleFormData } from "@/lib/validations/articles";
import type { Category } from "@/lib/validations/categories";
import {
  getArticleById,
  updateArticle,
} from "@/services/articleService";
import { getAllCategories } from "@/services/categoryService";
import { getAllTeams } from "@/services/teamService";
import { updateArticleSchema } from "@/lib/validations/articles";
import { PageFallback } from "@/components/shared/PageFallback";

function EditArticleContent() {
  const t = useTranslations("Dashboard.articleDetail");
  const tCreate = useTranslations("Dashboard");
  const sa = (key: string) => tCreate(`article_${key}`);

  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([]);

  // Cascading Category Selector states
  const [columns, setColumns] = useState<Category[][]>([]);
  const [selectedColIds, setSelectedColIds] = useState<string[]>([]);
  const [loadingColIdx, setLoadingColIdx] = useState<number | null>(null);
  const [loadingCat, setLoadingCat] = useState(false);
  const [selectedCatPath, setSelectedCatPath] = useState("");

  const referenceFetched = useRef(false);

  const form = useForm<UpdateArticleFormData>({
    resolver: zodResolver(updateArticleSchema),
    defaultValues: { title: "", description: "", categoryId: "", teamId: 0 },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = form;

  const categoryId = watch("categoryId");

  // Load article data
  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getArticleById(id);
      if (res.data) {
        setArticle(res.data);
        reset({
          title: res.data.title,
          description: res.data.description,
          categoryId: res.data.categoryId,
          teamId: res.data.articleTeams[0]?.id ?? 0,
        });
        // Set initial selected category path
        setSelectedCatPath(res.data.category.name);
      } else {
        toast.error(res.error || "Failed to load article");
      }
      setLoading(false);
    }
    load();
  }, [id, reset]);

  // Load reference data (teams + root categories)
  const fetchRootCategories = useCallback(async () => {
    setLoadingCat(true);
    const res = await getAllCategories();
    if (res.data) setColumns([res.data]);
    else toast.error(res.error || "Failed to load categories");
    setLoadingCat(false);
  }, []);

  const ensureReferenceData = useCallback(async () => {
    if (referenceFetched.current) return;
    const [teamsRes] = await Promise.all([getAllTeams()]);
    if (teamsRes.data) setTeams(teamsRes.data);
    else toast.error(teamsRes.error || "Failed to load teams");
    referenceFetched.current = true;
    await fetchRootCategories();
  }, [fetchRootCategories]);

  useEffect(() => {
    ensureReferenceData();
  }, [ensureReferenceData]);

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
      const pathNames = newSelectedIds
        .map((selId, idx) => {
          const found =
            idx === colIdx ? cat : columns[idx]?.find((c) => c.id === selId);
          return found ? found.name : "";
        })
        .filter(Boolean);
      setSelectedCatPath(pathNames.join(" > "));
      setValue("categoryId", cat.id, { shouldValidate: true });
    }
  }

  function handleChangeCategory() {
    setValue("categoryId", "", { shouldValidate: false });
    setSelectedCatPath("");
    setSelectedColIds([]);
    fetchRootCategories();
  }

  const onSubmit = async (data: UpdateArticleFormData) => {
    if (!article) return;
    setSubmitting(true);
    const res = await updateArticle(article.id, data);
    if (res.data) {
      toast.success(t("updateSuccess"));
      router.push(`/dashboard/articles/${article.id}`);
    } else {
      toast.error(res.error || t("updateError"));
    }
    setSubmitting(false);
  };

  const hasSelectedCategory = !!categoryId;

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Skeleton className="h-96 rounded-2xl" />
          </div>
          <div className="lg:col-span-7">
            <Skeleton className="h-96 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-4">
          <FileText className="h-7 w-7" />
        </div>
        <p className="text-muted-foreground font-semibold">{t("notFound")}</p>
        <Button
          variant="outline"
          className="mt-4 rounded-xl shadow-xs"
          onClick={() => router.back()}
        >
          {t("goBack")}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-fit hover:bg-muted rounded-xl transition-all"
            onClick={() => router.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("back")}
          </Button>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground/90">
              {t("editTitle")}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {t("editDesc")}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Form Fields */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="shadow-xs hover:shadow-md transition-all duration-300 border-border/80 rounded-2xl">
              <CardHeader className="border-b px-6 py-4 bg-muted/10">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <FileText className="h-4 w-4 text-primary" />
                  {sa("details")}
                </CardTitle>
                <CardDescription className="text-xs">
                  Update the title, description, and team assignment.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-5">
                {/* Title */}
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

                {/* Description */}
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

                {/* Team */}
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

                {/* Submit */}
                <div className="flex justify-end pt-4 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="rounded-xl"
                  >
                    {t("cancel")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="px-6 h-10 shadow-sm hover:shadow-md transition-all duration-300 rounded-xl font-medium"
                  >
                    {submitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="mr-2 h-4 w-4" />
                    )}
                    {t("save")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Cascading Category Selector */}
          <div className="lg:col-span-7">
            <Card className="shadow-xs hover:shadow-md transition-all duration-300 border-border/80 rounded-2xl h-full flex flex-col">
              <CardHeader className="border-b px-6 py-4 bg-muted/10">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Layers className="h-4 w-4 text-primary" />
                  Category Assignment
                </CardTitle>
                <CardDescription className="text-xs">
                  Select a leaf category using the cascading columns below.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  {hasSelectedCategory ? (
                    <div className="flex items-center gap-3 rounded-2xl border border-emerald-200/50 bg-emerald-50/30 p-4 text-sm transition-all duration-300">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
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
                        <div className="flex gap-3 border border-border/80 rounded-2xl overflow-x-auto p-3 bg-muted/10 h-[320px]">
                          {columns.map((colItems, colIdx) => (
                            <div
                              key={colIdx}
                              className="flex-1 min-w-[190px] max-w-[230px] flex flex-col border border-border/60 bg-card rounded-xl overflow-hidden h-full shadow-xs transition-all duration-200 animate-in fade-in slide-in-from-right-3"
                            >
                              <div className="bg-muted/40 border-b px-3.5 py-2 text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">
                                Level {colIdx + 1}
                              </div>
                              <div className="flex-1 overflow-y-auto divide-y divide-border/60">
                                {colItems.map((cat) => {
                                  const hasChildren =
                                    (cat._count?.childCategories ?? 0) > 0;
                                  const isSelected =
                                    selectedColIds[colIdx] === cat.id;
                                  return (
                                    <button
                                      key={cat.id}
                                      type="button"
                                      className={cn(
                                        "flex w-full items-center justify-between px-3 py-2.5 text-left text-sm transition-all duration-150 hover:bg-primary/5 hover:text-primary",
                                        isSelected &&
                                          "bg-primary/10 text-primary font-bold border-r-2 border-primary",
                                      )}
                                      onClick={() =>
                                        handleColumnCategoryClick(cat, colIdx)
                                      }
                                    >
                                      <span className="truncate pr-2 font-medium">
                                        {cat.name}
                                      </span>
                                      {hasChildren ? (
                                        <span className="flex items-center gap-1 shrink-0 text-[10px] text-muted-foreground">
                                          {(cat._count?.childCategories ?? 0) >
                                            0 && (
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
    </div>
  );
}

export default function EditArticlePage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <EditArticleContent />
    </Suspense>
  );
}
