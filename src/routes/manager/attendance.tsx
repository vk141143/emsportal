import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import {
  Users, UserCheck, UserX, Clock, CalendarX, LogIn, StopCircle,
  Coffee, Timer, MapPin, Navigation, BarChart2, X,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis,
  Tooltip, CartesianGrid, Legend,
} from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { attendanceTrend, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/attendance")({ component: ManagerAttendance });

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

function ManagerAttendance() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [showCharts, setShowCharts] = useState(false);
  const [locationModal, setLocationModal] = useState<{ open: boolean; type: "in" | "out" }>({ open: false, type: "in" });

  const team = employees.filter((e) => e.department === "Engineering");

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
      title="Team Attendance"
      subtitle="Real-time presence and shift compliance"
      actions={
        <div className="flex gap-2">
          <Button
            variant={showCharts ? "default" : "outline"}
            size="sm"
            onClick={() => setShowCharts(!showCharts)}
          >
            {showCharts ? <><X className="h-4 w-4 mr-1.5" />Hide Charts</> : <><BarChart2 className="h-4 w-4 mr-1.5" />Charts</>}
          </Button>
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

      {/* My attendance card */}
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

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Present today" value="7 / 8" tone="up" icon={LogIn} />
        <StatCard label="On leave" value="1" icon={CalendarX} />
        <StatCard label="Avg. hours (wk)" value="41h 20m" tone="up" icon={Clock} />
        <StatCard label="Late arrivals" value="3" tone="down" icon={Users} />
      </div>

      {/* Charts — only shown when toggled */}
      {showCharts && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold">Attendance Trend (Line)</CardTitle></CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={attendanceTrend}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="present" stroke="hsl(160 84% 39%)" strokeWidth={2} name="Present" />
                    <Line type="monotone" dataKey="leave" stroke="hsl(38 92% 50%)" strokeWidth={2} name="Leave" />
                    <Line type="monotone" dataKey="absent" stroke="hsl(0 84% 60%)" strokeWidth={2} name="Absent" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold">Attendance Trend (Bar)</CardTitle></CardHeader>
            <CardContent>
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={attendanceTrend} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="present" fill="#6366f1" radius={[3, 3, 0, 0]} name="Present" />
                    <Bar dataKey="absent" fill="#f43f5e" radius={[3, 3, 0, 0]} name="Absent" />
                    <Bar dataKey="leave" fill="#f59e0b" radius={[3, 3, 0, 0]} name="Leave" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader><CardTitle>Today · July 10, 2026</CardTitle></CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Check-in</TableHead>
                <TableHead>Check-in Coords</TableHead>
                <TableHead>Check-out</TableHead>
                <TableHead>Check-out Coords</TableHead>
                <TableHead>Hours</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {team.map((e, i) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8"><AvatarFallback>{e.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                      <div>
                        <div className="font-medium text-sm">{e.name}</div>
                        <div className="text-xs text-muted-foreground">{e.jobTitle}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{e.location}</TableCell>
                  <TableCell>
                    <Badge variant={i === 2 ? "destructive" : "default"}>{i === 2 ? "On Leave" : "Present"}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">{i === 2 ? "—" : `09:${10 + i}0 AM`}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {i === 2 ? "—" : `12.97${i}6, 77.59${i}6`}
                  </TableCell>
                  <TableCell className="text-sm">{i === 2 ? "—" : i < 3 ? "—" : `06:${30 + i}0 PM`}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {i === 2 || i < 3 ? "—" : `12.97${i}6, 77.59${i}6`}
                  </TableCell>
                  <TableCell className="text-sm">{i === 2 ? "—" : `${7 + (i % 2)}h ${20 + i}m`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
