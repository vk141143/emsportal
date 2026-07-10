import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, FileText, BarChart2, Users, Calendar, DollarSign, TrendingUp, Building2 } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import { attendanceTrend, monthlyHeadcount, departmentSplit, leaveRequests } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/reports")({ component: HRReports });

const COLORS = ["hsl(217 91% 60%)", "hsl(160 84% 39%)", "hsl(38 92% 50%)", "hsl(280 84% 60%)", "hsl(340 82% 52%)", "hsl(200 84% 50%)"];

const payrollTrend = [
  { month: "Jan", cost: 8.2 }, { month: "Feb", cost: 8.4 }, { month: "Mar", cost: 8.6 },
  { month: "Apr", cost: 8.9 }, { month: "May", cost: 9.1 }, { month: "Jun", cost: 9.4 }, { month: "Jul", cost: 9.7 },
];

const perfData = [
  { label: "Outstanding", value: 42 }, { label: "Exceeds", value: 210 },
  { label: "Meets", value: 685 }, { label: "Needs Improvement", value: 84 },
];

function ExportBar({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-4 bg-muted/30">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <div>
          <div className="font-medium text-sm">{title}</div>
          <div className="text-xs text-muted-foreground">Generated on demand</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> PDF</Button>
        <Button size="sm"><Download className="h-4 w-4 mr-1" /> Excel</Button>
      </div>
    </div>
  );
}

function FilterBar() {
  return (
    <div className="flex flex-wrap gap-3 items-end mb-4">
      <div className="space-y-1">
        <Label className="text-xs">From</Label>
        <Input type="date" defaultValue="2026-07-01" className="w-36" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">To</Label>
        <Input type="date" defaultValue="2026-07-31" className="w-36" />
      </div>
      <div className="space-y-1">
        <Label className="text-xs">Department</Label>
        <Select defaultValue="all">
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            {["Engineering", "Sales", "Marketing", "Design"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline">Apply Filters</Button>
    </div>
  );
}

function HRReports() {
  return (
    <PortalShell
      role="hr"
      title="Reports"
      subtitle="Analytics and exportable reports across all HR modules"
      actions={
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export PDF</Button>
          <Button><Download className="h-4 w-4 mr-2" /> Export Excel</Button>
        </div>
      }
    >
      <Tabs defaultValue="attendance">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="attendance"><Calendar className="h-4 w-4 mr-1" /> Attendance</TabsTrigger>
          <TabsTrigger value="payroll"><DollarSign className="h-4 w-4 mr-1" /> Payroll</TabsTrigger>
          <TabsTrigger value="leave"><Calendar className="h-4 w-4 mr-1" /> Leave</TabsTrigger>
          <TabsTrigger value="employee"><Users className="h-4 w-4 mr-1" /> Employee</TabsTrigger>
          <TabsTrigger value="department"><Building2 className="h-4 w-4 mr-1" /> Department</TabsTrigger>
          <TabsTrigger value="performance"><TrendingUp className="h-4 w-4 mr-1" /> Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="attendance">
          <FilterBar />
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Weekly Attendance Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Legend />
                      <Bar dataKey="present" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="absent" fill="hsl(0 84% 60%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="leave" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <ExportBar title="Attendance Report — July 2026" />
          </div>
        </TabsContent>

        <TabsContent value="payroll">
          <FilterBar />
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Payroll Cost Trend ($M)</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={payrollTrend}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Line type="monotone" dataKey="cost" stroke="hsl(340 82% 52%)" strokeWidth={2} dot />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <ExportBar title="Payroll Summary Report — July 2026" />
          </div>
        </TabsContent>

        <TabsContent value="leave">
          <FilterBar />
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Leave Requests Summary</CardTitle></CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-3 mb-4">
                  {[
                    { label: "Total Requests", value: leaveRequests.length, color: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300" },
                    { label: "Approved", value: leaveRequests.filter(r => r.status === "Approved").length, color: "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300" },
                    { label: "Pending", value: leaveRequests.filter(r => r.status === "Pending").length, color: "bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300" },
                  ].map((s) => (
                    <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
                      <div className="text-2xl font-bold">{s.value}</div>
                      <div className="text-sm font-medium mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
                {leaveRequests.map((r) => (
                  <div key={r.id} className="flex items-center justify-between rounded-lg border p-3 text-sm">
                    <div className="font-medium">{r.employee}</div>
                    <div className="text-muted-foreground">{r.type} · {r.days}d</div>
                    <Badge variant={r.status === "Approved" ? "default" : r.status === "Rejected" ? "destructive" : "secondary"}>{r.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            <ExportBar title="Leave Report — July 2026" />
          </div>
        </TabsContent>

        <TabsContent value="employee">
          <FilterBar />
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Hires vs Exits</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyHeadcount}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Legend />
                      <Bar dataKey="hires" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="exits" fill="hsl(340 82% 52%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <ExportBar title="Employee Report — July 2026" />
          </div>
        </TabsContent>

        <TabsContent value="department">
          <FilterBar />
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Headcount by Department</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={departmentSplit} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                        {departmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <ExportBar title="Department Report — July 2026" />
          </div>
        </TabsContent>

        <TabsContent value="performance">
          <FilterBar />
          <div className="space-y-4">
            <Card>
              <CardHeader><CardTitle>Performance Rating Distribution</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={perfData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" tick={{ fontSize: 12 }} />
                      <YAxis type="category" dataKey="label" width={130} tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Bar dataKey="value" fill="hsl(217 91% 60%)" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <ExportBar title="Performance Report — Q3 2026" />
          </div>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
