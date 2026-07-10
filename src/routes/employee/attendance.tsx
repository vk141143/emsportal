import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { attendance } from "@/lib/mock-data";
import { Clock, CalendarClock, LogIn, Timer, Download, MapPin, QrCode, Wifi, AlertTriangle, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/employee/attendance")({ component: EmployeeAttendance });

const overtimeData = [
  { date: "2026-07-02", hours: "1h 30m", approved: true },
  { date: "2026-07-05", hours: "2h 00m", approved: true },
  { date: "2026-07-08", hours: "0h 45m", approved: false },
  { date: "2026-07-10", hours: "2h 25m", approved: false },
];

const lateMarks = [
  { date: "2026-07-03", checkIn: "9:22 AM", grace: "15 min", late: "7 min", waived: true },
  { date: "2026-07-09", checkIn: "9:38 AM", grace: "15 min", late: "23 min", waived: false },
];

const calendarDays = Array.from({ length: 31 }, (_, i) => {
  const d = i + 1;
  const isWeekend = [6, 7, 13, 14, 20, 21, 27, 28].includes(d);
  const isLeave = d === 6;
  const isFuture = d > 10;
  return { d, isWeekend, isLeave, isFuture };
});

function EmployeeAttendance() {
  return (
    <PortalShell
      role="employee"
      title="Attendance"
      subtitle="Track your daily clock-ins, breaks and overtime"
      actions={<Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Present days" value="19" delta="of 22 working days" icon={LogIn} tone="up" />
        <StatCard label="Avg. hours/day" value="8h 24m" delta="+12m vs last month" icon={Clock} tone="up" />
        <StatCard label="Overtime" value="6h 40m" delta="This month" icon={Timer} />
        <StatCard label="Late arrivals" value="2" delta="Grace: 15 mins" icon={CalendarClock} tone="down" />
      </div>

      <Tabs defaultValue="log">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="log">Daily Log</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="gps" className="gap-1"><MapPin className="h-3 w-3" /> GPS</TabsTrigger>
          <TabsTrigger value="qr" className="gap-1"><QrCode className="h-3 w-3" /> QR</TabsTrigger>
          <TabsTrigger value="ip" className="gap-1"><Wifi className="h-3 w-3" /> Office IP</TabsTrigger>
          <TabsTrigger value="overtime" className="gap-1"><TrendingUp className="h-3 w-3" /> Overtime</TabsTrigger>
          <TabsTrigger value="late" className="gap-1"><AlertTriangle className="h-3 w-3" /> Late Marks</TabsTrigger>
        </TabsList>

        <TabsContent value="log">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Daily log · July 2026</CardTitle>
              <Badge variant="secondary">Bengaluru shift</Badge>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check-in Coords</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Check-out Coords</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Break</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendance.map((a, i) => (
                    <TableRow key={a.date}>
                      <TableCell className="font-medium">{a.date}</TableCell>
                      <TableCell>{a.status === "Weekend" || a.status === "Leave" ? "—" : a.checkIn}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {a.status === "Weekend" || a.status === "Leave" ? "—" : `12.97${i % 10}6, 77.59${i % 10}6`}
                      </TableCell>
                      <TableCell>{a.status === "Weekend" || a.status === "Leave" ? "—" : a.checkOut}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {a.status === "Weekend" || a.status === "Leave" || !a.checkOut ? "—" : `12.97${i % 10}6, 77.59${i % 10}6`}
                      </TableCell>
                      <TableCell>{a.status === "Weekend" || a.status === "Leave" ? "—" : `${a.hours}h`}</TableCell>
                      <TableCell className="text-muted-foreground">{a.status === "Present" ? "30m" : "—"}</TableCell>
                      <TableCell>
                        <Badge variant={a.status === "Present" ? "default" : a.status === "Leave" ? "destructive" : "outline"}>
                          {a.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader><CardTitle>Attendance Calendar — July 2026</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-xs font-semibold text-muted-foreground py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {/* offset for July 2026 starting on Wednesday */}
                {[0, 1, 2].map((i) => <div key={`e${i}`} />)}
                {calendarDays.map(({ d, isWeekend, isLeave, isFuture }) => (
                  <div
                    key={d}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium border
                      ${isWeekend ? "bg-muted text-muted-foreground border-transparent" :
                        isLeave ? "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400" :
                        isFuture ? "bg-muted/50 text-muted-foreground border-dashed" :
                        "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400"}`}
                  >
                    {d}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs">
                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-emerald-100 border border-emerald-200" /> Present</div>
                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-rose-100 border border-rose-200" /> Leave</div>
                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-muted border" /> Weekend</div>
                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-muted/50 border border-dashed" /> Future</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gps">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MapPin className="h-4 w-4" /> GPS Attendance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border bg-muted/40 h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center space-y-2">
                  <MapPin className="h-10 w-10 mx-auto opacity-40" />
                  <div className="text-sm">Map view — Bengaluru HQ</div>
                  <div className="text-xs">Lat: 12.9716° N · Long: 77.5946° E</div>
                </div>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border p-4">
                  <div className="text-xs text-muted-foreground">Office Geofence</div>
                  <div className="font-semibold mt-1">500m radius</div>
                  <Badge className="mt-2" variant="default">Inside Zone</Badge>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-xs text-muted-foreground">Last GPS Check-in</div>
                  <div className="font-semibold mt-1">9:02 AM</div>
                  <div className="text-xs text-muted-foreground mt-1">Tower B, Bengaluru</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-xs text-muted-foreground">GPS Accuracy</div>
                  <div className="font-semibold mt-1">±8 meters</div>
                  <Badge className="mt-2" variant="secondary">High Accuracy</Badge>
                </div>
              </div>
              <Button className="w-full"><MapPin className="h-4 w-4 mr-2" /> Mark GPS Attendance</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="qr">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><QrCode className="h-4 w-4" /> QR Attendance</CardTitle></CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-6">
              <div className="rounded-2xl border-4 border-primary/20 p-6 bg-white dark:bg-card">
                <div className="h-48 w-48 grid grid-cols-7 gap-0.5">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? "bg-foreground" : "bg-transparent"}`} />
                  ))}
                </div>
              </div>
              <div className="text-center space-y-1">
                <div className="font-semibold">Scan this QR at the office kiosk</div>
                <div className="text-sm text-muted-foreground">Valid for 60 seconds · Refreshes automatically</div>
              </div>
              <Button variant="outline">Regenerate QR</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ip">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Wifi className="h-4 w-4" /> Office IP Attendance</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border p-4 space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Your Current IP</div>
                  <div className="font-mono text-lg font-bold">192.168.1.104</div>
                  <Badge variant="default">Office Network ✓</Badge>
                </div>
                <div className="rounded-lg border p-4 space-y-2">
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">Allowed IP Range</div>
                  <div className="font-mono text-lg font-bold">192.168.1.0/24</div>
                  <Badge variant="secondary">Bengaluru HQ</Badge>
                </div>
              </div>
              <Button className="w-full"><Wifi className="h-4 w-4 mr-2" /> Mark IP Attendance</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overtime">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Overtime Log</CardTitle>
              <Badge variant="secondary">Total: 6h 40m</Badge>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Extra Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overtimeData.map((o) => (
                    <TableRow key={o.date}>
                      <TableCell className="font-medium">{o.date}</TableCell>
                      <TableCell>{o.hours}</TableCell>
                      <TableCell>
                        <Badge variant={o.approved ? "default" : "secondary"}>{o.approved ? "Approved" : "Pending"}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="late">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-500" /> Late Marks</CardTitle>
              <Badge variant="destructive">2 this month</Badge>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Grace Period</TableHead>
                    <TableHead>Late By</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lateMarks.map((l) => (
                    <TableRow key={l.date}>
                      <TableCell className="font-medium">{l.date}</TableCell>
                      <TableCell>{l.checkIn}</TableCell>
                      <TableCell>{l.grace}</TableCell>
                      <TableCell className="text-rose-600 font-medium">{l.late}</TableCell>
                      <TableCell>
                        <Badge variant={l.waived ? "secondary" : "destructive"}>{l.waived ? "Waived" : "Marked"}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
