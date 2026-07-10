import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Users, UserCheck, UserX, UserPlus, Search, Plus, MoreHorizontal, Download, Upload } from "lucide-react";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/employees")({ component: AdminEmployees });

const statusColor: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  "On Leave": "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Probation: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Inactive: "bg-muted text-muted-foreground",
};

function AdminEmployees() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.id.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "all" || e.department === dept;
    const matchStatus = status === "all" || e.status === status;
    return matchSearch && matchDept && matchStatus;
  });

  const depts = [...new Set(employees.map((e) => e.department))];

  return (
    <PortalShell
      role="admin"
      title="Employees"
      subtitle="Manage all employees, roles, and assignments"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1.5" />Import</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1.5" />Export</Button>
          <Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Add Employee</Button>
        </div>
      }
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Total" value={String(employees.length)} icon={Users} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Active" value={String(employees.filter((e) => e.status === "Active").length)} icon={UserCheck} tone="up" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="On Leave" value={String(employees.filter((e) => e.status === "On Leave").length)} icon={UserX} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Probation" value={String(employees.filter((e) => e.status === "Probation").length)} icon={UserPlus} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name, email, ID…" className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-44 h-9"><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {depts.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-36 h-9"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="On Leave">On Leave</SelectItem>
                <SelectItem value="Probation">Probation</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Employee</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Department</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Designation</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Manager</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Location</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Joined</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((e) => (
                <tr key={e.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">{e.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{e.name}</div>
                        <div className="text-xs text-muted-foreground">{e.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{e.id}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.department}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.jobTitle}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.manager}</td>
                  <td className="px-4 py-3 text-muted-foreground">{e.location}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{e.joined}</td>
                  <td className="px-4 py-3">
                    <Badge className={`text-xs ${statusColor[e.status] || ""}`} variant="outline">{e.status}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit Employee</DropdownMenuItem>
                        <DropdownMenuItem>Assign Manager</DropdownMenuItem>
                        <DropdownMenuItem>Assign Shift</DropdownMenuItem>
                        <DropdownMenuItem>Transfer Department</DropdownMenuItem>
                        <DropdownMenuItem>Promote</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600">Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-16 text-center text-muted-foreground text-sm">No employees found matching your filters.</div>
          )}
        </CardContent>
      </Card>
    </PortalShell>
  );
}
