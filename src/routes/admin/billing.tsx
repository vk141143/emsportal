import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, DollarSign, AlertCircle, Download, TrendingUp } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { revenueTrend } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/billing")({ component: AdminBilling });

const invoices = [
  { id: "INV-2026-072", tenant: "Wayne Enterprises", amount: 104000, due: "2026-07-15", status: "Paid" },
  { id: "INV-2026-071", tenant: "Hooli", amount: 68000, due: "2026-07-15", status: "Paid" },
  { id: "INV-2026-070", tenant: "Umbrella Inc", amount: 42000, due: "2026-07-15", status: "Paid" },
  { id: "INV-2026-069", tenant: "Acme Corp", amount: 24800, due: "2026-07-15", status: "Paid" },
  { id: "INV-2026-068", tenant: "Globex Ltd", amount: 4800, due: "2026-07-15", status: "Sent" },
  { id: "INV-2026-067", tenant: "Soylent Co", amount: 3150, due: "2026-07-01", status: "Overdue" },
];

function AdminBilling() {
  return (
    <PortalShell role="admin" title="Billing & subscriptions" subtitle="Revenue, invoices and dunning"
      actions={<Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="MRR" value="$278.7K" tone="up" delta="+6.8%" icon={DollarSign} />
        <StatCard label="ARR" value="$3.34M" tone="up" icon={TrendingUp} />
        <StatCard label="Outstanding" value="$7.95K" icon={CreditCard} />
        <StatCard label="Overdue" value="1" tone="down" icon={AlertCircle} />
      </div>

      <Card>
        <CardHeader><CardTitle>MRR by month</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="mrr" fill="hsl(38 92% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Invoices</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Invoice</TableHead><TableHead>Tenant</TableHead>
              <TableHead>Amount</TableHead><TableHead>Due</TableHead>
              <TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {invoices.map((i) => (
                <TableRow key={i.id}>
                  <TableCell className="font-mono text-xs">{i.id}</TableCell>
                  <TableCell className="font-medium">{i.tenant}</TableCell>
                  <TableCell className="font-semibold">${i.amount.toLocaleString()}</TableCell>
                  <TableCell>{i.due}</TableCell>
                  <TableCell><Badge variant={i.status === "Paid" ? "default" : i.status === "Overdue" ? "destructive" : "secondary"}>{i.status}</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm">View</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
