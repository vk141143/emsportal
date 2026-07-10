import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Calendar, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { teamCalendarEvents } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/calendar")({ component: ManagerCalendar });

const typeColor: Record<string, string> = {
  Meeting: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300",
  Leave: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
  "1:1": "bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-950 dark:text-teal-300",
  Deadline: "bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300",
  Custom: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300",
};

const typeBadge: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  Meeting: "default", Leave: "secondary", "1:1": "outline", Deadline: "destructive", Custom: "secondary",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const JULY_START_DOW = 3;
const JULY_DAYS = 31;

type CalEvent = typeof teamCalendarEvents[0] & { type: string };

function ManagerCalendar() {
  const [events, setEvents] = useState<CalEvent[]>(teamCalendarEvents as CalEvent[]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", date: "", type: "Meeting", attendees: "" });

  const cells: (number | null)[] = [
    ...Array(JULY_START_DOW).fill(null),
    ...Array.from({ length: JULY_DAYS }, (_, i) => i + 1),
  ];

  const eventsByDate = events.reduce<Record<number, CalEvent[]>>((acc, e) => {
    const day = parseInt(e.date.split("-")[2]);
    if (!acc[day]) acc[day] = [];
    acc[day].push(e);
    return acc;
  }, {});

  const handleAdd = () => {
    if (!form.title || !form.date) return;
    const newEvent: CalEvent = {
      id: `CE-${Date.now()}`,
      title: form.title,
      date: form.date,
      type: form.type,
      attendees: form.attendees ? form.attendees.split(",").map((s) => s.trim()) : [],
    };
    setEvents((prev) => [...prev, newEvent]);
    setForm({ title: "", date: "", type: "Meeting", attendees: "" });
    setOpen(false);
  };

  return (
    <PortalShell
      role="manager"
      title="Team Calendar"
      subtitle="Meetings, leaves and deadlines for July 2026"
      actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> Add Event</Button>}
    >
      {/* Add Event Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>Add New Event</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Event Title</Label>
              <Input placeholder="e.g. Sprint Planning" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Date</Label>
              <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Event Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="1:1">1:1</SelectItem>
                  <SelectItem value="Leave">Leave</SelectItem>
                  <SelectItem value="Deadline">Deadline</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Attendees (comma separated)</Label>
              <Input placeholder="Alex Morgan, Aisha Rahman" value={form.attendees} onChange={(e) => setForm({ ...form, attendees: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Calendar Grid */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> July 2026</CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-px">
              {DAYS.map((d) => (
                <div key={d} className="text-center text-xs font-semibold text-muted-foreground py-2">{d}</div>
              ))}
              {cells.map((day, i) => (
                <div
                  key={i}
                  className={`min-h-[72px] rounded-lg p-1.5 text-xs border ${day ? "bg-card hover:bg-muted/50 cursor-pointer" : "bg-transparent border-transparent"}`}
                >
                  {day && (
                    <>
                      <div className={`font-semibold mb-1 ${day === 10 ? "text-primary" : ""}`}>{day}</div>
                      {(eventsByDate[day] || []).map((e) => (
                        <div key={e.id} className={`rounded px-1 py-0.5 mb-0.5 truncate border text-[10px] font-medium ${typeColor[e.type] || typeColor.Custom}`}>
                          {e.title}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader><CardTitle>Upcoming Events</CardTitle></CardHeader>
          <CardContent className="space-y-3 max-h-[520px] overflow-y-auto">
            {[...events].sort((a, b) => a.date.localeCompare(b.date)).map((e) => (
              <div key={e.id} className="flex items-start gap-3 rounded-lg border p-3">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{e.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{e.date}</div>
                  {e.attendees.length > 0 && (
                    <div className="text-xs text-muted-foreground truncate">{e.attendees.join(", ")}</div>
                  )}
                </div>
                <Badge variant={typeBadge[e.type] || "secondary"} className="shrink-0 text-xs">{e.type}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
