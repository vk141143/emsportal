import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import {
  Users, ClipboardCheck, Target, TrendingUp, CheckCircle2, XCircle,
  UserCheck, UserX, Clock, AlertCircle, LogIn, StopCircle, Coffee,
  Timer, MapPin, Navigation,
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { leaveRequests, goals, tasks, recentActivities } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/dashboard")({ component: ManagerDashboard });

const teamPerf = [
  { name: "Alex", goals: 4, done: 3 },
  { name: "Aisha", goals: 5, done: 2 },
  { name: "Kenji", goals: 3, done: 3 },
  { name: "Nina", goals: 4, done: 3 },
  { name: "Marcus", goals: 3, done: 2 },
];

const activityTypeColor: Record<string, string> = {
  attendance: "bg-blue-500", task: "bg-emerald-500",
  leave: "bg-amber-500", project: "bg-purple-500",
};

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

function ManagerDashboard() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [locationModal, setLocationModal] = useState<{ open: boolean; type: "in" | "out" }>({ open: false, type: "in" });
  const pendingLeaves = leaveRequests.filter((r) => r.status === "Pending");
  const tasksDue = tasks.filter((t) => t.status !== "Completed").slice(0, 4);

  const handleCheckIn = () => setLocationModal({ open: true, type: "in" });
  const handleCheckOut = () => setLocationModal({ open: true, type: "out" });
  const confirmLocation = () => {
    if (locationModal.type === "in") setCheckedIn(true);
    else { setCheckedIn(false); setOnBreak(false); }
    setLocationModal({ open: false, type: "in" });
  };

  return (
    <PortalShell
      role="manager"
      title="Team Overview"
      subtitle="Engineering · 8 direct reports"
      actions={
        <>
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
        </>
      }
    >
      <LocationModal
        open={locationModal.open}
        onClose={confirmLocation}
        type={locationModal.type}
      />

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

      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Present Today" value="7 / 8" delta="+1 vs yesterday" icon={UserCheck} tone="up" />
        <StatCard label="Absent Today" value="1" delta="Elena Volkova" icon={UserX} tone="down" />
        <StatCard label="Late Arrivals" value="2" delta="This week" icon={Clock} tone="down" />
        <StatCard label="Pending Leaves" value={String(pendingLeaves.length)} delta="Awaiting approval" icon={AlertCircle} />
      </div>

      {/* Team Performance + Pending Approvals */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Team Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamPerf}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Legend />
                  <Bar dataKey="done" name="Completed" fill="hsl(160 84% 39%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="goals" name="Total Goals" fill="hsl(217 91% 60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Pending Leave Approvals</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {pendingLeaves.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-start gap-3 rounded-lg border p-3">
                <Avatar className="h-9 w-9"><AvatarFallback>{r.employee.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{r.employee}</div>
                  <div className="text-xs text-muted-foreground truncate">{r.type} · {r.days}d · {r.from}</div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-emerald-600"><CheckCircle2 className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-rose-600"><XCircle className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Goals + Tasks + Activities */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Team Goals</CardTitle>
            <Button variant="ghost" size="sm">View all</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.map((g) => (
              <div key={g.title} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{g.title}</div>
                    <div className="text-xs text-muted-foreground">{g.owner} · Due {g.due}</div>
                  </div>
                  <Badge variant={g.status === "At Risk" ? "destructive" : "secondary"}>{g.status}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={g.progress} className="flex-1" />
                  <span className="text-xs text-muted-foreground w-10 text-right">{g.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Tasks Due Soon</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {tasksDue.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-lg border p-2.5">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.assignee} · {t.due}</div>
                  </div>
                  <Badge variant={t.priority === "High" ? "destructive" : "outline"} className="shrink-0 text-xs">{t.priority}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Recent Activities</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <div className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${activityTypeColor[a.type]}`} />
                  <div className="min-w-0">
                    <span className="text-sm font-medium">{a.actor}</span>
                    <span className="text-sm text-muted-foreground"> {a.action}</span>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}
