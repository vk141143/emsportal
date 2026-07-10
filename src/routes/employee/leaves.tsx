import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, PlaneTakeoff, Stethoscope, Home, Clock } from "lucide-react";
import { leaveRequests } from "@/lib/mock-data";

export const Route = createFileRoute("/employee/leaves")({ component: EmployeeLeaves });

const balances = [
  { type: "Casual Leave", used: 4, total: 12, icon: Calendar, color: "bg-sky-500" },
  { type: "Sick Leave", used: 2, total: 10, icon: Stethoscope, color: "bg-rose-500" },
  { type: "Annual Leave", used: 7, total: 20, icon: PlaneTakeoff, color: "bg-emerald-500" },
  { type: "Work From Home", used: 3, total: 24, icon: Home, color: "bg-violet-500" },
];

const calendarLeaves = [
  { date: "Jul 6", type: "Sick Leave", status: "Approved" },
  { date: "Jul 14–16", type: "Casual Leave", status: "Pending" },
  { date: "Jul 20–27", type: "Annual Leave", status: "Pending" },
];

function ApplyLeaveDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" /> Apply for Leave</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Apply for Leave</DialogTitle></DialogHeader>
        <div className="grid gap-4 py-2">
          <div className="grid gap-2">
            <Label>Leave type</Label>
            <Select defaultValue="casual">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual Leave</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="annual">Annual Leave</SelectItem>
                <SelectItem value="wfh">Work From Home</SelectItem>
                <SelectItem value="comp">Compensatory Off</SelectItem>
                <SelectItem value="maternity">Maternity Leave</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2"><Label>From</Label><Input type="date" /></div>
            <div className="grid gap-2"><Label>To</Label><Input type="date" /></div>
          </div>
          <div className="grid gap-2">
            <Label>Half day?</Label>
            <Select defaultValue="full">
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Day</SelectItem>
                <SelectItem value="first">First Half</SelectItem>
                <SelectItem value="second">Second Half</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2"><Label>Reason</Label><Textarea rows={3} placeholder="Brief description…" /></div>
          <div className="grid gap-2"><Label>Handover to (optional)</Label><Input placeholder="Colleague name" /></div>
        </div>
        <DialogFooter><Button>Submit Request</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function EmployeeLeaves() {
  return (
    <PortalShell role="employee" title="Leave" subtitle="Balances, requests and calendar" actions={<ApplyLeaveDialog />}>
      <div className="grid gap-4 md:grid-cols-4">
        {balances.map((b) => (
          <StatCard key={b.type} label={b.type} value={`${b.total - b.used} days`} delta={`${b.used} used of ${b.total}`} icon={b.icon} tone="up" />
        ))}
      </div>

      <Tabs defaultValue="balance">
        <TabsList>
          <TabsTrigger value="balance">Leave Balance</TabsTrigger>
          <TabsTrigger value="history">Leave History</TabsTrigger>
          <TabsTrigger value="calendar">Leave Calendar</TabsTrigger>
        </TabsList>

        <TabsContent value="balance">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Utilization</CardTitle></CardHeader>
              <CardContent className="space-y-5">
                {balances.map((b) => (
                  <div key={b.type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${b.color}`} />
                        <span className="font-medium">{b.type}</span>
                      </div>
                      <span className="text-muted-foreground">{b.used} used / {b.total} total</span>
                    </div>
                    <Progress value={(b.used / b.total) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground">{b.total - b.used} days remaining</div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4" /> Leave Policy</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  ["Carry forward limit", "10 days (Casual + Annual)"],
                  ["Encashment", "Up to 5 days/year"],
                  ["Notice period", "2 days for casual, 7 days for annual"],
                  ["Sick leave proof", "Medical certificate for >2 days"],
                  ["WFH limit", "Max 3 days/week"],
                  ["Comp off validity", "30 days from earned date"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b pb-2 last:border-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium text-right max-w-[55%]">{v}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader><CardTitle>My Leave Requests</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
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
                  {leaveRequests.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell>{r.from}</TableCell>
                      <TableCell>{r.to}</TableCell>
                      <TableCell>{r.days}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{r.reason}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === "Approved" ? "default" : r.status === "Rejected" ? "destructive" : "secondary"}>
                          {r.status}
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
            <CardHeader><CardTitle>Leave Calendar — July 2026</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                  <div key={d} className="text-xs font-semibold text-muted-foreground py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {[0, 1, 2].map((i) => <div key={`e${i}`} />)}
                {Array.from({ length: 31 }, (_, i) => {
                  const d = i + 1;
                  const isWeekend = [6, 7, 13, 14, 20, 21, 27, 28].includes(d);
                  const isLeave = d === 6;
                  const isPending = [14, 15, 16, 20, 21, 22, 23, 24, 25, 26, 27].includes(d);
                  return (
                    <div key={d} className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium border
                      ${isWeekend ? "bg-muted text-muted-foreground border-transparent" :
                        isLeave ? "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400" :
                        isPending ? "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400" :
                        "bg-card border-border"}`}>
                      {d}
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-4 text-xs mt-2">
                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-rose-100 border border-rose-200" /> Approved Leave</div>
                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-amber-100 border border-amber-200" /> Pending Leave</div>
                <div className="flex items-center gap-1.5"><div className="h-3 w-3 rounded bg-muted border" /> Weekend</div>
              </div>
              <div className="space-y-2 mt-4">
                <div className="text-sm font-semibold">Upcoming Leaves</div>
                {calendarLeaves.map((l) => (
                  <div key={l.date} className="flex items-center justify-between rounded-lg border p-3">
                    <div>
                      <div className="text-sm font-medium">{l.date}</div>
                      <div className="text-xs text-muted-foreground">{l.type}</div>
                    </div>
                    <Badge variant={l.status === "Approved" ? "default" : "secondary"}>{l.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
