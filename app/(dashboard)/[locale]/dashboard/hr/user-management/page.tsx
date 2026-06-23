"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { Search, Plus, MoreHorizontal } from "lucide-react";

const users = [
  { name: "Ahmed Hassan", email: "ahmed@example.com", role: "Admin", status: "Active" },
  { name: "Fatima Begum", email: "fatima@example.com", role: "Editor", status: "Active" },
  { name: "Mohammad Ali", email: "ali@example.com", role: "Viewer", status: "Inactive" },
  { name: "Ayesha Khatun", email: "ayesha@example.com", role: "Editor", status: "Active" },
  { name: "Hasan Mahmud", email: "hasan@example.com", role: "Viewer", status: "Active" },
];

export default function UserManagementPage() {
  const t = useTranslations("Dashboard.userManagement");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {t("addUser")}
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder={t("searchUsers")} className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">{t("allUsers")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">{t("role")}</th>
                  <th className="pb-3 font-medium">{t("status")}</th>
                  <th className="pb-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email} className="border-b last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-primary/10 text-xs text-primary">
                            {user.name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">{user.role}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.status === "Active" ? t("active") : t("inactive")}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
