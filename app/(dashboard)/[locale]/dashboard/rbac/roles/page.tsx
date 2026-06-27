"use client"

import { useState, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { Search, Plus, Pencil, Trash2, Shield, ShieldCheck } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

import { roleSchema, type RoleFormData, type Role } from "@/lib/validations/roles"
import { permissions, initialRoles } from "@/lib/constants/roles"

export default function RolesPage() {
  const t = useTranslations("Dashboard.roles")
  const [roles, setRoles] = useState<Role[]>(initialRoles)
  const [search, setSearch] = useState("")
  const [sheetOpen, setSheetOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)

  const isEditing = editingRole !== null

  const form = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: { name: "", description: "", permissionIds: [] },
  })

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = form

  const selectedIds = watch("permissionIds")

  const filteredRoles = useMemo(
    () =>
      roles.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.description.toLowerCase().includes(search.toLowerCase()),
      ),
    [roles, search],
  )

  const openAddSheet = () => {
    setEditingRole(null)
    reset({ name: "", description: "", permissionIds: [] })
    setSheetOpen(true)
  }

  const openEditSheet = (role: Role) => {
    setEditingRole(role)
    reset({
      name: role.name,
      description: role.description,
      permissionIds: role.permissionIds,
    })
    setSheetOpen(true)
  }

  const onSubmit = (data: RoleFormData) => {
    if (isEditing) {
      setRoles((prev) =>
        prev.map((r) => (r.name === editingRole.name ? { ...data } : r)),
      )
    } else {
      setRoles((prev) => [...prev, data])
    }
    setSheetOpen(false)
  }

  const deleteRole = (name: string) => {
    setRoles((prev) => prev.filter((r) => r.name !== name))
  }

  const togglePermission = (id: number) => {
    const current = selectedIds || []
    setValue(
      "permissionIds",
      current.includes(id)
        ? current.filter((p) => p !== id)
        : [...current, id],
      { shouldValidate: true },
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button onClick={openAddSheet}>
          <Plus className="mr-2 h-4 w-4" />
          {t("addRole")}
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={t("searchRoles")}
          className="pl-9"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-base font-semibold">
            {t("allRoles")}
            <span className="ml-2 text-xs font-normal text-muted-foreground">
              ({filteredRoles.length})
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {filteredRoles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Shield className="mb-3 h-10 w-10 text-muted-foreground/50" />
              <p className="text-sm text-muted-foreground">{t("noRoles")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3">{t("name")}</th>
                    <th className="px-6 py-3">{t("description")}</th>
                    <th className="px-6 py-3">{t("permissions")}</th>
                    <th className="px-6 py-3 text-right">{t("actions")}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRoles.map((role) => (
                    <tr
                      key={role.name}
                      className="border-b last:border-0 transition-colors hover:bg-muted/30"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                            <ShieldCheck className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{role.name}</span>
                        </div>
                      </td>
                      <td className="max-w-xs truncate px-6 py-4 text-muted-foreground">
                        {role.description}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {role.permissionIds.map((id) => {
                            const perm = permissions.find((p) => p.id === id)
                            return perm ? (
                              <span
                                key={id}
                                className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                              >
                                {perm.name}
                              </span>
                            ) : null
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => openEditSheet(role)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            onClick={() => deleteRole(role.name)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
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

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col sm:max-w-md"
        >
          <SheetHeader className="border-b px-6 py-5">
            <SheetTitle className="text-lg">
              {isEditing ? t("editRole") : t("addRole")}
            </SheetTitle>
            <SheetDescription>
              {isEditing ? t("editRoleDesc") : t("addRoleDesc")}
            </SheetDescription>
          </SheetHeader>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-1 flex-col justify-between"
          >
            <div className="space-y-6 overflow-y-auto px-6 py-5">
              <div className="space-y-2">
                <Label htmlFor="name">{t("nameLabel")}</Label>
                <Input
                  id="name"
                  placeholder={t("namePlaceholder")}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("descLabel")}</Label>
                <textarea
                  id="description"
                  rows={3}
                  placeholder={t("descPlaceholder")}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-xs text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>{t("permissions")}</Label>
                  {errors.permissionIds && (
                    <p className="text-xs text-destructive">
                      {errors.permissionIds.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  {permissions.map((perm) => (
                    <label
                      key={perm.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-accent",
                        (selectedIds || []).includes(perm.id) &&
                          "border-primary/50 bg-primary/5",
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={(selectedIds || []).includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      {perm.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <SheetFooter className="border-t px-6 py-4">
              <SheetClose asChild>
                <Button variant="outline" type="button">
                  {t("cancel")}
                </Button>
              </SheetClose>
              <Button type="submit">
                {isEditing ? t("update") : t("save")}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}
