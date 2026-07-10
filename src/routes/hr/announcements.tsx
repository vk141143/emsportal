import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Megaphone, Pin, Bell, Plus } from "lucide-react";
import { hrAnnouncements } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/announcements")({ component: HRAnnouncements });

const tagColor: Record<string, string> = {
  Performance: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Policy: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Onboarding: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Payroll: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Compliance: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

function AnnouncementCard({ a, pinned = false }: { a: typeof hrAnnouncements[0]; pinned?: boolean }) {
  return (
    <Card className={pinned ? "border-primary/30 bg-primary/5" : "hover:shadow-sm transition-shadow"}>
      <CardContent className="pt-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${pinned ? "bg-primary/10" : "bg-muted"}`}>
              <Megaphone className={`h-4 w-4 ${pinned ? "text-primary" : "text-muted-foreground"}`} />
            </div>
            <div className="min-w-0">
              <div className="font-semibold truncate">{a.title}</div>
              <div className="text-sm text-muted-foreground mt-1">{a.body}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tagColor[a.tag] || "bg-muted text-muted-foreground"}`}>{a.tag}</span>
            <span className="text-xs text-muted-foreground">{a.date}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function HRAnnouncements() {
  const pinned = hrAnnouncements.filter((a) => a.pinned);
  const rest = hrAnnouncements.filter((a) => !a.pinned);

  return (
    <PortalShell
      role="hr"
      title="Announcements"
      subtitle="Company-wide HR communications"
      actions={
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> New Announcement</Button></DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Create Announcement</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1.5"><Label>Title</Label><Input placeholder="Announcement title" /></div>
              <div className="space-y-1.5">
                <Label>Message</Label>
                <Textarea placeholder="Write your announcement…" className="min-h-[100px]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Tag</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select tag" /></SelectTrigger>
                    <SelectContent>
                      {["Performance", "Policy", "Onboarding", "Payroll", "Compliance"].map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5"><Label>Date</Label><Input type="date" defaultValue="2026-07-10" /></div>
              </div>
              <Button className="w-full">Publish Announcement</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({hrAnnouncements.length})</TabsTrigger>
          <TabsTrigger value="pinned"><Pin className="h-3.5 w-3.5 mr-1" /> Pinned ({pinned.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {pinned.length > 0 && (
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <Pin className="h-3.5 w-3.5" /> Pinned
              </div>
              {pinned.map((a) => <AnnouncementCard key={a.id} a={a} pinned />)}
            </div>
          )}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Bell className="h-3.5 w-3.5" /> Recent
            </div>
            {rest.map((a) => <AnnouncementCard key={a.id} a={a} />)}
          </div>
        </TabsContent>

        <TabsContent value="pinned">
          <div className="space-y-3">
            {pinned.map((a) => <AnnouncementCard key={a.id} a={a} pinned />)}
          </div>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
