import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Clock, UserCheck, UserX, AlertCircle, Search, MapPin, ExternalLink, Calendar } from "lucide-react";
import { employees, leaveRequests } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/attendance")({ component: AdminAttendance });

const attendanceRows = employees.map((e, i) => ({
  ...e,
  date: "2026-07-10",
  checkIn: `09:${String(5 + (i % 8)).padStart(2, "0")} AM`,
  checkOut: `0${6 + (i % 3)}:${String(10 + (i % 5) * 7).padStart(2, "0")} PM`,
  hours: 7.5 + (i % 4) * 0.5,
  status: i % 9 === 0 ? "Absent" : i % 7 === 0 ? "Late" : i % 5 === 0 ? "On Leave" : "Present",
  checkInCoords: { lat: 12.9716 + i * 0.001, lng: 77.5946 + i * 0.001 },
  checkOutCoords: { lat: 12.9716 + i * 0.001, lng: 77.5946 + i * 0.001 },
}));

const leaveHistory = leaveRequests.map((r) => ({
  ...r,
  reason: r.reason,
}));

function getAnalytics(name: string) {
  const seed = name.charCodeAt(0) % 10;
  return {
    present: 18 + seed,
    absent: seed % 3,
    late: seed % 4,
    onLeave: seed % 2 + 1,
    avgHours: (7.5 + seed * 0.1).toFixed(1),
    totalHours: ((18 + seed) * (7.5 + seed * 0.1)).toFixed(0),
  };
}

type AttendanceRow = typeof attendanceRows[0];

function ViewAttendanceDialog({ emp, open, onClose }: { emp: AttendanceRow | null; open: boolean; onClose: () => void }) {
  const [section, setSection] = useState<"analytics" | "leaves">("analytics");
  if (!emp) return null;
  const analytics = getAnalytics(emp.name);
  const empLeaves = leaveHistory.filter((l) => l.employee === emp.name);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span>{emp.name}</span>
            <Badge variant="outline" className="text-xs">{emp.department}</Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 border-b pb-2">
          <Button size="sm" variant={section === "analytics" ? "default" : "outline"} onClick={() => setSection("analytics")}>Attendance Analytics</Button>
          <Button size="sm" variant={section === "leaves" ? "default" : "outline"} onClick={() => setSection("leaves")}>Leave History</Button>
        </div>

        {section === "analytics" && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Present Days", value: analytics.present, color: "text-emerald-600" },
                { label: "Absent Days", value: analytics.absent, color: "text-rose-600" },
                { label: "Late Arrivals", value: analytics.late, color: "text-amber-600" },
                { label: "On Leave", value: analytics.onLeave, color: "text-blue-600" },
                { label: "Avg Hours/Day", value: analytics.avgHours, color: "text-foreground" },
                { label: "Total Hours", value: analytics.totalHours, color: "text-foreground" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border p-3 text-center">
                  <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Attendance Rate</div>
              <div className="flex items-center gap-3">
                <Progress value={(analytics.present / 22) * 100} className="flex-1 h-2" />
                <span className="text-sm font-semibold">{((analytics.present / 22) * 100).toFixed(0)}%</span>
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              <div className="bg-muted/40 px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">Today's Record</div>
              <div className="p-4 grid grid-cols-2 gap-3 text-sm">
                <div><span className="text-muted-foreground">Check-in:</span> <span className="font-medium ml-2">{emp.checkIn}</span></div>
                <div><span className="text-muted-foreground">Check-out:</span> <span className="font-medium ml-2">{emp.checkOut}</span></div>
                <div><span className="text-muted-foreground">Hours:</span> <span className="font-medium ml-2">{emp.hours}h</span></div>
                <div><span className="text-muted-foreground">Status:</span> <span className="font-medium ml-2">{emp.status}</span></div>
                <div className="col-span-2 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">Check-in coords:</span>
                  <span className="font-mono text-xs">{emp.checkInCoords.lat.toFixed(4)}, {emp.checkInCoords.lng.toFixed(4)}</span>
                  <a href={`https://maps.google.com/?q=${emp.checkInCoords.lat},${emp.checkInCoords.lng}`} target="_blank" rel="noreferrer"
                    className="text-blue-600 hover:underline text-xs flex items-center gap-0.5">
                    <ExternalLink className="h-3 w-3" />Maps
                  </a>
                </div>
                <div className="col-span-2 flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">Check-out coords:</span>
                  <span className="font-mono text-xs">{emp.checkOutCoords.lat.toFixed(4)}, {emp.checkOutCoords.lng.toFixed(4)}</span>
                  <a href={`https://maps.google.com/?q=${emp.checkOutCoords.lat},${emp.checkOutCoords.lng}`} target="_blank" rel="noreferrer"
                    className="text-blue-600 hover:underline text-xs flex items-center gap-0.5">
                    <ExternalLink className="h-3 w-3" />Maps
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {section === "leaves" && (
          <div className="space-y-3">
            {empLeaves.length === 0 ? (
              <div className="text-center text-muted-foreground py-8 text-sm">No leave records found for {emp.name}</div>
            ) : (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {empLeaves.map((l) => (
                      <TableRow key={l.id}>
                        <TableCell className="font-mono text-xs">{l.id}</TableCell>
                        <TableCell>{l.type}</TableCell>
                        <TableCell className="text-xs">{l.from}</TableCell>
                        <TableCell className="text-xs">{l.to}</TableCell>
                        <TableCell>{l.days}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{l.reason}</TableCell>
                        <TableCell>
                          <Badge variant={l.status === "Approved" ? "default" : l.status === "Rejected" ? "destructive" : "secondary"}>
                            {l.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function AdminAttendance() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("2026-07-10");
  const [selected, setSelected] = useState<AttendanceRow | null>(null);

  const depts = ["all", ...Array.from(new Set(employees.map((e) => e.department)))];
  const statuses = ["all", "Present", "Absent", "Late", "On Leave"];

  const filtered = attendanceRows.filter((r) =>
    (deptFilter === "all" || r.department === deptFilter) &&
    (statusFilter === "all" || r.status === statusFilter) &&
    (r.name.toLowerCase().includes(search.toLowerCase()) || r.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PortalShell
      role="admin"
      title="Attendance"
      subtitle="Detailed attendance tracking for all employees"
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Present Today" value="221" delta="89.1%" icon={UserCheck} tone="up" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Absent" value="12" delta="4.8%" icon={UserX} tone="down" color="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" />
        <StatCard label="Late Arrivals" value="15" delta="6.0%" icon={Clock} tone="down" color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Regularizations" value="8" delta="Pending" icon={AlertCircle} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center gap-3 pb-3">
          <CardTitle className="text-sm font-semibold">Attendance Log</CardTitle>
          <div className="flex flex-wrap gap-2 md:ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search name or ID…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-52" />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="pl-9 w-40" />
            </div>
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent>{depts.map((d) => <SelectItem key={d} value={d}>{d === "all" ? "All Departments" : d}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s === "all" ? "All Statuses" : s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="font-medium text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.jobTitle}</div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{r.department}</Badge></TableCell>
                  <TableCell className="font-mono text-xs">{r.status === "Absent" ? "—" : r.checkIn}</TableCell>
                  <TableCell className="font-mono text-xs">{r.status === "Absent" ? "—" : r.checkOut}</TableCell>
                  <TableCell className="text-sm">{r.status === "Absent" ? "—" : `${r.hours}h`}</TableCell>
                  <TableCell>
                    <Badge variant={r.status === "Present" ? "default" : r.status === "Absent" ? "destructive" : r.status === "Late" ? "secondary" : "outline"}>
                      {r.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" onClick={() => setSelected(r)}>View</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ViewAttendanceDialog emp={selected} open={!!selected} onClose={() => setSelected(null)} />
    </PortalShell>
  );
}
