import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarCheck, CalendarX, Users, Clock, CheckCircle2, XCircle, BarChart2 } from "lucide-react";
import { leaveRequests, attendanceTrend } from "@/lib/mock-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from "recharts";

export const Route = createFileRoute("/hr/leaves")({ component: HRLeaves });

function HRLeaves() {
  const [showCharts, setShowCharts] = useState(false);

  return (
    <PortalShell role="hr" title="Leave & Attendance" subtitle="Company-wide time-off and shift compliance"
      actions={
        <Button variant={showCharts ? "default" : "outline"} onClick={() => setShowCharts((v) => !v)}>
          <BarChart2 className="h-4 w-4 mr-2" />{showCharts ? "Hide Analytics" : "Show Analytics"}
        </Button>
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="On leave today" value="38" icon={CalendarX} />
        <StatCard label="Present today" value="1,145" tone="up" icon={CalendarCheck} />
        <StatCard label="Pending requests" value="17" icon={Clock} />
        <StatCard label="Avg. utilization" value="72%" tone="up" icon={Users} />
      </div>

      {showCharts && (
        <Card>
          <CardHeader><CardTitle>Weekly Attendance</CardTitle></CardHeader>
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
      )}

      <Card>
        <CardHeader><CardTitle>All Leave Requests</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Employee</TableHead><TableHead>Type</TableHead>
              <TableHead>From</TableHead><TableHead>To</TableHead><TableHead>Days</TableHead>
              <TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {leaveRequests.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell className="font-medium">{r.employee}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell>{r.from}</TableCell>
                  <TableCell>{r.to}</TableCell>
                  <TableCell>{r.days}</TableCell>
                  <TableCell><Badge variant={r.status === "Approved" ? "default" : r.status === "Rejected" ? "destructive" : "secondary"}>{r.status}</Badge></TableCell>
                  <TableCell className="text-right">
                    {r.status === "Pending" ? (
                      <>
                        <Button variant="ghost" size="sm" className="text-emerald-600"><CheckCircle2 className="h-4 w-4 mr-1" />Approve</Button>
                        <Button variant="ghost" size="sm" className="text-rose-600"><XCircle className="h-4 w-4 mr-1" />Reject</Button>
                      </>
                    ) : <Button variant="ghost" size="sm">View</Button>}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
