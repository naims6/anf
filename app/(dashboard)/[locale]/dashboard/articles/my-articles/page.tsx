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
  Calendar,
  Tag,
  ChevronRight
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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

      {/* Main Table Card */}
      <Card className="overflow-hidden border border-border/80 shadow-xs hover:shadow-md transition-all duration-300 rounded-2xl">
        <CardHeader className="border-b px-6 py-4 bg-muted/20">
          <CardTitle className="text-base font-semibold flex items-center justify-between">
            <span>{t("allArticles")}</span>
            {!loading && (
              <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full">
                {totalArticlesCount} {totalArticlesCount === 1 ? "Article" : "Articles"}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
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
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b bg-muted/40 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-4 min-w-[280px]">{t("titleCol")}</th>
                    <th className="px-6 py-4">{t("status")}</th>
                    <th className="px-6 py-4">{t("category")}</th>
                    <th className="px-6 py-4">{t("createdAt")}</th>
                    <th className="px-6 py-4">{t("publishedAt")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="group transition-all duration-200 hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/articles/${article.id}`}
                          className="flex items-center justify-between hover:opacity-95 transition-all duration-200"
                        >
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-200 line-clamp-1">
                              {article.title}
                            </p>
                          </div>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/0 group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" />
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {article.status === "Published" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-green-950/30 px-2.5 py-1 text-xs font-semibold text-green-700 dark:text-green-400 border border-green-200/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400 animate-pulse" />
                            {article.status}
                          </span>
                        ) : article.status === "Pending" ? (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 border border-amber-200/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse" />
                            {article.status}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950/30 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-400 border border-blue-200/50">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                            {article.status.replace(/_/g, " ")}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        <span className="inline-flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md text-xs font-semibold text-muted-foreground border border-border/80">
                          <Tag className="h-3 w-3 shrink-0 text-muted-foreground/60" />
                          {categoryMap[article.categoryId] || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap text-xs font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground/50" />
                          {formatDate(article.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap text-xs font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground/50" />
                          {formatDate(article.publishedAt)}
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
