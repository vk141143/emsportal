import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  Users, UserCheck, UserX, Clock, Plane, UserPlus, Briefcase, FileText,
  Package, Cpu, CheckSquare, Cake, Award, CalendarDays, AlertCircle,
  TrendingDown, Plus, Mail, Building2, Gift, FileCheck, Megaphone,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import {
  employees, monthlyHeadcount, attendanceTrend, departmentSplit,
  leaveRequests, recentActivities, auditLogs,
} from "@/lib/mock-data";

export const Route = createFileRoute("/admin/dashboard")({ component: AdminDashboard });

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe", "#ede9fe"];

const payrollTrend = [
  { month: "Jan", gross: 4.2, net: 3.4 }, { month: "Feb", gross: 4.3, net: 3.5 },
  { month: "Mar", gross: 4.5, net: 3.6 }, { month: "Apr", gross: 4.4, net: 3.5 },
  { month: "May", gross: 4.6, net: 3.7 }, { month: "Jun", gross: 4.8, net: 3.9 },
  { month: "Jul", gross: 4.9, net: 4.0 },
];

const leaveStat = [
  { type: "Casual", approved: 24, pending: 8 },
  { type: "Sick", approved: 18, pending: 3 },
  { type: "Annual", approved: 31, pending: 12 },
  { type: "WFH", approved: 45, pending: 6 },
];

const quickActions = [
  { label: "Add Employee", icon: UserPlus, to: "/admin/employees", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400" },
  { label: "Generate Offer", icon: Mail, to: "/admin/offer-letters", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
  { label: "Create Department", icon: Building2, to: "/admin/departments", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" },
  { label: "Add Holiday", icon: Gift, to: "/admin/holidays", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" },
  { label: "Approve Docs", icon: FileCheck, to: "/admin/documents", color: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" },
  { label: "Announcement", icon: Megaphone, to: "/admin/announcements", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400" },
];

const upcomingBirthdays = [
  { name: "Alex Morgan", date: "Jul 14", dept: "Engineering" },
  { name: "Nina Patel", date: "Jul 18", dept: "Design" },
  { name: "Kenji Tanaka", date: "Jul 22", dept: "Engineering" },
];

const probationEmployees = employees.filter((e) => e.status === "Probation");
const onLeave = employees.filter((e) => e.status === "On Leave");

function ActivityDot({ type }: { type: string }) {
  const colors: Record<string, string> = {
    attendance: "bg-blue-500", leave: "bg-amber-500",
    task: "bg-emerald-500", project: "bg-violet-500",
  };
  return <span className={cn("h-2 w-2 rounded-full shrink-0 mt-1.5", colors[type] || "bg-muted-foreground")} />;
}

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

function AdminDashboard() {
  return (
    <PortalShell
      role="admin"
      title="HR Command Center"
      subtitle="Acme Corp · Single-company HRMS · Real-time overview"
      actions={
        <Button asChild size="sm">
          <Link to="/admin/employees"><Plus className="h-4 w-4 mr-1.5" />Add Employee</Link>
        </Button>
      }
    >
      {/* KPI Row 1 */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <StatCard label="Total Employees" value="248" delta="+5 this month" icon={Users} tone="up" color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Present Today" value="221" delta="89.1% attendance" icon={UserCheck} tone="up" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Absent Today" value="12" delta="4.8% absent" icon={UserX} tone="down" color="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" />
        <StatCard label="Late Arrivals" value="15" delta="6.0% late" icon={Clock} tone="down" color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      {/* KPI Row 2 */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <StatCard label="On Leave" value="15" delta="6 approved today" icon={Plane} color="bg-sky-100 text-sky-600 dark:bg-sky-900/30 dark:text-sky-400" />
        <StatCard label="New Joinings" value="5" delta="This month" icon={UserPlus} tone="up" color="bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400" />
        <StatCard label="Open Positions" value="12" delta="3 urgent" icon={Briefcase} color="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" />
        <StatCard label="Pending Offers" value="7" delta="2 expiring soon" icon={Mail} tone="down" color="bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" />
      </div>

      {/* KPI Row 3 */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
        <StatCard label="Doc Verification" value="18" delta="Pending review" icon={FileText} tone="down" color="bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" />
        <StatCard label="Assets Assigned" value="194" delta="of 220 total" icon={Package} color="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" />
        <StatCard label="Active Projects" value="8" delta="2 due this week" icon={Cpu} color="bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400" />
        <StatCard label="Probation" value="3" delta="Review due" icon={AlertCircle} tone="down" color="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Attendance Trends (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={attendanceTrend} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="present" fill="#6366f1" radius={[3, 3, 0, 0]} name="Present" />
                  <Bar dataKey="absent" fill="#f43f5e" radius={[3, 3, 0, 0]} name="Absent" />
                  <Bar dataKey="leave" fill="#f59e0b" radius={[3, 3, 0, 0]} name="Leave" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Department Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentSplit} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={30}>
                    {departmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 space-y-1">
              {departmentSplit.slice(0, 4).map((d, i) => (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-muted-foreground">{d.name}</span>
                  </div>
                  <span className="font-medium">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Employee Growth (Monthly Hiring vs Attrition)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyHeadcount}>
                  <defs>
                    <linearGradient id="hires" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="exits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area dataKey="hires" stroke="#6366f1" fill="url(#hires)" strokeWidth={2} name="Hires" />
                  <Area dataKey="exits" stroke="#f43f5e" fill="url(#exits)" strokeWidth={2} name="Exits" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Payroll Summary (₹ Lakhs)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={payrollTrend}>
                  <defs>
                    <linearGradient id="gross" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="net" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area dataKey="gross" stroke="#8b5cf6" fill="url(#gross)" strokeWidth={2} name="Gross (L)" />
                  <Area dataKey="net" stroke="#10b981" fill="url(#net)" strokeWidth={2} name="Net (L)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Leave Stats + Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Leave Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaveStat.map((l) => (
              <div key={l.type}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">{l.type}</span>
                  <span className="font-medium">{l.approved} approved · <span className="text-amber-600">{l.pending} pending</span></span>
                </div>
                <Progress value={(l.approved / (l.approved + l.pending)) * 100} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((a) => {
                const Icon = a.icon;
                return (
                  <Link key={a.label} to={a.to as any}>
                    <div className={cn("flex flex-col items-center gap-1.5 rounded-lg p-3 text-center cursor-pointer hover:opacity-80 transition-opacity", a.color)}>
                      <Icon className="h-5 w-5" />
                      <span className="text-xs font-medium leading-tight">{a.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Cake className="h-4 w-4 text-pink-500" /> Upcoming Birthdays
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingBirthdays.map((b) => (
              <div key={b.name} className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">{b.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.dept}</div>
                </div>
                <Badge variant="secondary" className="text-xs shrink-0">{b.date}</Badge>
              </div>
            ))}
            <div className="pt-1 border-t">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                <span>2 work anniversaries this week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((a) => (
              <div key={a.id} className="flex items-start gap-3">
                <ActivityDot type={a.type} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm">
                    <span className="font-medium">{a.actor}</span>
                    <span className="text-muted-foreground"> {a.action}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{a.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-500" /> Alerts & Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { msg: "3 employees on probation review", color: "border-amber-400 bg-amber-50 dark:bg-amber-900/10", icon: "⚠️" },
              { msg: "18 documents pending verification", color: "border-rose-400 bg-rose-50 dark:bg-rose-900/10", icon: "📄" },
              { msg: "Payroll cutoff in 5 days", color: "border-violet-400 bg-violet-50 dark:bg-violet-900/10", icon: "💰" },
              { msg: "2 offer letters expiring soon", color: "border-orange-400 bg-orange-50 dark:bg-orange-900/10", icon: "📧" },
              { msg: "Upcoming holiday: Independence Day", color: "border-blue-400 bg-blue-50 dark:bg-blue-900/10", icon: "🎉" },
            ].map((alert, i) => (
              <div key={i} className={cn("flex items-center gap-2 rounded-lg border-l-2 px-3 py-2 text-xs", alert.color)}>
                <span>{alert.icon}</span>
                <span>{alert.msg}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Pending Leave Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold">Pending Leave Requests</CardTitle>
          <Button variant="outline" size="sm" asChild><Link to="/admin/leaves">View all</Link></Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Employee</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Type</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Duration</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Days</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {leaveRequests.filter((l) => l.status === "Pending").map((l) => (
                <tr key={l.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-2.5 font-medium">{l.employee}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{l.type}</td>
                  <td className="px-4 py-2.5 text-muted-foreground text-xs">{l.from} → {l.to}</td>
                  <td className="px-4 py-2.5">{l.days}d</td>
                  <td className="px-4 py-2.5">
                    <Badge variant="secondary" className="text-amber-700 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 text-xs">{l.status}</Badge>
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" className="h-6 text-xs px-2 text-emerald-600 border-emerald-200">Approve</Button>
                      <Button size="sm" variant="outline" className="h-6 text-xs px-2 text-rose-600 border-rose-200">Reject</Button>
                    </div>
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
