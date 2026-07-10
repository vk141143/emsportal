import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import {
  Clock, Calendar, Wallet, Target, StopCircle, Coffee, LogIn,
  CheckSquare, Gift, Bell, FileText, Megaphone, MapPin, QrCode,
  Wifi, Timer, ChevronRight, TrendingUp, Navigation,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { announcements, goals, payslips } from "@/lib/mock-data";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useEffect } from "react";

export const Route = createFileRoute("/employee/dashboard")({ component: EmployeeDashboard });

const weekHours = [
  { day: "Mon", hrs: 8.2 }, { day: "Tue", hrs: 8.7 }, { day: "Wed", hrs: 7.9 },
  { day: "Thu", hrs: 8.4 }, { day: "Fri", hrs: 6.1 }, { day: "Sat", hrs: 0 }, { day: "Sun", hrs: 0 },
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

const todayTasks = [
  { id: 1, title: "Review PR #482 — auth refactor", project: "Auth v2", done: true },
  { id: 2, title: "Update API docs for /users endpoint", project: "Docs", done: false },
  { id: 3, title: "Sync with Priya on Q3 roadmap", project: "Planning", done: false },
  { id: 4, title: "Fix flaky test in CI pipeline", project: "DevOps", done: false },
];

const upcomingHolidays = [
  { name: "Independence Day", date: "Aug 15, 2026", days: 36 },
  { name: "Gandhi Jayanti", date: "Oct 2, 2026", days: 84 },
  { name: "Diwali", date: "Oct 20, 2026", days: 102 },
];

const birthdays = [
  { name: "Priya Nair", date: "Jul 11", initials: "PN" },
  { name: "Kenji Tanaka", date: "Jul 13", initials: "KT" },
  { name: "Nina Patel", date: "Jul 14", initials: "NP" },
];

const notifications = [
  { text: "Your leave request LR-201 is pending approval", time: "2h ago", type: "leave" },
  { text: "Payslip for June 2026 is available", time: "1d ago", type: "payroll" },
  { text: "Security training due July 20", time: "2d ago", type: "alert" },
  { text: "Goal 'Ship auth v2' is 82% complete", time: "3d ago", type: "goal" },
];

const leaveBalances = [
  { type: "Casual", used: 4, total: 12, color: "bg-sky-500" },
  { type: "Sick", used: 2, total: 10, color: "bg-rose-500" },
  { type: "Annual", used: 7, total: 20, color: "bg-emerald-500" },
  { type: "WFH", used: 3, total: 24, color: "bg-violet-500" },
];

function EmployeeDashboard() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [onBreak, setOnBreak] = useState(false);
  const [tasks, setTasks] = useState(todayTasks);
  const [locationModal, setLocationModal] = useState<{ open: boolean; type: "in" | "out" }>({ open: false, type: "in" });

  const handleCheckIn = () => setLocationModal({ open: true, type: "in" });
  const handleCheckOut = () => setLocationModal({ open: true, type: "out" });
  const confirmLocation = () => {
    if (locationModal.type === "in") setCheckedIn(true);
    else { setCheckedIn(false); setOnBreak(false); }
    setLocationModal({ open: false, type: "in" });
  };

  return (
    <PortalShell
      role="employee"
      title="Good morning, Alex 👋"
      subtitle="Friday, July 10, 2026 · Bengaluru, IN"
      actions={
        <>
          {onBreak ? (
            <Button variant="outline" onClick={() => setOnBreak(false)}>
              <Timer className="h-4 w-4 mr-2" /> End Break
            </Button>
          ) : (
            <Button variant="outline" onClick={() => setOnBreak(true)}>
              <Coffee className="h-4 w-4 mr-2" /> Break
            </Button>
          )}
          {checkedIn ? (
            <Button variant="destructive" onClick={handleCheckOut}>
              <StopCircle className="h-4 w-4 mr-2" /> Check Out
            </Button>
          ) : (
            <Button onClick={handleCheckIn}>
              <LogIn className="h-4 w-4 mr-2" /> Check In
            </Button>
          )}
        </>
      }
    >
      <LocationModal open={locationModal.open} onClose={confirmLocation} type={locationModal.type} />
      {/* KPI Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Today's hours" value={checkedIn ? "6h 12m" : "Not checked in"} delta={checkedIn ? "Checked in at 9:02 AM" : "Tap Check In to start"} icon={Clock} tone={checkedIn ? "up" : "down"} />
        <StatCard label="Leave balance" value="14 days" delta="4 used · 2 pending" icon={Calendar} tone="up" />
        <StatCard label="Next payslip" value="₹7,680" delta="Credited Jul 30" icon={Wallet} />
        <StatCard label="Active goals" value="4" delta="1 due this week" icon={Target} />
      </div>

      {/* Attendance Check-in Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" /> Today's Attendance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex flex-col items-center justify-center rounded-xl border p-4 gap-2">
              <div className={`h-12 w-12 rounded-full grid place-items-center ${checkedIn ? "bg-emerald-100 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                <LogIn className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium">Check In</div>
              <div className="text-lg font-bold">{checkedIn ? "9:02 AM" : "—"}</div>
              <Badge variant={checkedIn ? "default" : "secondary"}>{checkedIn ? "On Time" : "Not In"}</Badge>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border p-4 gap-2">
              <div className="h-12 w-12 rounded-full bg-muted grid place-items-center text-muted-foreground">
                <StopCircle className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium">Check Out</div>
              <div className="text-lg font-bold">—</div>
              <Badge variant="outline">Pending</Badge>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border p-4 gap-2">
              <div className="h-12 w-12 rounded-full bg-sky-100 text-sky-600 grid place-items-center">
                <Clock className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium">Working Hours</div>
              <div className="text-lg font-bold">{checkedIn ? "6h 12m" : "0h 0m"}</div>
              <Badge variant="secondary">of 9h shift</Badge>
            </div>
            <div className="flex flex-col items-center justify-center rounded-xl border p-4 gap-2">
              <div className={`h-12 w-12 rounded-full grid place-items-center ${onBreak ? "bg-amber-100 text-amber-600" : "bg-muted text-muted-foreground"}`}>
                <Coffee className="h-6 w-6" />
              </div>
              <div className="text-sm font-medium">Break Timer</div>
              <div className="text-lg font-bold">{onBreak ? "0h 08m" : "0h 00m"}</div>
              <Badge variant={onBreak ? "secondary" : "outline"}>{onBreak ? "On Break" : "Not on Break"}</Badge>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="gap-2">
              <MapPin className="h-4 w-4" /> GPS Attendance
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <QrCode className="h-4 w-4" /> QR Attendance
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              <Wifi className="h-4 w-4" /> Office IP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Week chart + Today's Tasks */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>This week</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Working hours logged Mon–Sun</p>
            </div>
            <Badge variant="secondary">39h 18m / 40h</Badge>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekHours}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(217 91% 60%)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="hsl(217 91% 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="hrs" stroke="hsl(217 91% 60%)" fill="url(#g1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><CheckSquare className="h-4 w-4" /> Today's Tasks</CardTitle>
            <Link to="/employee/tasks"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((t) => (
              <div key={t.id} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={t.done}
                  onChange={() => setTasks(tasks.map((x) => x.id === t.id ? { ...x, done: !x.done } : x))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                />
                <div className="min-w-0">
                  <div className={`text-sm font-medium ${t.done ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.project}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Leave Balance + Upcoming Holidays */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Leave Balance</CardTitle>
            <Link to="/employee/leaves"><Button variant="ghost" size="sm">Apply</Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {leaveBalances.map((b) => (
              <div key={b.type} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{b.type}</span>
                  <span className="text-muted-foreground">{b.total - b.used} left</span>
                </div>
                <Progress value={(b.used / b.total) * 100} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gift className="h-4 w-4" /> Upcoming Holidays</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingHolidays.map((h) => (
              <div key={h.name} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="text-sm font-medium">{h.name}</div>
                  <div className="text-xs text-muted-foreground">{h.date}</div>
                </div>
                <Badge variant="secondary">{h.days}d away</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Gift className="h-4 w-4 text-rose-500" /> Birthdays 🎂</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {birthdays.map((b) => (
              <div key={b.name} className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="bg-rose-100 text-rose-600 text-xs">{b.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.date}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Payslips + Notifications + Announcements */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Recent Payslips</CardTitle>
            <Link to="/employee/payslips"><Button variant="ghost" size="sm">View all</Button></Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {payslips.slice(0, 4).map((p) => (
              <div key={p.period} className="flex items-center justify-between rounded-lg border p-3">
                <div>
                  <div className="text-sm font-medium">{p.period}</div>
                  <div className="text-xs text-muted-foreground">Net: ₹{p.net.toLocaleString()}</div>
                </div>
                <Badge>{p.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4" /> Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n, i) => (
              <div key={i} className="flex gap-3">
                <div className={`h-2 w-2 rounded-full mt-2 shrink-0 ${n.type === "leave" ? "bg-sky-500" : n.type === "payroll" ? "bg-emerald-500" : n.type === "alert" ? "bg-rose-500" : "bg-violet-500"}`} />
                <div className="min-w-0">
                  <div className="text-sm">{n.text}</div>
                  <div className="text-xs text-muted-foreground">{n.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Megaphone className="h-4 w-4" /> Announcements</CardTitle>
            <Link to="/employee/announcements"><Button variant="ghost" size="sm">All</Button></Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((a) => (
              <div key={a.title} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs">A</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-medium text-sm">{a.title}</div>
                    <Badge variant="outline" className="text-[10px]">{a.tag}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{a.body}</p>
                  <div className="text-[10px] text-muted-foreground mt-1">{a.date}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Goals + Recent Docs */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> My Goals</CardTitle>
            <Link to="/employee/performance"><Button variant="ghost" size="sm" className="gap-1">View all <ChevronRight className="h-3 w-3" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {goals.slice(0, 3).map((g) => (
              <div key={g.title} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{g.title}</div>
                    <div className="text-xs text-muted-foreground">Owner: {g.owner} · Due {g.due}</div>
                  </div>
                  <Badge variant={g.status === "At Risk" ? "destructive" : "secondary"}>{g.status}</Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={g.progress} className="flex-1" />
                  <span className="text-xs text-muted-foreground w-8 text-right">{g.progress}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><FileText className="h-4 w-4" /> Recent Documents</CardTitle>
            <Link to="/employee/documents"><Button variant="ghost" size="sm">All</Button></Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {["Payslip - June 2026.pdf", "Form 16 - FY 2025-26.pdf", "Employment Contract.pdf", "Health Insurance Card.pdf"].map((d) => (
              <div key={d} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted transition-colors cursor-pointer">
                <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                <div className="text-sm truncate">{d}</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
