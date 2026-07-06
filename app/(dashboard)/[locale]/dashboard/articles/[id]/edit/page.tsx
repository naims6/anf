"use client"

import { useState, useEffect, Suspense } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { toast } from "sonner"
import { ArrowLeft, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { ArticleDetail } from "@/lib/validations/articles"
import { getArticleById, updateArticle } from "@/services/articleService"
import { ArticleForm, type ArticleFormFields } from "@/components/forms/ArticleForm"
import { PageFallback } from "@/components/shared/PageFallback"

function EditArticleContent() {
  const t = useTranslations("Dashboard.articleDetail")
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formDefaults, setFormDefaults] = useState<ArticleFormFields>({
    title: "", description: "", categoryId: "",
  })
  const [initialCategoryPath, setInitialCategoryPath] = useState("")

  useEffect(() => {
    async function load() {
      setLoading(true)
      const res = await getArticleById(id)
      if (res.data) {
        setArticle(res.data)
        setFormDefaults({
          title: res.data.title,
          description: res.data.description,
          categoryId: res.data.categoryId,
        })
        setInitialCategoryPath(res.data.category.name)
      } else {
        toast.error(res.error || "Failed to load article")
      }
      setLoading(false)
    }
    load()
  }, [id])

  const onSubmit = async (data: ArticleFormFields) => {
    if (!article) return
    setSubmitting(true)
    const res = await updateArticle(article.id, {
      ...data,
      teamId: article.articleTeams[0]?.id ?? 0,
    })
    if (res.data) {
      toast.success(t("updateSuccess"))
      router.push(`/dashboard/articles/${article.id}`)
    } else {
      toast.error(res.error || t("updateError"))
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-24 rounded-xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    )
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
    )
  }

  return (
    <div className="space-y-6">
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
            <p className="text-sm text-muted-foreground mt-0.5">{t("editDesc")}</p>
          </div>
        </div>
      </div>

      <ArticleForm
        mode="edit"
        defaultValues={formDefaults}
        initialCategoryPath={initialCategoryPath}
        onSubmit={onSubmit}
        isSubmitting={submitting}
        submitLabel={t("save")}
        onCancel={() => router.back()}
        cancelLabel={t("cancel")}
      />
    </div>
  )
}

export default function EditArticlePage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <EditArticleContent />
    </Suspense>
  )
}
