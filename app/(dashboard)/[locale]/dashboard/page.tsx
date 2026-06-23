import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Activity, TrendingUp } from "lucide-react"

const stats = [
  { title: "Total Employees", value: "24", icon: Users, change: "+12%" },
  { title: "Articles", value: "48", icon: FileText, change: "+8%" },
  { title: "Page Views", value: "12.4k", icon: Activity, change: "+23%" },
  { title: "Engagement", value: "89%", icon: TrendingUp, change: "+5%" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back. Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { title: "New employee onboarded", desc: "Ahmed Hassan joined HR", time: "2h ago" },
                { title: "Article published", desc: "Understanding Zakat Calculation", time: "5h ago" },
                { title: "Profile updated", desc: "HR settings were modified", time: "1d ago" },
              ].map((a, i) => (
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
            <CardTitle className="text-base">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Manage Employees", "Create Article", "View Reports", "Settings"].map(
              (label) => (
                <div
                  key={label}
                  className="rounded-lg border p-3 text-sm font-medium hover:bg-accent cursor-pointer"
                >
                  {label}
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
