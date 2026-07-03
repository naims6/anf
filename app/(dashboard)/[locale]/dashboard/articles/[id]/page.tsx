"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Layers,
  Pencil,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Tag,
  Users,
  MessageSquare,
  Shield,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { ArticleDetail } from "@/lib/validations/articles";
import { getArticleById, deleteArticle } from "@/services/articleService";

import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ArticleDetailPage() {
  const t = useTranslations("Dashboard.articleDetail");
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await getArticleById(id);
      if (res.data) {
        setArticle(res.data);
      } else {
        toast.error(res.error || "Failed to load article");
      }
      setLoading(false);
    }
    load();
  }, [id]);

  const onDeleteConfirm = async () => {
    if (!article) return;
    const res = await deleteArticle(article.id);
    if (res.success) {
      toast.success(t("deleteSuccess"));
      setDeleteDialogOpen(false);
      router.push("/dashboard/articles/my-articles");
    } else {
      toast.error(res.error || t("deleteError"));
    }
  };

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Published:
        "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/50",
      Pending:
        "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/50",
      Under_Review:
        "bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200/50",
    };
    const dotColors: Record<string, string> = {
      Published: "bg-green-600 dark:bg-green-400",
      Pending: "bg-amber-600 dark:bg-amber-400",
      Under_Review: "bg-blue-600 dark:bg-blue-400",
    };
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${colors[status] || "bg-gray-100 text-gray-600"}`}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full animate-pulse",
            dotColors[status] || "bg-gray-400",
          )}
        />
        {status.replace(/_/g, " ")}
      </span>
    );
  };

  const reviewStatusIcon = (status: string) => {
    if (status === "Approved")
      return (
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
      );
    if (status === "Rejected")
      return <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    return <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-52 rounded-2xl" />
          <Skeleton className="h-52 rounded-2xl md:col-span-2" />
        </div>
        <Skeleton className="h-64 rounded-2xl" />
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
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="w-fit hover:bg-muted rounded-xl transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl shadow-xs hover:bg-muted transition-all"
            onClick={() => router.push(`/dashboard/articles/${id}/edit`)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            {t("edit")}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="rounded-xl shadow-xs hover:bg-destructive/95 transition-all"
            onClick={() => setDeleteDialogOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {t("delete")}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Summary Card */}
        <Card className="lg:col-span-1 border border-border/80 shadow-xs rounded-2xl overflow-hidden">
          <div className="h-2 bg-gradient-to-r from-primary/50 to-primary" />
          <CardContent className="flex flex-col items-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
              <FileText className="h-8 w-8" />
            </div>
            <h2 className="text-center text-xl font-bold tracking-tight text-foreground/90 px-4">
              {article.title}
            </h2>
            <code className="mt-2 text-[10px] bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground font-semibold select-all">
              /{article.slug}
            </code>
            <div className="mt-4">{statusBadge(article.status)}</div>
          </CardContent>
        </Card>

        {/* Right Column: Metadata Details */}
        <div className="space-y-6 lg:col-span-2">
          <Card className="border border-border/80 shadow-xs rounded-2xl overflow-hidden">
            <CardHeader className="border-b px-6 py-4 bg-muted/10">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <Shield className="h-4 w-4 text-primary" />
                {t("details")}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 p-6 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  {t("category")}
                </p>
                <p className="text-sm font-semibold text-foreground/80 bg-muted/40 p-2 rounded-xl border border-border/40">
                  {article.category.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {t("author")}
                </p>
                <p className="text-sm font-semibold text-foreground/80 bg-muted/40 p-2 rounded-xl border border-border/40">
                  {article.author.name}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {t("createdAt")}
                </p>
                <p className="text-sm font-semibold text-foreground/80 bg-muted/40 p-2 rounded-xl border border-border/40">
                  {formatDate(article.createdAt!)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {t("updatedAt")}
                </p>
                <p className="text-sm font-semibold text-foreground/80 bg-muted/40 p-2 rounded-xl border border-border/40">
                  {formatDate(article.updatedAt!)}
                </p>
              </div>
              <div className="sm:col-span-2 space-y-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1">
                  <MessageSquare className="h-3 w-3" />
                  {t("description")}
                </p>
                <div className="text-sm text-foreground/80 leading-relaxed bg-muted/20 p-4 rounded-xl border border-border/60 min-h-[80px]">
                  {article.description}
                </div>
              </div>
              {article.articleTeams.length > 0 && (
                <div className="sm:col-span-2 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {t("teams")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {article.articleTeams.map((team) => (
                      <span
                        key={team.id ?? `team-${team.name}`}
                        className="inline-flex items-center rounded-xl bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-semibold text-primary"
                      >
                        {team.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timeline and Stages Reviews */}
          {article.articleReviews.length > 0 && (
            <Card className="border border-border/80 shadow-xs rounded-2xl overflow-hidden">
              <CardHeader className="border-b px-6 py-4 bg-muted/10">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                  <Layers className="h-4 w-4 text-primary" />
                  {t("reviews")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative pl-6 border-l-2 border-border/80 space-y-8">
                  {article.articleReviews.map((review) => (
                    <div
                      key={review.id}
                      className="relative group animate-in fade-in slide-in-from-left-3"
                    >
                      {/* Timeline dot */}
                      <span className="absolute -left-[37px] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-card border-2 border-border/80 shadow-xs transition-colors group-hover:border-primary/40">
                        {reviewStatusIcon(review.status)}
                      </span>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-foreground/80">
                            {t("reviewStage")} {review.reviewStage}
                          </p>
                          <p className="text-xs text-muted-foreground font-medium mt-0.5">
                            {t("by")} {review.reviewer.name}
                          </p>
                        </div>
                        <div className="text-left sm:text-right shrink-0">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              review.status === "Approved"
                                ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/50"
                                : review.status === "Rejected"
                                  ? "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-200/50"
                                  : "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/50"
                            }`}
                          >
                            {review.status}
                          </span>
                          <p className="mt-1 text-[10px] text-muted-foreground font-semibold">
                            {formatDateTime(review.createdAt)}
                          </p>
                        </div>
                      </div>

                      {review.comments && (
                        <div className="mt-2.5 text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-xl border border-border/40 w-fit max-w-full italic">
                          &quot;{review.comments}&quot;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <DeleteAlertDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title={t("deleteTitle")}
        description={t("deleteConfirm")}
        confirmLabel={t("delete")}
        cancelLabel={t("cancel")}
        onConfirm={onDeleteConfirm}
      />
    </div>
  );
}
