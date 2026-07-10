import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckSquare, Clock, XCircle, Plus } from "lucide-react";
import { leaveRequests } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/leaves")({ component: AdminLeaves });

const statusColor: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
};

const leaveTypes = [
  { name: "Casual Leave", days: 15, used: 8, color: "bg-violet-500" },
  { name: "Sick Leave", days: 12, used: 5, color: "bg-rose-500" },
  { name: "Annual Leave", days: 21, used: 12, color: "bg-blue-500" },
  { name: "Maternity Leave", days: 180, used: 0, color: "bg-pink-500" },
  { name: "Paternity Leave", days: 15, used: 0, color: "bg-teal-500" },
  { name: "Work From Home", days: 60, used: 22, color: "bg-amber-500" },
];

function AdminLeaves() {
  const [tab, setTab] = useState("requests");

  return (
    <PortalShell
      role="admin"
      title="Leave Management"
      subtitle="Leave types, policies, approvals, and reports"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Create Leave Type</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Pending Requests" value={String(leaveRequests.filter((l) => l.status === "Pending").length)} icon={Clock} tone="down" color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Approved" value={String(leaveRequests.filter((l) => l.status === "Approved").length)} icon={CheckSquare} tone="up" color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Rejected" value={String(leaveRequests.filter((l) => l.status === "Rejected").length)} icon={XCircle} color="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" />
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="requests">Leave Requests</TabsTrigger>
          <TabsTrigger value="types">Leave Types</TabsTrigger>
          <TabsTrigger value="policy">Policy Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Employee</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">From</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">To</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Days</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Reason</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((l) => (
                    <tr key={l.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{l.employee}</td>
                      <td className="px-4 py-3 text-muted-foreground">{l.type}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{l.from}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{l.to}</td>
                      <td className="px-4 py-3">{l.days}d</td>
                      <td className="px-4 py-3 text-muted-foreground max-w-[160px] truncate">{l.reason}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs ${statusColor[l.status]}`} variant="outline">{l.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        {l.status === "Pending" && (
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline" className="h-6 text-xs px-2 text-emerald-600 border-emerald-200">Approve</Button>
                            <Button size="sm" variant="outline" className="h-6 text-xs px-2 text-rose-600 border-rose-200">Reject</Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="types">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {leaveTypes.map((lt) => (
              <Card key={lt.name} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`h-3 w-3 rounded-full ${lt.color}`} />
                    <span className="font-semibold text-sm">{lt.name}</span>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Allotted</span>
                      <span className="font-medium">{lt.days} days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Avg Used</span>
                      <span className="font-medium">{lt.used} days</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3 h-7 text-xs">Edit Policy</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="policy">
          <Card>
            <CardHeader><CardTitle className="text-sm font-semibold">Leave Policy Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Carry forward unused leaves", value: "Up to 10 days" },
                { label: "Leave encashment", value: "Enabled (max 15 days)" },
                { label: "Approval workflow", value: "Manager → HR" },
                { label: "Minimum notice period", value: "2 days" },
                { label: "Medical certificate required", value: "After 3 sick days" },
                { label: "Leave year reset", value: "April 1st" },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <Badge variant="outline" className="text-xs">{item.value}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
