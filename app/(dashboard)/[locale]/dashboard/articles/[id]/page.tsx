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
  BookOpen,
  Eye,
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
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-48 rounded-2xl" />
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
    <div className="space-y-6 max-w-4xl mx-auto">
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

      {/* Facebook-style Post Card */}
      <Card className="border border-border/80 shadow-xs rounded-2xl overflow-hidden">
        {/* Post header */}
        <div className="h-2 bg-gradient-to-r from-primary/40 to-primary" />
        <CardContent className="p-0">
          {/* Author & metadata row */}
          <div className="flex items-center gap-3 px-6 pt-5 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <User className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">
                {article.author.name}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDate(article.createdAt!)}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                {statusBadge(article.status)}
              </div>
            </div>
            <code className="hidden sm:inline-flex text-[10px] bg-muted px-2.5 py-0.5 rounded-full text-muted-foreground font-semibold select-all">
              /{article.slug}
            </code>
          </div>

          {/* Title */}
          <div className="px-6 pb-3">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground leading-tight">
              {article.title}
            </h1>
          </div>

          {/* Description (post body) */}
          <div className="px-6 pb-5">
            <div
              className="text-sm leading-relaxed text-foreground/85 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:mb-2 [&_h2]:mt-4 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:mb-1.5 [&_h3]:mt-3 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_pre]:bg-muted [&_pre]:p-3 [&_pre]:rounded-lg [&_pre]:text-sm [&_pre]:overflow-x-auto [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_blockquote]:border-l-4 [&_blockquote]:border-primary/30 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_hr]:my-4 [&_hr]:border-border/80"
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          </div>

          {/* Post actions / stats bar */}
          <div className="flex items-center gap-4 px-6 py-3 border-t border-border/60 bg-muted/10">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="font-semibold">{article.category.name}</span>
            </div>
            {article.articleTeams.length > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Users className="h-3.5 w-3.5" />
                <span className="font-semibold">
                  {article.articleTeams.map((t) => t.name).join(", ")}
                </span>
              </div>
            )}
            <div className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground">
              <Eye className="h-3.5 w-3.5" />
              <span className="font-semibold">{article.status.replace(/_/g, " ")}</span>
            </div>
          </div>
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
