import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { UserCheck, UserX, Clock, CalendarX, CheckCircle2, XCircle, MapPin, Navigation } from "lucide-react";
import { BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { attendanceTrend, employees } from "@/lib/mock-data";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/hr/attendance")({ component: HRAttendance });

const corrections = [
  { id: "AC-01", employee: "Alex Morgan", date: "2026-07-09", type: "Missing Check-in", reason: "Forgot to tap in", status: "Pending" },
  { id: "AC-02", employee: "Kenji Tanaka", date: "2026-07-08", type: "Wrong Location", reason: "Worked from client site", status: "Pending" },
  { id: "AC-03", employee: "Nina Patel", date: "2026-07-07", type: "Missing Check-out", reason: "System error", status: "Approved" },
];

function HRAttendance() {
  return (
    <PortalShell role="hr" title="Attendance" subtitle="Company-wide attendance tracking and corrections">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Present Today" value="1,145" delta="92.3% of workforce" icon={UserCheck} tone="up" />
        <StatCard label="Absent Today" value="57" delta="4.6% absent" icon={UserX} tone="down" />
        <StatCard label="Late Arrivals" value="23" delta="After 9:30 AM" icon={Clock} tone="down" />
        <StatCard label="On Leave" value="38" delta="Approved leaves" icon={CalendarX} />
      </div>

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today's Attendance</TabsTrigger>
          <TabsTrigger value="trend">Weekly Trend</TabsTrigger>
          <TabsTrigger value="corrections">Corrections ({corrections.filter(c => c.status === "Pending").length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <Card>
            <CardHeader><CardTitle>Today · July 10, 2026</CardTitle></CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Employee</TableHead><TableHead>Department</TableHead>
                  <TableHead>Status</TableHead><TableHead>Check-in</TableHead>
                  <TableHead>Check-in Coords</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Check-out Coords</TableHead>
                  <TableHead>Hours</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {employees.map((e, i) => (
                    <TableRow key={e.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{e.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                          <div><div className="font-medium text-sm">{e.name}</div><div className="text-xs text-muted-foreground">{e.jobTitle}</div></div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{e.department}</Badge></TableCell>
                      <TableCell>
                        <Badge variant={e.status === "On Leave" ? "secondary" : i % 7 === 3 ? "destructive" : "default"}>
                          {e.status === "On Leave" ? "On Leave" : i % 7 === 3 ? "Late" : "Present"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{e.status === "On Leave" ? "—" : `09:${String(i % 6).padStart(2, "0")} AM`}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {e.status === "On Leave" ? "—" : `12.97${i % 10}6, 77.59${i % 10}6`}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{e.status === "On Leave" ? "—" : i < 3 ? "—" : `06:${30 + (i % 10)}0 PM`}</TableCell>
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {e.status === "On Leave" || i < 3 ? "—" : `12.97${i % 10}6, 77.59${i % 10}6`}
                      </TableCell>
                      <TableCell className="text-sm">{e.status === "On Leave" ? "—" : `${7 + (i % 2)}h ${20 + (i % 40)}m`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trend">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Weekly Attendance Breakdown</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Legend />
                      <Bar dataKey="present" stackId="a" fill="hsl(160 84% 39%)" />
                      <Bar dataKey="leave" stackId="a" fill="hsl(38 92% 50%)" />
                      <Bar dataKey="absent" stackId="a" fill="hsl(0 84% 60%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Presence Rate Trend</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={attendanceTrend}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                      <Line type="monotone" dataKey="present" stroke="hsl(160 84% 39%)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="corrections">
          <Card>
            <CardHeader><CardTitle>Attendance Correction Requests</CardTitle></CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>ID</TableHead><TableHead>Employee</TableHead><TableHead>Date</TableHead>
                  <TableHead>Type</TableHead><TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {corrections.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.id}</TableCell>
                      <TableCell className="font-medium">{c.employee}</TableCell>
                      <TableCell>{c.date}</TableCell>
                      <TableCell><Badge variant="outline">{c.type}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.reason}</TableCell>
                      <TableCell><Badge variant={c.status === "Approved" ? "default" : "secondary"}>{c.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        {c.status === "Pending" && (
                          <>
                            <Button variant="ghost" size="sm" className="text-emerald-600"><CheckCircle2 className="h-4 w-4 mr-1" /> Approve</Button>
                            <Button variant="ghost" size="sm" className="text-rose-600"><XCircle className="h-4 w-4 mr-1" /> Reject</Button>
                          </>
                        )}
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
