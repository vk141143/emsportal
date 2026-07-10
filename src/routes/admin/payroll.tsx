import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, TrendingUp, Users, AlertCircle, Search, MapPin, ExternalLink, Clock, Briefcase } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/payroll")({ component: AdminPayroll });

const payrollData = [
  { month: "Jan", gross: 42, net: 34 }, { month: "Feb", gross: 43, net: 35 },
  { month: "Mar", gross: 45, net: 36 }, { month: "Apr", gross: 44, net: 35 },
  { month: "May", gross: 46, net: 37 }, { month: "Jun", gross: 48, net: 39 },
  { month: "Jul", gross: 49, net: 40 },
];

const components = [
  { name: "Basic Salary", type: "Earning", taxable: true },
  { name: "HRA", type: "Allowance", taxable: false },
  { name: "Transport Allowance", type: "Allowance", taxable: false },
  { name: "Special Allowance", type: "Allowance", taxable: true },
  { name: "PF (Employee)", type: "Deduction", taxable: false },
  { name: "PF (Employer)", type: "Contribution", taxable: false },
  { name: "ESI", type: "Deduction", taxable: false },
  { name: "Professional Tax", type: "Deduction", taxable: false },
  { name: "TDS", type: "Deduction", taxable: false },
];

const salaryGrades = [
  { grade: "G1", level: "L1-L2", min: "₹3L", max: "₹6L" },
  { grade: "G2", level: "L3-L4", min: "₹6L", max: "₹12L" },
  { grade: "G3", level: "L5-L6", min: "₹12L", max: "₹24L" },
  { grade: "G4", level: "L7-L8", min: "₹24L", max: "₹48L" },
  { grade: "G5", level: "L9+", min: "₹48L", max: "₹1Cr+" },
];

type Employee = typeof employees[0];

function getEmployeeSalary(emp: Employee) {
  const seed = emp.id.charCodeAt(2) % 10;
  return {
    ctc: `₹${(12 + seed * 2)}L`,
    basic: `₹${(6 + seed)}L`,
    hra: `₹${(1.5 + seed * 0.2)}L`,
    allowances: `₹${(2 + seed * 0.3)}L`,
    deductions: `₹${(1.5 + seed * 0.2)}L`,
    net: `₹${(8 + seed * 1.5)}L`,
    workingHours: `${40 + (seed % 5)}h/week`,
    loginTimes: `09:00 AM - 06:00 PM`,
    location: emp.location,
    assets: ["MacBook Pro", "Monitor", "Keyboard"],
    projects: ["Auth v2", "Design System"],
    issues: 3,
  };
}

function EmployeeDetailDialog({ emp, open, onClose }: { emp: Employee | null; open: boolean; onClose: () => void }) {
  const [section, setSection] = useState<"overview" | "components" | "assets" | "projects">("overview");
  if (!emp) return null;
  const salary = getEmployeeSalary(emp);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{emp.name}</span>
            <Badge variant="outline" className="text-xs">{emp.jobTitle}</Badge>
            <Badge className="text-xs">{emp.status}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 border-b pb-2 overflow-x-auto">
          <Button size="sm" variant={section === "overview" ? "default" : "outline"} onClick={() => setSection("overview")}>Overview</Button>
          <Button size="sm" variant={section === "components" ? "default" : "outline"} onClick={() => setSection("components")}>Salary Components</Button>
          <Button size="sm" variant={section === "assets" ? "default" : "outline"} onClick={() => setSection("assets")}>Assets</Button>
          <Button size="sm" variant={section === "projects" ? "default" : "outline"} onClick={() => setSection("projects")}>Projects</Button>
        </div>

        {section === "overview" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { label: "CTC", value: salary.ctc },
                { label: "Basic Salary", value: salary.basic },
                { label: "HRA", value: salary.hra },
                { label: "Allowances", value: salary.allowances },
                { label: "Deductions", value: salary.deductions },
                { label: "Net Salary", value: salary.net },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border p-3">
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-lg font-bold mt-1">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="rounded-lg border p-4 space-y-3">
              <div className="text-sm font-semibold">Work Details</div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Working Hours:</span> <span className="font-medium ml-2">{salary.workingHours}</span></div>
                <div><span className="text-muted-foreground">Login Times:</span> <span className="font-medium ml-2">{salary.loginTimes}</span></div>
                <div><span className="text-muted-foreground">Location:</span> <span className="font-medium ml-2">{salary.location}</span></div>
                <div><span className="text-muted-foreground">Department:</span> <span className="font-medium ml-2">{emp.department}</span></div>
                <div><span className="text-muted-foreground">Manager:</span> <span className="font-medium ml-2">{emp.manager}</span></div>
                <div><span className="text-muted-foreground">Joined:</span> <span className="font-medium ml-2">{emp.joined}</span></div>
              </div>
            </div>
          </div>
        )}

        {section === "components" && (
          <div className="rounded-lg border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold">Component</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">Taxable</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {components.map((c) => (
                  <tr key={c.name} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`text-xs ${c.type === "Earning" || c.type === "Allowance" ? "text-emerald-700 border-emerald-200" : c.type === "Deduction" ? "text-rose-700 border-rose-200" : "text-blue-700 border-blue-200"}`}>{c.type}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={c.taxable ? "secondary" : "outline"} className="text-xs">{c.taxable ? "Yes" : "No"}</Badge>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs">₹{(Math.random() * 50000).toFixed(0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {section === "assets" && (
          <div className="space-y-3">
            {salary.assets.map((asset) => (
              <div key={asset} className="rounded-lg border p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{asset}</span>
                </div>
                <Badge variant="outline" className="text-xs">In Use</Badge>
              </div>
            ))}
          </div>
        )}

        {section === "projects" && (
          <div className="space-y-3">
            {salary.projects.map((project) => (
              <div key={project} className="rounded-lg border p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-sm">{project}</span>
                </div>
                <Badge variant="secondary" className="text-xs">Active</Badge>
              </div>
            ))}
            <div className="rounded-lg border p-3 bg-muted/30">
              <div className="text-sm"><span className="text-muted-foreground">Open Issues:</span> <span className="font-bold ml-2">{salary.issues}</span></div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AdminPayroll() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [deptFilter, setDeptFilter] = useState("all");
  const [selected, setSelected] = useState<Employee | null>(null);

  const roles = ["all", "Employee", "Manager", "HR"];
  const depts = ["all", ...Array.from(new Set(employees.map((e) => e.department)))];

  const getRole = (emp: Employee) => {
    if (emp.jobTitle.includes("Manager") || emp.jobTitle.includes("Lead") || emp.jobTitle.includes("Director")) return "Manager";
    if (emp.jobTitle.includes("HR") || emp.jobTitle.includes("Admin")) return "HR";
    return "Employee";
  };

  const filtered = employees.filter((e) => {
    const role = getRole(e);
    return (roleFilter === "all" || role === roleFilter) &&
      (deptFilter === "all" || e.department === deptFilter) &&
      (e.name.toLowerCase().includes(search.toLowerCase()) || e.id.toLowerCase().includes(search.toLowerCase()));
  });

  return (
    <PortalShell
      role="admin"
      title="Payroll"
      subtitle="Salary components, payroll runs, and financial reports"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Export</Button>
          <Button size="sm">Run Payroll</Button>
        </div>
      }
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Monthly Gross" value="₹49L" delta="+2.1% MoM" icon={Wallet} tone="up" color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Monthly Net" value="₹40L" delta="+2.6% MoM" icon={TrendingUp} tone="up" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Employees on Payroll" value={String(employees.filter((e) => e.status === "Active").length)} icon={Users} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Payroll Due" value="Jul 31" delta="5 days left" icon={AlertCircle} tone="down" color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="employees">Employees</TabsTrigger>
          <TabsTrigger value="components">Salary Components</TabsTrigger>
          <TabsTrigger value="grades">Salary Grades</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Payroll Trend (₹ Lakhs)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={payrollData}>
                      <defs>
                        <linearGradient id="gross2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="net2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                          <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                      <Area dataKey="gross" stroke="#8b5cf6" fill="url(#gross2)" strokeWidth={2} name="Gross (L)" />
                      <Area dataKey="net" stroke="#10b981" fill="url(#net2)" strokeWidth={2} name="Net (L)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">Payroll Breakdown (Jul 2026)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Gross Salary", value: "₹49,00,000", color: "text-foreground" },
                  { label: "PF (Employee)", value: "₹2,94,000", color: "text-rose-600" },
                  { label: "PF (Employer)", value: "₹2,94,000", color: "text-rose-600" },
                  { label: "ESI", value: "₹73,500", color: "text-rose-600" },
                  { label: "Professional Tax", value: "₹49,000", color: "text-rose-600" },
                  { label: "TDS", value: "₹4,90,000", color: "text-rose-600" },
                  { label: "Net Salary", value: "₹40,00,000", color: "text-emerald-600 font-bold" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center py-1 border-b last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className={`text-sm font-medium ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center gap-3 pb-3">
              <CardTitle className="text-sm font-semibold">Employees & Payroll</CardTitle>
              <div className="flex flex-wrap gap-2 md:ml-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search name or ID…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-52" />
                </div>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>{roles.map((r) => <SelectItem key={r} value={r}>{r === "all" ? "All Roles" : r}</SelectItem>)}</SelectContent>
                </Select>
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
                    <th className="text-left px-4 py-3 text-xs font-semibold">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">Department</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">DOJ</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">CTC</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold">Working Hours</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((e) => {
                    const role = getRole(e);
                    const salary = getEmployeeSalary(e);
                    return (
                      <tr key={e.id} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="px-4 py-3">
                          <div className="font-medium text-sm">{e.name}</div>
                          <div className="text-xs text-muted-foreground">{e.id}</div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs">{role}</Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{e.department}</td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">{e.joined}</td>
                        <td className="px-4 py-3 font-mono font-semibold text-sm">{salary.ctc}</td>
                        <td className="px-4 py-3 text-xs">{salary.workingHours}</td>
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

        <TabsContent value="components">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Component</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Taxable</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {components.map((c) => (
                    <tr key={c.name} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{c.name}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={`text-xs ${c.type === "Earning" || c.type === "Allowance" ? "text-emerald-700 border-emerald-200" : c.type === "Deduction" ? "text-rose-700 border-rose-200" : "text-blue-700 border-blue-200"}`}>{c.type}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={c.taxable ? "secondary" : "outline"} className="text-xs">{c.taxable ? "Yes" : "No"}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grades">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Grade</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Level</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Min CTC</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Max CTC</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {salaryGrades.map((g) => (
                    <tr key={g.grade} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-mono font-medium">{g.grade}</td>
                      <td className="px-4 py-3 text-muted-foreground">{g.level}</td>
                      <td className="px-4 py-3 text-emerald-600 font-medium">{g.min}</td>
                      <td className="px-4 py-3 text-emerald-600 font-medium">{g.max}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EmployeeDetailDialog emp={selected} open={!!selected} onClose={() => setSelected(null)} />
    </PortalShell>
  );
}
