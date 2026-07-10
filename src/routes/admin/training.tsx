import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { GraduationCap, BookOpen, Users, CheckCircle, Plus, Search } from "lucide-react";

export const Route = createFileRoute("/admin/training")({ component: AdminTraining });

const courses = [
  { id: "TR-01", title: "Security Awareness Training", category: "Compliance", enrolled: 248, completed: 180, due: "2026-07-20", mandatory: true },
  { id: "TR-02", title: "Leadership Essentials", category: "Leadership", enrolled: 42, completed: 28, due: "2026-08-31", mandatory: false },
  { id: "TR-03", title: "React & TypeScript Advanced", category: "Technical", enrolled: 35, completed: 12, due: "2026-09-15", mandatory: false },
  { id: "TR-04", title: "POSH Awareness", category: "Compliance", enrolled: 248, completed: 220, due: "2026-07-31", mandatory: true },
  { id: "TR-05", title: "Effective Communication", category: "Soft Skills", enrolled: 80, completed: 55, due: "2026-08-15", mandatory: false },
  { id: "TR-06", title: "Data Privacy & GDPR", category: "Compliance", enrolled: 248, completed: 195, due: "2026-07-25", mandatory: true },
];

const categoryColor: Record<string, string> = {
  Compliance: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
  Leadership: "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  Technical: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  "Soft Skills": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
};

function AdminTraining() {
  const [search, setSearch] = useState("");

  const filtered = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );

  const totalEnrolled = courses.reduce((a, c) => a + c.enrolled, 0);
  const totalCompleted = courses.reduce((a, c) => a + c.completed, 0);

  return (
    <PortalShell
      role="admin"
      title="Training"
      subtitle="Manage courses, enrollments, and compliance training"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Add Course</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Total Courses" value={String(courses.length)} icon={BookOpen} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Total Enrollments" value={String(totalEnrolled)} icon={Users} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Completions" value={String(totalCompleted)} tone="up" icon={CheckCircle} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Mandatory Courses" value={String(courses.filter((c) => c.mandatory).length)} icon={GraduationCap} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search courses…" className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Course</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Completion</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Due Date</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Mandatory</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3 font-medium">{c.title}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${categoryColor[c.category]}`} variant="outline">{c.category}</Badge>
                  </td>
                  <td className="px-4 py-3 w-48">
                    <div className="flex items-center gap-2">
                      <Progress value={(c.completed / c.enrolled) * 100} className="h-1.5 flex-1" />
                      <span className="text-xs font-medium w-16 shrink-0">{c.completed}/{c.enrolled}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{c.due}</td>
                  <td className="px-4 py-3">
                    {c.mandatory
                      ? <Badge className="text-xs bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400" variant="outline">Yes</Badge>
                      : <Badge variant="outline" className="text-xs">No</Badge>}
                  </td>
                  <td className="px-4 py-3">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
