import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Download, HardDrive, Cloud, Play } from "lucide-react";

export const Route = createFileRoute("/admin/data")({ component: AdminData });

const backups = [
  { id: "BK-2026-192", type: "Full snapshot", size: "482 GB", started: "2026-07-10 02:00", duration: "38m", status: "Success" },
  { id: "BK-2026-191", type: "Incremental", size: "12 GB", started: "2026-07-09 14:00", duration: "6m", status: "Success" },
  { id: "BK-2026-190", type: "Full snapshot", size: "478 GB", started: "2026-07-09 02:00", duration: "35m", status: "Success" },
  { id: "BK-2026-189", type: "Incremental", size: "18 GB", started: "2026-07-08 14:00", duration: "8m", status: "Success" },
  { id: "BK-2026-188", type: "Full snapshot", size: "471 GB", started: "2026-07-08 02:00", duration: "36m", status: "Success" },
];

function AdminData() {
  return (
    <PortalShell role="admin" title="Data & backups" subtitle="Storage, snapshots and disaster recovery"
      actions={<Button><Play className="h-4 w-4 mr-2" /> Run backup now</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total storage" value="1.42 TB" delta="+42 GB this week" icon={HardDrive} />
        <StatCard label="Backups (30d)" value="192" tone="up" icon={Database} />
        <StatCard label="Multi-region replicas" value="3" icon={Cloud} />
        <StatCard label="RPO" value="15 min" tone="up" icon={Database} />
      </div>

      <Card>
        <CardHeader><CardTitle>Backup history</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>ID</TableHead><TableHead>Type</TableHead><TableHead>Size</TableHead>
              <TableHead>Started</TableHead><TableHead>Duration</TableHead>
              <TableHead>Status</TableHead><TableHead className="text-right">Action</TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {backups.map((b) => (
                <TableRow key={b.id}>
                  <TableCell className="font-mono text-xs">{b.id}</TableCell>
                  <TableCell>{b.type}</TableCell>
                  <TableCell>{b.size}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{b.started}</TableCell>
                  <TableCell>{b.duration}</TableCell>
                  <TableCell><Badge>{b.status}</Badge></TableCell>
                  <TableCell className="text-right"><Button variant="ghost" size="sm"><Download className="h-4 w-4 mr-1" />Restore</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
