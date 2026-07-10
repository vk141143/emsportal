import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import {
  Users, UserPlus, UserMinus, Briefcase, UserCheck, UserX, Clock, CalendarX,
  Cake, AlertTriangle, FileText, ArrowRightLeft, TrendingUp, Upload, Download,
  Plus, UserCog, LogIn, StopCircle, Coffee, Timer, MapPin, Navigation,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { monthlyHeadcount, departmentSplit, candidates, employees, leaveRequests, hrDocuments } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/dashboard")({ component: HRDashboard });

const COLORS = ["hsl(217 91% 60%)", "hsl(160 84% 39%)", "hsl(38 92% 50%)", "hsl(280 84% 60%)", "hsl(340 82% 52%)", "hsl(200 84% 50%)"];

const quickActions = [
  { label: "Create Employee", icon: UserPlus, color: "text-blue-600 bg-blue-50 dark:bg-blue-950" },
  { label: "Bulk Import", icon: Upload, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950" },
  { label: "Bulk Export", icon: Download, color: "text-purple-600 bg-purple-50 dark:bg-purple-950" },
  { label: "Transfer", icon: ArrowRightLeft, color: "text-amber-600 bg-amber-50 dark:bg-amber-950" },
  { label: "Promotion", icon: TrendingUp, color: "text-teal-600 bg-teal-50 dark:bg-teal-950" },
  { label: "Termination", icon: UserMinus, color: "text-rose-600 bg-rose-50 dark:bg-rose-950" },
];

function LocationModal({ open, onClose, type }: { open: boolean; onClose: () => void; type: "in" | "out" }) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    navigator.geolocation?.getCurrentPosition(
      (pos) => { setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }); setLoading(false); },
      () => { setCoords({ lat: 12.9716, lng: 77.5946 }); setLoading(false); }
    );
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-emerald-500" />
            Check {type === "in" ? "In" : "Out"} Location
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 py-2">
          {loading ? (
            <div className="text-sm text-muted-foreground animate-pulse">Fetching location…</div>
          ) : coords ? (
            <>
              <div className="rounded-lg border bg-muted/40 p-3 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Latitude</span>
                  <span className="font-mono font-medium">{coords.lat.toFixed(6)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Longitude</span>
                  <span className="font-mono font-medium">{coords.lng.toFixed(6)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{new Date().toLocaleTimeString()}</span>
                </div>
              </div>
              <a
                href={`https://maps.google.com/?q=${coords.lat},${coords.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-primary hover:underline"
              >
                <MapPin className="h-3.5 w-3.5" /> View on Google Maps
              </a>
            </>
          ) : null}
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full">
            Confirm Check {type === "in" ? "In" : "Out"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function HRDashboard() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [locationModal, setLocationModal] = useState<{ open: boolean; type: "in" | "out" }>({ open: false, type: "in" });

  const handleCheckIn = () => setLocationModal({ open: true, type: "in" });
  const handleCheckOut = () => setLocationModal({ open: true, type: "out" });
  const confirmLocation = () => {
    if (locationModal.type === "in") setCheckedIn(true);
    else { setCheckedIn(false); setOnBreak(false); }
    setLocationModal({ open: false, type: "in" });
  };
  const newJoiners = employees.filter((e) => e.joined >= "2026-01-01");
  const probation = employees.filter((e) => e.status === "Probation");
  const expiredDocs = hrDocuments.filter((d) => d.status === "Expired");
  const pendingLeaves = leaveRequests.filter((r) => r.status === "Pending");

  return (
    <PortalShell
      role="hr"
      title="People Operations"
      subtitle="Workforce insights across Acme Corp"
      actions={
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export Report</Button>
          <Button variant="outline">Run Payroll</Button>
          {onBreak ? (
            <Button variant="outline" size="sm" onClick={() => setOnBreak(false)}>
              <Timer className="h-4 w-4 mr-1.5" /> End Break
            </Button>
          ) : checkedIn ? (
            <Button variant="outline" size="sm" onClick={() => setOnBreak(true)}>
              <Coffee className="h-4 w-4 mr-1.5" /> Break
            </Button>
          ) : null}
          {checkedIn ? (
            <Button variant="destructive" size="sm" onClick={handleCheckOut}>
              <StopCircle className="h-4 w-4 mr-1.5" /> Check Out
            </Button>
          ) : (
            <Button size="sm" onClick={handleCheckIn}>
              <LogIn className="h-4 w-4 mr-1.5" /> Check In
            </Button>
          )}
        </div>
      }
    >
      <LocationModal open={locationModal.open} onClose={confirmLocation} type={locationModal.type} />

      {/* Attendance card */}
      <Card>
        <CardContent className="p-4">
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-xl border p-3 gap-1.5">
              <div className={`h-10 w-10 rounded-full grid place-items-center ${checkedIn ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                <LogIn className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium">Check In</div>
              <div className="text-base font-bold">{checkedIn ? "9:02 AM" : "—"}</div>
              <Badge variant={checkedIn ? "default" : "secondary"} className="text-xs">{checkedIn ? "On Time" : "Not In"}</Badge>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border p-3 gap-1.5">
              <div className="h-10 w-10 rounded-full bg-muted grid place-items-center text-muted-foreground">
                <StopCircle className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium">Check Out</div>
              <div className="text-base font-bold">—</div>
              <Badge variant="outline" className="text-xs">Pending</Badge>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border p-3 gap-1.5">
              <div className="h-10 w-10 rounded-full bg-sky-100 text-sky-600 grid place-items-center">
                <Clock className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium">Working Hours</div>
              <div className="text-base font-bold">{checkedIn ? "6h 12m" : "0h 0m"}</div>
              <Badge variant="secondary" className="text-xs">of 9h shift</Badge>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border p-3 gap-1.5">
              <div className={`h-10 w-10 rounded-full grid place-items-center ${onBreak ? "bg-amber-100 text-amber-600" : "bg-muted text-muted-foreground"}`}>
                <Coffee className="h-5 w-5" />
              </div>
              <div className="text-xs font-medium">Break</div>
              <div className="text-base font-bold">{onBreak ? "0h 08m" : "0h 00m"}</div>
              <Badge variant={onBreak ? "secondary" : "outline"} className="text-xs">{onBreak ? "On Break" : "Not on Break"}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Today's Attendance */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Present Today" value="1,145" delta="+12 vs yesterday" icon={UserCheck} tone="up" />
        <StatCard label="Absent Today" value="57" delta="4.6% of workforce" icon={UserX} tone="down" />
        <StatCard label="Late Arrivals" value="23" delta="This morning" icon={Clock} tone="down" />
        <StatCard label="Leave Requests" value={String(pendingLeaves.length)} delta="Pending approval" icon={CalendarX} />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Headcount" value="1,240" delta="+24 this month" icon={Users} tone="up" />
        <StatCard label="New Hires (Jul)" value="24" delta="+37% vs Jun" icon={UserPlus} tone="up" />
        <StatCard label="Attrition Rate" value="4.2%" delta="Below 6% target" icon={UserMinus} tone="up" />
        <StatCard label="Open Positions" value="42" delta="18 in interview" icon={Briefcase} />
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
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
        <Card>
          <CardHeader><CardTitle>Department Split</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={departmentSplit} dataKey="value" nameKey="name" innerRadius={45} outerRadius={80} paddingAngle={3}>
                    {departmentSplit.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader><CardTitle>Quick Actions</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {quickActions.map((a) => (
              <button key={a.label} className={`flex flex-col items-center gap-2 rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer ${a.color}`}>
                <a.icon className="h-6 w-6" />
                <span className="text-xs font-medium text-center leading-tight">{a.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alerts & Info Grid */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* New Joiners */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><UserPlus className="h-4 w-4 text-emerald-500" /> New Joiners</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {newJoiners.slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center gap-2">
                <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{e.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.joined}</div>
                </div>
              </div>
            ))}
            {newJoiners.length === 0 && <div className="text-xs text-muted-foreground">No new joiners this month</div>}
          </CardContent>
        </Card>

        {/* Probation */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><UserCog className="h-4 w-4 text-amber-500" /> On Probation</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {probation.length > 0 ? probation.map((e) => (
              <div key={e.id} className="flex items-center gap-2">
                <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{e.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{e.name}</div>
                  <div className="text-xs text-muted-foreground">{e.department}</div>
                </div>
                <Badge variant="secondary" className="shrink-0 text-xs">Probation</Badge>
              </div>
            )) : <div className="text-xs text-muted-foreground">No employees on probation</div>}
          </CardContent>
        </Card>

        {/* Birthdays */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><Cake className="h-4 w-4 text-pink-500" /> Birthdays This Week</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {["Priya Nair · Jul 11", "Kenji Tanaka · Jul 13", "Nina Patel · Jul 14"].map((p) => (
              <div key={p} className="flex items-center gap-2">
                <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{p[0]}</AvatarFallback></Avatar>
                <div className="text-sm">{p}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Document Expiry */}
        <Card>
          <CardHeader><CardTitle className="flex items-center gap-2 text-sm"><AlertTriangle className="h-4 w-4 text-rose-500" /> Document Expiry</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {expiredDocs.length > 0 ? expiredDocs.map((d) => (
              <div key={d.id} className="flex items-start gap-2">
                <FileText className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{d.employee}</div>
                  <div className="text-xs text-muted-foreground">{d.type} · Expired {d.expiry}</div>
                </div>
              </div>
            )) : <div className="text-xs text-muted-foreground">No expiring documents</div>}
            <Button variant="outline" size="sm" className="w-full mt-2"><Plus className="h-3 w-3 mr-1" /> View All</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recruiting Pipeline */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recruiting Pipeline</CardTitle>
          <Button variant="ghost" size="sm">View all</Button>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {candidates.slice(0, 4).map((c) => (
            <div key={c.id} className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-2 min-w-0">
                <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{c.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{c.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.role}</div>
                </div>
              </div>
              <Badge variant={c.stage === "Hired" ? "default" : c.stage === "Rejected" ? "destructive" : "secondary"} className="shrink-0 ml-2">{c.stage}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </PortalShell>
  );
}
