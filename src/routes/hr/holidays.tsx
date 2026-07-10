import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Plus, Globe, Flag } from "lucide-react";
import { holidays } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/holidays")({ component: HRHolidays });

const typeColor: Record<string, string> = {
  National: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Festival: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
};

const typeBadge: Record<string, "default" | "secondary" | "outline"> = {
  National: "default",
  Festival: "secondary",
};

function HRHolidays() {
  const national = holidays.filter((h) => h.type === "National").length;
  const festival = holidays.filter((h) => h.type === "Festival").length;
  const upcoming = holidays.filter((h) => h.date >= "2026-07-10").length;

  return (
    <PortalShell
      role="hr"
      title="Holiday Calendar"
      subtitle="Company holidays for 2026"
      actions={
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Add Holiday</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Holiday</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1.5"><Label>Holiday Name</Label><Input placeholder="e.g. Diwali" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Date</Label><Input type="date" /></div>
                <div className="space-y-1.5">
                  <Label>Type</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="National">National</SelectItem>
                      <SelectItem value="Festival">Festival</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Applicable To</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Locations</SelectItem>
                    <SelectItem value="India">India</SelectItem>
                    <SelectItem value="US">US</SelectItem>
                    <SelectItem value="EU">EU</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Add Holiday</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Holidays" value={String(holidays.length)} icon={Calendar} />
        <StatCard label="National Holidays" value={String(national)} icon={Flag} />
        <StatCard label="Upcoming" value={String(upcoming)} delta="From today" tone="up" icon={Globe} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Holiday List — 2026</CardTitle></CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader><TableRow>
                <TableHead>Holiday</TableHead><TableHead>Date</TableHead>
                <TableHead>Type</TableHead><TableHead>Applicable To</TableHead>
              </TableRow></TableHeader>
              <TableBody>
                {holidays.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell className="font-medium">{h.name}</TableCell>
                    <TableCell>{h.date}</TableCell>
                    <TableCell><Badge variant={typeBadge[h.type]}>{h.type}</Badge></TableCell>
                    <TableCell>
                      <Badge variant="outline">{h.applicable}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Upcoming Holidays</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {holidays.filter((h) => h.date >= "2026-07-10").map((h) => (
              <div key={h.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className={`h-10 w-10 rounded-lg grid place-items-center shrink-0 text-xs font-bold ${typeColor[h.type]}`}>
                  {new Date(h.date).toLocaleDateString("en", { month: "short" }).toUpperCase()}
                  <br />
                  {new Date(h.date).getDate()}
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{h.name}</div>
                  <div className="text-xs text-muted-foreground">{h.applicable} · {h.type}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
