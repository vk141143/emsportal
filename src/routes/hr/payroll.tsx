import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, Landmark, TrendingUp, Users, Play, Download } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/payroll")({ component: HRPayroll });

const trend = [
  { month: "Jan", cost: 8.2 }, { month: "Feb", cost: 8.4 }, { month: "Mar", cost: 8.6 },
  { month: "Apr", cost: 8.9 }, { month: "May", cost: 9.1 }, { month: "Jun", cost: 9.4 }, { month: "Jul", cost: 9.7 },
];

const runs = [
  { cycle: "July 2026", employees: 1240, gross: 9720000, tax: 1850000, net: 7870000, status: "Scheduled" },
  { cycle: "June 2026", employees: 1216, gross: 9450000, tax: 1795000, net: 7655000, status: "Paid" },
  { cycle: "May 2026", employees: 1198, gross: 9310000, tax: 1770000, net: 7540000, status: "Paid" },
  { cycle: "April 2026", employees: 1181, gross: 9180000, tax: 1745000, net: 7435000, status: "Paid" },
];

// Per-employee payroll breakdown (mock)
const employeePayroll = employees.map((e, i) => ({
  id: e.id,
  name: e.name,
  department: e.department,
  jobTitle: e.jobTitle,
  gross: 60000 + i * 3200,
  pf: Math.round((60000 + i * 3200) * 0.12),
  tax: Math.round((60000 + i * 3200) * 0.08),
  net: Math.round((60000 + i * 3200) * 0.80),
  status: i % 5 === 0 ? "Pending" : "Paid",
}));

function HRPayroll() {
  return (
    <PortalShell role="hr" title="Payroll" subtitle="Global multi-country payroll · Next run July 30"
      actions={<><Button variant="outline"><Download className="h-4 w-4 mr-2" /> Bank file</Button><Button><Play className="h-4 w-4 mr-2" /> Run payroll</Button></>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Monthly cost" value="$9.72M" delta="+3.2% MoM" tone="up" icon={DollarSign} />
        <StatCard label="Taxes withheld" value="$1.85M" icon={Landmark} />
        <StatCard label="Avg. cost/employee" value="$7,838" tone="up" icon={TrendingUp} />
        <StatCard label="On payroll" value="1,240" icon={Users} />
      </div>

      <Card>
        <CardHeader><CardTitle>Payroll cost trend ($M)</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs><linearGradient id="pay" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(340 82% 52%)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(340 82% 52%)" stopOpacity={0} />
                </linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Area dataKey="cost" stroke="hsl(340 82% 52%)" fill="url(#pay)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Payroll Cycles</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Cycle</TableHead><TableHead>Employees</TableHead>
              <TableHead>Gross</TableHead><TableHead>Tax</TableHead><TableHead>Net</TableHead>
              <TableHead>Status</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {runs.map((r) => (
                <TableRow key={r.cycle}>
                  <TableCell className="font-medium">{r.cycle}</TableCell>
                  <TableCell>{r.employees.toLocaleString()}</TableCell>
                  <TableCell>${(r.gross / 1e6).toFixed(2)}M</TableCell>
                  <TableCell className="text-muted-foreground">${(r.tax / 1e6).toFixed(2)}M</TableCell>
                  <TableCell className="font-semibold">${(r.net / 1e6).toFixed(2)}M</TableCell>
                  <TableCell><Badge variant={r.status === "Paid" ? "default" : "secondary"}>{r.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm">Details</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Employee Payroll Breakdown — July 2026</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Gross (₹)</TableHead>
              <TableHead>PF (12%)</TableHead>
              <TableHead>Tax (8%)</TableHead>
              <TableHead>Net (₹)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {employeePayroll.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="font-medium text-sm">{e.name}</div>
                    <div className="text-xs text-muted-foreground">{e.jobTitle}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{e.id}</TableCell>
                  <TableCell><Badge variant="outline">{e.department}</Badge></TableCell>
                  <TableCell className="font-mono">₹{e.gross.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="font-mono text-rose-600">₹{e.pf.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="font-mono text-amber-600">₹{e.tax.toLocaleString("en-IN")}</TableCell>
                  <TableCell className="font-mono font-semibold text-emerald-600">₹{e.net.toLocaleString("en-IN")}</TableCell>
                  <TableCell><Badge variant={e.status === "Paid" ? "default" : "secondary"}>{e.status}</Badge></TableCell>
                  <TableCell><Button variant="ghost" size="sm"><Download className="h-3.5 w-3.5 mr-1" />Slip</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
