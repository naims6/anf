"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import {
  ArrowLeft,
  Calendar,
  User,
  FileText,
  Layers,
  Pencil,
  Trash2,
  Loader2,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"

import type {
  ArticleDetail,
  UpdateArticleFormData,
} from "@/lib/validations/articles"
import type { Category } from "@/lib/validations/categories"
import {
  getArticleById,
  updateArticle,
  deleteArticle,
} from "@/services/articleService"
import { getAllCategories } from "@/services/categoryService"
import { getAllTeams } from "@/services/teamService"
import { updateArticleSchema } from "@/lib/validations/articles"

import { DeleteAlertDialog } from "@/components/shared/DeleteAlertDialog"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function ArticleDetailPage() {
  const t = useTranslations("Dashboard.articleDetail")
  const { id } = useParams<{ id: string }>()
  const router = useRouter()

  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [editSheetOpen, setEditSheetOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [teams, setTeams] = useState<{ id: number; name: string }[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCatPath, setSelectedCatPath] = useState("")
  const [currentCatList, setCurrentCatList] = useState<Category[]>([])
  const [catBreadcrumb, setCatBreadcrumb] = useState<{ id: string; name: string }[]>([])
  const [loadingCat, setLoadingCat] = useState(false)
  const referenceFetched = useRef(false)

  const editForm = useForm<UpdateArticleFormData>({
    resolver: zodResolver(updateArticleSchema),
    defaultValues: { title: "", description: "", categoryId: "", teamId: 0 },
  })

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    reset: resetEdit,
    setValue: setEditValue,
    watch: watchEdit,
    formState: { errors: editErrors },
  } = editForm

  useEffect(() => {
    async function load() {
      setLoading(true)
      const res = await getArticleById(id)
      if (res.data) {
        setArticle(res.data)
      } else {
        toast.error(res.error || "Failed to load article")
      }
      setLoading(false)
    }
    load()
  }, [id])

  const ensureReferenceData = useCallback(async () => {
    if (referenceFetched.current) return
    const [teamsRes, catRes] = await Promise.all([
      getAllTeams(),
      getAllCategories(),
    ])
    if (teamsRes.data) setTeams(teamsRes.data)
    else toast.error(teamsRes.error || "Failed to load teams")
    if (catRes.data) {
      setCategories(catRes.data)
      setCurrentCatList(catRes.data)
    }
    referenceFetched.current = true
  }, [])

  const openEditSheet = () => {
    if (!article) return
    ensureReferenceData()
    const pathSegments: string[] = []
    const findPath = (cats: Category[], targetId: string, parents: string[]): string[] | null => {
      for (const cat of cats) {
        if (cat.id === targetId) return [...parents, cat.name]
        if (cat.parent?.id) {
          const result = findPath(categories, cat.parent.id, [...parents, cat.parent.name])
          if (result) return result
        }
      }
      return null
    }
    const path = findPath(categories, article.categoryId, [])
    setSelectedCatPath(path ? path.join(" > ") : article.category.name)
    setEditValue("categoryId", article.categoryId)
    resetEdit({
      title: article.title,
      description: article.description,
      categoryId: article.categoryId,
      teamId: article.articleTeams[0]?.id ?? 0,
    })
    setEditSheetOpen(true)
  }

  const onEditSubmit = async (data: UpdateArticleFormData) => {
    if (!article) return
    setSubmitting(true)
    const res = await updateArticle(article.id, data)
    if (res.data) {
      toast.success(t("updateSuccess"))
      setEditSheetOpen(false)
      const refreshed = await getArticleById(id)
      if (refreshed.data) setArticle(refreshed.data)
    } else {
      toast.error(res.error || t("updateError"))
    }
    setSubmitting(false)
  }

  const onDeleteConfirm = async () => {
    if (!article) return
    const res = await deleteArticle(article.id)
    if (res.success) {
      toast.success(t("deleteSuccess"))
      setDeleteDialogOpen(false)
      router.push("/dashboard/articles/my-articles")
    } else {
      toast.error(res.error || t("deleteError"))
    }
  }

  function handleCategoryClick(cat: Category) {
    const hasChildren = (cat._count?.childCategories ?? 0) > 0
    if (hasChildren) {
      setCatBreadcrumb((prev) => [...prev, { id: cat.id, name: cat.name }])
      setLoadingCat(true)
      getAllCategories(cat.id).then((res) => {
        if (res.data) setCurrentCatList(res.data)
        setLoadingCat(false)
      })
    } else {
      const path = [...catBreadcrumb.map((b) => b.name), cat.name].join(" > ")
      setSelectedCatPath(path)
      setEditValue("categoryId", cat.id, { shouldValidate: true })
    }
  }

  function handleBreadcrumbClick(index: number) {
    const newBreadcrumb = index < 0 ? [] : catBreadcrumb.slice(0, index + 1)
    setCatBreadcrumb(newBreadcrumb)
    setLoadingCat(true)
    const parentId = newBreadcrumb.length > 0 ? newBreadcrumb[newBreadcrumb.length - 1].id : undefined
    getAllCategories(parentId).then((res) => {
      if (res.data) setCurrentCatList(res.data)
      setLoadingCat(false)
    })
  }

  function handleChangeCategory() {
    setEditValue("categoryId", "", { shouldValidate: false })
    setSelectedCatPath("")
    setCatBreadcrumb([])
    getAllCategories().then((res) => {
      if (res.data) setCurrentCatList(res.data)
    })
  }

  const selectedCatId = watchEdit("categoryId")

  const statusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Published: "bg-green-100 text-green-700",
      Pending: "bg-yellow-100 text-yellow-700",
      Under_Review: "bg-blue-100 text-blue-700",
    }
    return (
      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${colors[status] || "bg-gray-100 text-gray-600"}`}>
        {status.replace(/_/g, " ")}
      </span>
    )
  }

  const reviewStatusIcon = (status: string) => {
    if (status === "Approved") return <CheckCircle className="h-4 w-4 text-green-600" />
    if (status === "Rejected") return <XCircle className="h-4 w-4 text-red-600" />
    return <Clock className="h-4 w-4 text-yellow-600" />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-32" />
        <div className="grid gap-6 md:grid-cols-3">
          <Skeleton className="h-48 rounded-xl" />
          <Skeleton className="h-48 rounded-xl md:col-span-2" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-muted-foreground">{t("notFound")}</p>
        <Button variant="outline" className="mt-4" onClick={() => router.back()}>
          {t("goBack")}
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("back")}
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={openEditSheet}>
            <Pencil className="mr-2 h-4 w-4" />
            {t("edit")}
          </Button>
          <Button variant="destructive" size="sm" onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            {t("delete")}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center py-8">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-center text-xl font-semibold">{article.title}</h2>
            <p className="mt-1 text-xs text-muted-foreground">/{article.slug}</p>
            <div className="mt-3">{statusBadge(article.status)}</div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <Card>
            <CardHeader className="border-b px-6 py-4">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-muted-foreground" />
                {t("details")}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("category")}
                </p>
                <p className="mt-1 text-sm font-medium">{article.category.name}</p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("author")}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <User className="h-3.5 w-3.5 text-muted-foreground" />
                  {article.author.name}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("createdAt")}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDate(article.createdAt!)}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("updatedAt")}
                </p>
                <p className="mt-1 flex items-center gap-1.5 text-sm font-medium">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                  {formatDate(article.updatedAt!)}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {t("description")}
                </p>
                <p className="mt-1 text-sm">{article.description}</p>
              </div>
              {article.articleTeams.length > 0 && (
                <div className="sm:col-span-2">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {t("teams")}
                  </p>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {article.articleTeams.map((team) => (
                      <span
                        key={team.id ?? `team-${team.name}`}
                        className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                      >
                        {team.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {article.articleReviews.length > 0 && (
            <Card>
              <CardHeader className="border-b px-6 py-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  {t("reviews")}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {article.articleReviews.map((review) => (
                    <div key={review.id} className="px-6 py-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {reviewStatusIcon(review.status)}
                          <div>
                            <p className="text-sm font-medium">
                              {t("reviewStage")} {review.reviewStage}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {t("by")} {review.reviewer.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              review.status === "Approved"
                                ? "bg-green-100 text-green-700"
                                : review.status === "Rejected"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {review.status}
                          </span>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {formatDateTime(review.createdAt)}
                          </p>
                        </div>
                      </div>
                      {review.comments && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {review.comments}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="text-lg">{t("editTitle")}</SheetTitle>
            <SheetDescription>{t("editDesc")}</SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmitEdit(onEditSubmit)}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-6 py-5">
              <div className="space-y-2">
                <Label htmlFor="edit-title">{t("titleLabel")}</Label>
                <Input
                  id="edit-title"
                  placeholder={t("titlePlaceholder")}
                  {...registerEdit("title")}
                />
                {editErrors.title && (
                  <p className="text-xs text-destructive">{editErrors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">{t("descLabel")}</Label>
                <textarea
                  id="edit-description"
                  placeholder={t("descPlaceholder")}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  {...registerEdit("description")}
                />
                {editErrors.description && (
                  <p className="text-xs text-destructive">{editErrors.description.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t("categoryLabel")}</Label>
                {selectedCatId ? (
                  <div className="flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2.5 text-sm">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
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
                      {t("changeCategory")}
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    {catBreadcrumb.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1 border-b px-3 py-2 text-xs text-muted-foreground">
                        <button
                          type="button"
                          className="hover:text-foreground transition-colors"
                          onClick={() => handleBreadcrumbClick(-1)}
                        >
                          {t("allCategories")}
                        </button>
                        {catBreadcrumb.map((item, idx) => (
                          <span key={item.id} className="flex items-center gap-1">
                            <span>&gt;</span>
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
                    ) : currentCatList.length === 0 ? (
                      <div className="py-8 text-center text-sm text-muted-foreground">
                        {t("noCategories")}
                      </div>
                    ) : (
                      <div className="divide-y">
                        {currentCatList.map((cat) => {
                          const hasChildren = (cat._count?.childCategories ?? 0) > 0
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              className="flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors hover:bg-muted/50"
                              onClick={() => handleCategoryClick(cat)}
                            >
                              <span className="flex-1 font-medium">{cat.name}</span>
                              {hasChildren ? (
                                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                  {(cat._count?.childCategories ?? 0) > 0 && (
                                    <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] text-primary">
                                      {cat._count?.childCategories}
                                    </span>
                                  )}
                                  <span>&gt;</span>
                                </span>
                              ) : (
                                <span className="text-[10px] text-muted-foreground">
                                  {t("selectLeaf")}
                                </span>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )}
                {editErrors.categoryId && (
                  <p className="text-xs text-destructive">{editErrors.categoryId.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>{t("teamLabel")}</Label>
                <select
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={String(watchEdit("teamId"))}
                  onChange={(e) =>
                    setEditValue("teamId", Number(e.target.value), {
                      shouldValidate: true,
                    })
                  }
                >
                  <option value="0" disabled>
                    {t("teamPlaceholder")}
                  </option>
                  {teams.map((team) => (
                    <option key={team.id} value={String(team.id)}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {editErrors.teamId && (
                  <p className="text-xs text-destructive">{editErrors.teamId.message}</p>
                )}
              </div>
            </div>

            <SheetFooter className="shrink-0 border-t px-6 py-4">
              <SheetClose asChild>
                <Button variant="outline" type="button" disabled={submitting}>
                  {t("cancel")}
                </Button>
              </SheetClose>
              <Button type="submit" disabled={submitting}>
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t("save")}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

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
  )
}
