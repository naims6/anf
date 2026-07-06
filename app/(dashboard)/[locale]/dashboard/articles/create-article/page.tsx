"use client"

import { useState, Suspense } from "react"
import { useTranslations } from "next-intl"
import { toast } from "sonner"

import { createArticle } from "@/services/articleService"
import { ArticleForm, type ArticleFormFields } from "@/components/forms/ArticleForm"
import { PageHeader } from "@/components/shared/PageHeader"
import { PageFallback } from "@/components/shared/PageFallback"

function CreateArticleContent() {
  const t = useTranslations("Dashboard")
  const sa = (key: string) => t(`article_${key}`)

  const [submitting, setSubmitting] = useState(false)
  const [formKey, setFormKey] = useState(0)

  const onSubmit = async (data: ArticleFormFields) => {
    setSubmitting(true)
    const res = await createArticle(data)
    if (res.data) {
      toast.success(sa("createSuccess"))
      setFormKey((k) => k + 1)
    } else {
      toast.error(res.error || sa("createError"))
    }
    setSubmitting(false)
  }

  return (
    <div className="space-y-6">
      <PageHeader title={sa("title")} subtitle={sa("subtitle")} />
      <ArticleForm
        key={formKey}
        mode="create"
        defaultValues={{ title: "", description: "", categoryId: "" }}
        onSubmit={onSubmit}
        isSubmitting={submitting}
        submitLabel={sa("submit")}
      />
    </div>
  )
}

export default function CreateArticlePage() {
  return (
    <Suspense fallback={<PageFallback />}>
      <CreateArticleContent />
    </Suspense>
  )
}
