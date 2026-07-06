"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import {
  FileText,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar
} from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/dashboard/stat-card"

import { useDebouncedSearch } from "@/hooks/use-debounced-search"
import type { Article, PaginationMeta } from "@/lib/validations/articles"
import type { Category } from "@/lib/validations/categories"
import { getMyArticles } from "@/services/articleService"
import { getAllCategories } from "@/services/categoryService"

import { SearchInput } from "@/components/shared/SearchInput"
import { PageHeader } from "@/components/shared/PageHeader"
import { TableSkeleton } from "@/components/shared/TableSkeleton"
import { EmptyState } from "@/components/shared/EmptyState"
import { Pagination } from "@/components/shared/Pagination"
import { PageFallback } from "@/components/shared/PageFallback"

function MyArticlesContent() {
  const t = useTranslations("Dashboard.myArticles")
  const tSidebar = useTranslations("Dashboard.sidebar")
  const searchParams = useSearchParams()

  const page = Number(searchParams.get("page")) || 1
  const searchTerm = searchParams.get("searchTerm") || ""
  const limit = 10

  const [searchInput, setSearchInput, updateParams] = useDebouncedSearch("searchTerm")

  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState<PaginationMeta | null>(null)
  const [categoryMap, setCategoryMap] = useState<Record<string, string>>({})

  const fetchArticles = useCallback(async () => {
    setLoading(true)
    const res = await getMyArticles({ page, limit, searchTerm })
    if (res.data) {
      setArticles(res.data)
      if (res.pagination) setPagination(res.pagination)
    } else {
      toast.error(res.error || "Failed to load articles")
    }
    setLoading(false)
  }, [page, limit, searchTerm])

  const fetchCategories = useCallback(async () => {
    const res = await getAllCategories()
    if (res.data) {
      const map: Record<string, string> = {}
      res.data.forEach((cat: Category) => {
        map[cat.id] = cat.name
      })
      setCategoryMap(map)
    } else {
      console.error("Failed to load categories:", res.error)
    }
  }, [])

  useEffect(() => {
    fetchArticles()
  }, [fetchArticles])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const goToPage = (p: number) => {
    updateParams({ page: String(p) })
  }

  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return "—"
    return new Date(dateStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "")

  // Count statistics based on current page list
  const totalArticlesCount = pagination?.total ?? articles.length
  const publishedArticlesCount = articles.filter((a) => a.status === "Published").length
  const pendingArticlesCount = articles.filter((a) => a.status === "Pending").length
  const reviewArticlesCount = articles.filter((a) => a.status === "Under_Review").length

  return (
    <div className="space-y-8">
      {/* Header section with Action to Add Article */}
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
        action={
          <Link href="/dashboard/articles/create-article">
            <Button className="shadow-sm hover:shadow-md hover:bg-primary/95 transition-all duration-300 rounded-xl">
              <Plus className="mr-2 h-4 w-4" />
              {tSidebar("addArticle")}
            </Button>
          </Link>
        }
      />

      {/* KPI Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={t("allArticles")}
          value={totalArticlesCount}
          icon={<FileText className="h-5 w-5" />}
          description="Total articles written"
        />
        <StatCard
          title="Published (Page)"
          value={publishedArticlesCount}
          icon={<CheckCircle className="h-5 w-5" />}
          description="Live on the platform"
          className="hover:border-green-500/30"
        />
        <StatCard
          title="Pending (Page)"
          value={pendingArticlesCount}
          icon={<Clock className="h-5 w-5" />}
          description="Awaiting review"
          className="hover:border-amber-500/30"
        />
        <StatCard
          title="Under Review (Page)"
          value={reviewArticlesCount}
          icon={<AlertCircle className="h-5 w-5" />}
          description="In review stages"
          className="hover:border-blue-500/30"
        />
      </div>

      {/* Search Filter Input Container */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-card p-4 rounded-xl border border-border/60">
        <div className="flex-1 max-w-sm">
          <SearchInput
            placeholder={t("search")}
            value={searchInput}
            onChange={setSearchInput}
          />
        </div>
      </div>

      {/* Article Cards Grid */}
      <div>
        {loading ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <EmptyState
            icon={<FileText className="h-12 w-12 text-muted-foreground/40" />}
            message={t("empty")}
            action={
              <Link href="/dashboard/articles/create-article">
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Plus className="mr-1.5 h-3.5 w-3.5" />
                  {tSidebar("addArticle")}
                </Button>
              </Link>
            }
          />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {articles.map((article) => {
              const statusStyles = {
                Published: { bar: "bg-green-500", badge: "text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 border-green-200/50 ring-green-500/20", pulse: "bg-green-500" },
                Pending: { bar: "bg-amber-500", badge: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200/50 ring-amber-500/20", pulse: "bg-amber-500" },
                Under_Review: { bar: "bg-blue-500", badge: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200/50 ring-blue-500/20", pulse: "bg-blue-500" },
              }[article.status] || { bar: "bg-slate-500", badge: "text-slate-700 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/30 border-slate-200/50 ring-slate-500/20", pulse: "bg-slate-500" }

              return (
                <Link
                  key={article.id}
                  href={`/dashboard/articles/${article.id}`}
                  className="group block"
                >
                  <Card className="relative overflow-hidden border border-border/80 shadow-xs hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-xl h-full">
                    {/* Top accent strip */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${statusStyles.bar}`} />

                    <CardContent className="p-5 pt-6">
                      {/* Status badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`inline-flex items-center gap-1.5 rounded-md ${statusStyles.badge} px-2 py-1 text-[11px] font-semibold border`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${statusStyles.pulse} animate-pulse`} />
                          {article.status === "Under_Review" ? "Under Review" : article.status}
                        </span>
                        <FileText className="h-4 w-4 text-muted-foreground/20" />
                      </div>

                      {/* Title */}
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2 mb-2 leading-snug">
                        {article.title}
                      </h3>

                      {/* Description excerpt */}
                      <p className="text-xs text-muted-foreground/60 line-clamp-2 mb-5 leading-relaxed">
                        {article.description ? stripHtml(article.description) : "No description"}
                      </p>

                      {/* Footer meta */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/40 text-[11px] text-muted-foreground/60">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {formatDate(article.createdAt)}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3 w-3" />
                          {article.publishedAt ? formatDate(article.publishedAt) : "Draft"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        )}
      </div>

      {/* Pagination wrapper for spacing */}
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
    </div>
  )
}

export default function MyArticlesPage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <MyArticlesContent />
    </Suspense>
  )
}
