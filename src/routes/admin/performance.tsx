import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Target, Star, Users, Plus, Search } from "lucide-react";
import { goals, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/performance")({ component: AdminPerformance });

const reviewCycles = [
  { id: "RC-01", name: "Q3 2026 Review", period: "Jul–Sep 2026", status: "Active", participants: 248, completed: 42 },
  { id: "RC-02", name: "Mid-Year 2026", period: "Jan–Jun 2026", status: "Completed", participants: 240, completed: 240 },
  { id: "RC-03", name: "Annual 2025", period: "Jan–Dec 2025", status: "Completed", participants: 220, completed: 218 },
];

const ratings = [
  { label: "Exceptional (5)", count: 18, color: "bg-emerald-500" },
  { label: "Exceeds (4)", count: 62, color: "bg-teal-500" },
  { label: "Meets (3)", count: 110, color: "bg-blue-500" },
  { label: "Below (2)", count: 28, color: "bg-amber-500" },
  { label: "Unsatisfactory (1)", count: 8, color: "bg-rose-500" },
];

const statusColor: Record<string, string> = {
  "On Track": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  "At Risk": "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
  Active: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Completed: "bg-muted text-muted-foreground",
};

type Employee = typeof employees[0];

function getPerformanceData(emp: Employee) {
  const seed = emp.id.charCodeAt(2) % 10;
  return {
    rating: (3 + seed * 0.3).toFixed(1),
    ratingLevel: seed > 6 ? "Exceptional" : seed > 4 ? "Exceeds" : seed > 2 ? "Meets" : "Below",
    goalsCompleted: 3 + (seed % 3),
    goalsTotal: 5,
    kpis: [
      { name: "Delivery", progress: 75 + (seed * 3), target: 100 },
      { name: "Quality", progress: 80 + (seed * 2), target: 100 },
      { name: "Collaboration", progress: 70 + (seed * 4), target: 100 },
    ],
    feedback: `Strong performer with ${seed > 5 ? "excellent" : "good"} technical skills and team collaboration.`,
    reviewDate: "2026-07-10",
    nextReviewDate: "2026-10-10",
  };
}

function PerformanceDetailDialog({ emp, open, onClose }: { emp: Employee | null; open: boolean; onClose: () => void }) {
  const [section, setSection] = useState<"overview" | "goals" | "kpis">("overview");
  if (!emp) return null;
  const perf = getPerformanceData(emp);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{emp.name}</span>
            <Badge variant="outline" className="text-xs">{emp.jobTitle}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 border-b pb-2">
          <Button size="sm" variant={section === "overview" ? "default" : "outline"} onClick={() => setSection("overview")}>Overview</Button>
          <Button size="sm" variant={section === "goals" ? "default" : "outline"} onClick={() => setSection("goals")}>Goals</Button>
          <Button size="sm" variant={section === "kpis" ? "default" : "outline"} onClick={() => setSection("kpis")}>KPIs</Button>
        </div>

        {section === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-blue-600">{perf.rating}</div>
                <div className="text-xs text-muted-foreground mt-1">Rating / 5</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-emerald-600">{perf.ratingLevel}</div>
                <div className="text-xs text-muted-foreground mt-1">Level</div>
              </div>
              <div className="rounded-lg border p-3 text-center">
                <div className="text-2xl font-bold text-amber-600">{perf.goalsCompleted}/{perf.goalsTotal}</div>
                <div className="text-xs text-muted-foreground mt-1">Goals Completed</div>
              </div>
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="text-sm font-semibold">Review Information</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Last Review:</span> <span className="font-medium ml-2">{perf.reviewDate}</span></div>
                <div><span className="text-muted-foreground">Next Review:</span> <span className="font-medium ml-2">{perf.nextReviewDate}</span></div>
                <div><span className="text-muted-foreground">Department:</span> <span className="font-medium ml-2">{emp.department}</span></div>
                <div><span className="text-muted-foreground">Manager:</span> <span className="font-medium ml-2">{emp.manager}</span></div>
              </div>
            </div>

            <div className="rounded-lg border p-4">
              <div className="text-sm font-semibold mb-2">Feedback</div>
              <p className="text-sm text-muted-foreground">{perf.feedback}</p>
            </div>
          </div>
        )}

        {section === "goals" && (
          <div className="space-y-3">
            {[
              { title: "Complete Q3 project deliverables", status: "Completed", progress: 100 },
              { title: "Improve code review turnaround", status: "On Track", progress: 75 },
              { title: "Mentor junior team members", status: "On Track", progress: 60 },
              { title: "Reduce bug escape rate", status: "At Risk", progress: 45 },
              { title: "Contribute to design system", status: "On Track", progress: 80 },
            ].map((g, i) => (
              <div key={i} className="rounded-lg border p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{g.title}</span>
                  <Badge className={`text-xs ${statusColor[g.status]}`} variant="outline">{g.status}</Badge>
                </div>
                <Progress value={g.progress} className="h-1.5" />
                <div className="text-xs text-muted-foreground mt-1">{g.progress}% complete</div>
              </div>
            ))}
          </div>
        )}

        {section === "kpis" && (
          <div className="space-y-4">
            {perf.kpis.map((kpi) => (
              <div key={kpi.name} className="rounded-lg border p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">{kpi.name}</span>
                  <span className="text-sm font-semibold">{kpi.progress}/{kpi.target}</span>
                </div>
                <Progress value={(kpi.progress / kpi.target) * 100} className="h-2" />
                <div className="text-xs text-muted-foreground mt-2">{((kpi.progress / kpi.target) * 100).toFixed(0)}% of target achieved</div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AdminPerformance() {
  const [tab, setTab] = useState("cycles");
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [selected, setSelected] = useState<Employee | null>(null);

  const depts = ["all", ...Array.from(new Set(employees.map((e) => e.department)))];

  const filtered = employees.filter((e) =>
    (deptFilter === "all" || e.department === deptFilter) &&
    (e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PortalShell
      role="admin"
      title="Performance"
      subtitle="Review cycles, KPIs, goals, and ratings"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />New Review Cycle</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Active Cycle" value="Q3 2026" icon={TrendingUp} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Reviews Completed" value="42/248" delta="17% done" icon={Star} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Goals Tracked" value={String(goals.length)} icon={Target} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Avg Rating" value="3.6 / 5" tone="up" icon={Users} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="cycles">Review Cycles</TabsTrigger>
          <TabsTrigger value="employees">Employee Performance</TabsTrigger>
          <TabsTrigger value="goals">Goals & KPIs</TabsTrigger>
          <TabsTrigger value="ratings">Rating Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="cycles">
          <div className="space-y-3">
            {reviewCycles.map((rc) => (
              <Card key={rc.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{rc.name}</span>
                        <Badge className={`text-xs ${statusColor[rc.status]}`} variant="outline">{rc.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{rc.period}</div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Completion</span>
                          <span className="font-medium">{rc.completed}/{rc.participants}</span>
                        </div>
                        <Progress value={(rc.completed / rc.participants) * 100} className="h-1.5" />
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button variant="outline" size="sm">View</Button>
                      {rc.status === "Active" && <Button size="sm">Manage</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center gap-3 pb-3">
              <CardTitle className="text-sm font-semibold">Employee Performance</CardTitle>
              <div className="flex flex-wrap gap-2 md:ml-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search name or ID…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-52" />
                </div>
                <Select value={deptFilter} onValueChange={setDeptFilter}>
                  <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                  <SelectContent>{depts.map((d) => <SelectItem key={d} value={d}>{d === "all" ? "All Departments" : d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold">Employee</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">Department</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">Rating</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">Level</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">Goals</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => {
                    const perf = getPerformanceData(e);
                    return (
                      <tr key={e.id} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="px-4 py-3">
                          <div className="font-medium text-sm">{e.name}</div>
                          <div className="text-xs text-muted-foreground">{e.id}</div>
                        </td>
                        <td className="px-4 py-3 text-sm">{e.department}</td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-blue-600">{perf.rating}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">{perf.ratingLevel}</Badge>
                        </td>
                        <td className="px-4 py-3 text-xs">{perf.goalsCompleted}/{perf.goalsTotal}</td>
                        <td className="px-4 py-3">
                          <Button variant="ghost" size="sm" onClick={() => setSelected(e)}>View</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Goal</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Owner</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Progress</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Due</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {goals.map((g) => (
                    <tr key={g.title} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{g.title}</td>
                      <td className="px-4 py-3 text-muted-foreground">{g.owner}</td>
                      <td className="px-4 py-3 w-40">
                        <div className="flex items-center gap-2">
                          <Progress value={g.progress} className="h-1.5 flex-1" />
                          <span className="text-xs font-medium w-8">{g.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{g.due}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs ${statusColor[g.status]}`} variant="outline">{g.status}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ratings">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Rating Distribution — Q3 2026</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ratings.map((r) => (
                <div key={r.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">{r.label}</span>
                    <span className="font-medium">{r.count} employees</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className={`h-full rounded-full ${r.color}`} style={{ width: `${(r.count / 226) * 100}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PerformanceDetailDialog emp={selected} open={!!selected} onClose={() => setSelected(null)} />
    </PortalShell>
  );
}
