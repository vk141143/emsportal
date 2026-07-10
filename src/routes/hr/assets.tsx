import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Laptop, Plus, MoreHorizontal, CheckCircle2, Package } from "lucide-react";
import { assets, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/assets")({ component: HRAssets });

function HRAssets() {
  const inUse = assets.filter((a) => a.status === "In Use").length;
  const available = assets.filter((a) => a.status === "Available").length;

  return (
    <PortalShell
      role="hr"
      title="Assets"
      subtitle="Track and manage company assets"
      actions={
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Add Asset</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Asset</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1.5"><Label>Asset Name</Label><Input placeholder="e.g. MacBook Pro 16" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                    <SelectContent>{["Laptop", "Monitor", "Mobile", "Tablet", "Keyboard", "Other"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5"><Label>Serial Number</Label><Input placeholder="Serial #" /></div>
              </div>
              <div className="space-y-1.5">
                <Label>Assign To</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
                  <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Button className="w-full">Add Asset</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Assets" value={String(assets.length)} icon={Package} />
        <StatCard label="In Use" value={String(inUse)} tone="up" icon={Laptop} />
        <StatCard label="Available" value={String(available)} icon={CheckCircle2} />
      </div>

      <Card>
        <CardHeader><CardTitle>Asset Inventory</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader><TableRow>
              <TableHead>Asset ID</TableHead><TableHead>Name</TableHead>
              <TableHead>Type</TableHead><TableHead>Serial Number</TableHead>
              <TableHead>Assigned To</TableHead><TableHead>Assigned Date</TableHead>
              <TableHead>Status</TableHead><TableHead></TableHead>
            </TableRow></TableHeader>
            <TableBody>
              {assets.map((a) => (
                <TableRow key={a.id}>
                  <TableCell className="font-mono text-xs">{a.id}</TableCell>
                  <TableCell className="font-medium">{a.name}</TableCell>
                  <TableCell><Badge variant="outline">{a.type}</Badge></TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{a.serial}</TableCell>
                  <TableCell>{a.assignedTo}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{a.assigned}</TableCell>
                  <TableCell>
                    <Badge variant={a.status === "In Use" ? "default" : "secondary"}>{a.status}</Badge>
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
