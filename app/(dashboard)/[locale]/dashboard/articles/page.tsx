import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArticlesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Articles</h1>
        <p className="text-muted-foreground">Manage your articles and content.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Article list and management will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
