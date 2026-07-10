import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Plus, MoreHorizontal, Globe } from "lucide-react";
import { tenants } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/tenants")({ component: AdminTenants });

function AdminTenants() {
  return (
    <PortalShell role="admin" title="Tenants" subtitle="Manage customer workspaces and provisioning"
      actions={<Button><Plus className="h-4 w-4 mr-2" /> New tenant</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active tenants" value="6" icon={Building2} />
        <StatCard label="On trial" value="1" icon={Globe} />
        <StatCard label="Past due" value="1" tone="down" icon={Building2} />
        <StatCard label="Enterprise deals" value="4" tone="up" icon={Building2} />
      </div>

      <Card>
        <CardHeader><CardTitle>All tenants</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Tenant</TableHead><TableHead>Plan</TableHead><TableHead>Seats</TableHead>
              <TableHead>MRR</TableHead><TableHead>Region</TableHead><TableHead>Since</TableHead>
              <TableHead>Status</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {tenants.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 grid place-items-center text-white font-bold text-sm">
                        {t.name[0]}
                      </div>
                      <div><div className="font-medium">{t.name}</div><div className="text-xs text-muted-foreground font-mono">{t.id}</div></div>
                    </div>
                  </TableCell>
                  <TableCell><Badge variant={t.plan === "Enterprise" ? "default" : "outline"}>{t.plan}</Badge></TableCell>
                  <TableCell>{t.seats.toLocaleString()}</TableCell>
                  <TableCell className="font-semibold">${(t.mrr / 1000).toFixed(1)}K</TableCell>
                  <TableCell>{t.region}</TableCell>
                  <TableCell className="text-muted-foreground">{t.since}</TableCell>
                  <TableCell>
                    <Badge variant={t.status === "Active" ? "default" : t.status === "Trial" ? "secondary" : "destructive"}>{t.status}</Badge>
                  </TableCell>
                  <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
