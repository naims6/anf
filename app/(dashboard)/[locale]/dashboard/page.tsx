import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Activity, TrendingUp } from "lucide-react"
import { useTranslations } from "next-intl"

const stats = [
  { icon: Users, value: "24", labelKey: "totalEmployees" },
  { icon: FileText, value: "48", labelKey: "articles" },
  { icon: Activity, value: "12.4k", labelKey: "pageViews" },
  { icon: TrendingUp, value: "89%", labelKey: "engagement" },
]

const recentActivities = [
  { title: "New employee onboarded", desc: "Ahmed Hassan joined HR", time: "2h ago" },
  { title: "Article published", desc: "Understanding Zakat Calculation", time: "5h ago" },
  { title: "Profile updated", desc: "HR settings were modified", time: "1d ago" },
]

const quickLinks = ["manageEmployees", "createArticle", "viewReports", "settings"]

export default function DashboardPage() {
  const t = useTranslations("Dashboard.overview")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.labelKey}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{t(stat.labelKey)}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {t("fromLastMonth", { change: "+12%" })}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">{t("recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((a, i) => (
                <div key={i} className="flex items-start gap-3 rounded-lg border p-3">
                  <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{a.title}</p>
                    <p className="text-xs text-muted-foreground">{a.desc}</p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">{t("quickLinks")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickLinks.map((key) => (
              <div
                key={key}
                className="rounded-lg border p-3 text-sm font-medium hover:bg-accent cursor-pointer"
              >
                {t(key)}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
