import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCog } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "next-intl"

const links = [
  { icon: Users, href: "/dashboard/hr/employees", labelKey: "employees", descKey: "employeesDesc" },
  { icon: UserCog, href: "/dashboard/hr/user-management", labelKey: "userManagement", descKey: "userManagementDesc" },
]

export default function HRPage() {
  const t = useTranslations("Dashboard.hr")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <Link key={link.href} href={link.href}>
              <Card className="transition-colors hover:bg-accent cursor-pointer">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-base">{t(link.labelKey)}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t(link.descKey)}</p>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
