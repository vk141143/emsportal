import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/shifts")({ component: AdminShifts });

const shifts = [
  { id: "S-01", name: "General Shift", start: "09:00 AM", end: "06:00 PM", days: "Mon–Fri", employees: 180, type: "Fixed" },
  { id: "S-02", name: "Morning Shift", start: "06:00 AM", end: "02:00 PM", days: "Mon–Sat", employees: 32, type: "Fixed" },
  { id: "S-03", name: "Evening Shift", start: "02:00 PM", end: "10:00 PM", days: "Mon–Sat", employees: 28, type: "Fixed" },
  { id: "S-04", name: "Night Shift", start: "10:00 PM", end: "06:00 AM", days: "Mon–Sun", employees: 8, type: "Fixed" },
  { id: "S-05", name: "Flexible", start: "Flexible", end: "Flexible", days: "Mon–Fri", employees: 0, type: "Flexible" },
];

function AdminShifts() {
  return (
    <PortalShell
      role="admin"
      title="Shift Management"
      subtitle="Configure work shifts, rotations, and schedules"
      actions={<Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Create Shift</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Shifts" value={String(shifts.length)} icon={Calendar} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Employees Assigned" value={String(shifts.reduce((a, s) => a + s.employees, 0))} icon={Calendar} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Flexible Workers" value="0" icon={Calendar} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {shifts.map((s) => (
          <Card key={s.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">{s.name}</CardTitle>
                <Badge variant={s.type === "Flexible" ? "secondary" : "outline"} className="text-xs">{s.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hours</span>
                <span className="font-medium">{s.start} – {s.end}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Working Days</span>
                <span className="font-medium">{s.days}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Employees</span>
                <Badge variant="secondary">{s.employees}</Badge>
              </div>
              <div className="flex gap-2 pt-1">
                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">Edit</Button>
                <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">Assign</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
