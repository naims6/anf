"use client"

import { useState, useEffect, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { FileText } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    return new Date(dateStr).toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <SearchInput
        placeholder={t("search")}
        value={searchInput}
        onChange={setSearchInput}
      />

      <Card>
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base font-semibold">
            {t("allArticles")}
            {!loading && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({pagination?.total ?? articles.length})
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <TableSkeleton />
          ) : articles.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-10 w-10 text-muted-foreground/50" />}
              message={t("empty")}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3">{t("titleCol")}</th>
                    <th className="px-6 py-3">{t("status")}</th>
                    <th className="px-6 py-3">{t("category")}</th>
                    <th className="px-6 py-3">{t("createdAt")}</th>
                    <th className="px-6 py-3">{t("publishedAt")}</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="border-b last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/articles/${article.id}`}
                          className="hover:opacity-80 transition-opacity"
                        >
                          <p className="font-medium">{article.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {article.description}
                          </p>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            article.status === "Published"
                              ? "bg-green-100 text-green-700"
                              : article.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {article.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {categoryMap[article.categoryId] || "—"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                        {formatDate(article.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                        {formatDate(article.publishedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {pagination && (
        <Pagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          onPageChange={goToPage}
        />
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
