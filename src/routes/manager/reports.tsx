import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart2, Download, FileText, TrendingUp, Users, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/reports")({ component: ManagerReports });

const weeklyData = [
  { day: "Mon", tasks: 4, hours: 42, attendance: 8 },
  { day: "Tue", tasks: 6, hours: 44, attendance: 7 },
  { day: "Wed", tasks: 3, hours: 40, attendance: 8 },
  { day: "Thu", tasks: 7, hours: 45, attendance: 8 },
  { day: "Fri", tasks: 5, hours: 38, attendance: 6 },
];

const monthlyData = [
  { week: "W1", tasks: 22, leaves: 2, performance: 78 },
  { week: "W2", tasks: 28, leaves: 1, performance: 82 },
  { week: "W3", tasks: 19, leaves: 3, performance: 75 },
  { week: "W4", tasks: 31, leaves: 1, performance: 88 },
];

const timeline = [
  { date: "Jul 10", employee: "Aisha Rahman", event: "Completed API rate limiting task", type: "task" },
  { date: "Jul 09", employee: "Kenji Tanaka", event: "Applied for Annual Leave", type: "leave" },
  { date: "Jul 08", employee: "Alex Morgan", event: "Submitted attendance correction", type: "attendance" },
  { date: "Jul 07", employee: "Marcus Wei", event: "Updated Design System progress to 40%", type: "project" },
  { date: "Jul 05", employee: "Nina Patel", event: "Completed Onboarding Flow project", type: "project" },
  { date: "Jul 04", employee: "Alex Morgan", event: "1:1 meeting — discussed auth v2 blockers", type: "meeting" },
  { date: "Jul 03", employee: "Aisha Rahman", event: "Joined team — onboarding started", type: "milestone" },
];

const typeColor: Record<string, string> = {
  task: "bg-emerald-500",
  leave: "bg-amber-500",
  attendance: "bg-blue-500",
  project: "bg-purple-500",
  meeting: "bg-teal-500",
  milestone: "bg-rose-500",
};

const typeBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  task: "default",
  leave: "secondary",
  attendance: "outline",
  project: "secondary",
  meeting: "outline",
  milestone: "destructive",
};

function ManagerReports() {
  const team = employees.filter((e) => e.department === "Engineering");

  return (
    <PortalShell
      role="manager"
      title="Reports"
      subtitle="Weekly, monthly summaries and employee timelines"
      actions={<Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Tasks Completed (Month)" value="100" delta="+12% vs last month" tone="up" icon={BarChart2} />
        <StatCard label="Avg. Team Hours/Week" value="41.8h" delta="Within target" tone="up" icon={TrendingUp} />
        <StatCard label="Team Headcount" value={String(team.length)} icon={Users} />
      </div>

      <Tabs defaultValue="weekly">
        <TabsList>
          <TabsTrigger value="weekly"><Calendar className="h-4 w-4 mr-2" /> Weekly Report</TabsTrigger>
          <TabsTrigger value="monthly"><FileText className="h-4 w-4 mr-2" /> Monthly Report</TabsTrigger>
          <TabsTrigger value="timeline"><Users className="h-4 w-4 mr-2" /> Employee Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Tasks Completed — This Week</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Bar dataKey="tasks" name="Tasks" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Team Hours — This Week</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Line type="monotone" dataKey="hours" name="Hours" stroke="hsl(217 91% 60%)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="monthly">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Monthly Task & Leave Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Legend />
                      <Bar dataKey="tasks" name="Tasks" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="leaves" name="Leaves" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Performance Trend</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                      <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Line type="monotone" dataKey="performance" name="Performance %" stroke="hsl(160 84% 39%)" strokeWidth={2} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader><CardTitle>Employee Activity Timeline</CardTitle></CardHeader>
            <CardContent>
              <div className="relative space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4 pb-6 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`h-3 w-3 rounded-full mt-1 shrink-0 ${typeColor[item.type]}`} />
                      {i < timeline.length - 1 && <div className="w-px flex-1 bg-border mt-1" />}
                    </div>
                    <div className="flex-1 min-w-0 pb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-medium text-sm">{item.employee}</span>
                        <Badge variant={typeBadge[item.type]} className="text-xs capitalize">{item.type}</Badge>
                        <span className="text-xs text-muted-foreground ml-auto">{item.date}</span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5">{item.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
