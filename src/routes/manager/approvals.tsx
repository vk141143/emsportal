import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle2, XCircle, Clock, DollarSign, ClipboardCheck } from "lucide-react";
import { leaveRequests } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/approvals")({ component: ManagerApprovals });

const expenses = [
  { id: "EX-081", employee: "Alex Morgan", category: "Travel", amount: 428, date: "2026-07-05", status: "Pending" },
  { id: "EX-082", employee: "Aisha Rahman", category: "Software", amount: 89, date: "2026-07-06", status: "Pending" },
  { id: "EX-083", employee: "Nina Patel", category: "Client Dinner", amount: 210, date: "2026-07-08", status: "Pending" },
];

function ManagerApprovals() {
  return (
    <PortalShell role="manager" title="Approvals inbox" subtitle="Leaves, expenses and access requests awaiting your decision">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total pending" value="8" delta="Avg. wait 1.2 days" icon={ClipboardCheck} />
        <StatCard label="Leaves" value="3" icon={Clock} />
        <StatCard label="Expenses" value="3" delta="$727 total" icon={DollarSign} />
        <StatCard label="Approved (30d)" value="42" tone="up" icon={CheckCircle2} />
      </div>

      <Tabs defaultValue="leaves">
        <TabsList>
          <TabsTrigger value="leaves">Leaves (3)</TabsTrigger>
          <TabsTrigger value="expenses">Expenses (3)</TabsTrigger>
          <TabsTrigger value="access">Access (2)</TabsTrigger>
        </TabsList>

        <TabsContent value="leaves">
          <Card><CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>ID</TableHead><TableHead>Employee</TableHead><TableHead>Type</TableHead>
                <TableHead>Dates</TableHead><TableHead>Days</TableHead><TableHead>Reason</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {leaveRequests.filter((r) => r.status === "Pending").map((r) => (
                  <TableRow key={r.id}>
                    <TableCell className="font-mono text-xs">{r.id}</TableCell>
                    <TableCell className="font-medium">{r.employee}</TableCell>
                    <TableCell>{r.type}</TableCell>
                    <TableCell>{r.from} → {r.to}</TableCell>
                    <TableCell>{r.days}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{r.reason}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-emerald-600"><CheckCircle2 className="h-4 w-4 mr-1" /> Approve</Button>
                      <Button variant="ghost" size="sm" className="text-rose-600"><XCircle className="h-4 w-4 mr-1" /> Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card><CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>ID</TableHead><TableHead>Employee</TableHead><TableHead>Category</TableHead>
                <TableHead>Amount</TableHead><TableHead>Date</TableHead><TableHead className="text-right">Action</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {expenses.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-mono text-xs">{e.id}</TableCell>
                    <TableCell className="font-medium">{e.employee}</TableCell>
                    <TableCell><Badge variant="outline">{e.category}</Badge></TableCell>
                    <TableCell className="font-semibold">${e.amount}</TableCell>
                    <TableCell>{e.date}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-emerald-600"><CheckCircle2 className="h-4 w-4 mr-1" /> Approve</Button>
                      <Button variant="ghost" size="sm" className="text-rose-600"><XCircle className="h-4 w-4 mr-1" /> Reject</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent></Card>
        </TabsContent>

        <TabsContent value="access">
          <Card><CardContent className="p-6 text-sm text-muted-foreground">2 access requests: GitHub prod repo, Datadog admin. Review in Access Governance.</CardContent></Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
