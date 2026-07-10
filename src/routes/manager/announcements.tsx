import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Megaphone, Plus, Pin, Bell } from "lucide-react";
import { useState } from "react";
import { announcements } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/announcements")({ component: ManagerAnnouncements });

const initAnnouncements = [
  { title: "Sprint 24 kickoff — Monday 10am", body: "We're starting Sprint 24 with a focus on auth v2 and mobile app. Please review your assigned tasks before the standup.", tag: "Sprint", date: "2026-07-10", pinned: true },
  { title: "Code review guidelines updated", body: "New PR review checklist is live in Confluence. All PRs must have at least 2 approvals from now on.", tag: "Process", date: "2026-07-08", pinned: false },
  { title: "Team lunch — Friday 1pm", body: "Celebrating Nina's project completion! Venue: The Terrace. RSVP by Thursday.", tag: "Team", date: "2026-07-07", pinned: false },
  ...announcements.map((a) => ({ ...a, pinned: false })),
];

const tagColor: Record<string, string> = {
  Sprint: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  Process: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  Team: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Company: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  Benefits: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300",
  Compliance: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

function ManagerAnnouncements() {
  const [allAnnouncements, setAllAnnouncements] = useState(initAnnouncements);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", tag: "Team", pinned: false });

  const handleAdd = () => {
    if (!form.title || !form.body) return;
    setAllAnnouncements((prev) => [{ ...form, date: new Date().toISOString().split("T")[0] }, ...prev]);
    setForm({ title: "", body: "", tag: "Team", pinned: false });
    setOpen(false);
  };

  const pinned = allAnnouncements.filter((a) => a.pinned);
  const rest = allAnnouncements.filter((a) => !a.pinned);

  return (
    <PortalShell
      role="manager"
      title="Announcements"
      subtitle="Team and company-wide updates"
      actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> New Announcement</Button>}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader><DialogTitle>New Announcement</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="Announcement title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Body</Label>
              <Textarea rows={3} placeholder="Announcement details…" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Tag</Label>
              <Select value={form.tag} onValueChange={(v) => setForm({ ...form, tag: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["Sprint", "Process", "Team", "Company", "Benefits", "Compliance"].map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} className="rounded" />
              Pin this announcement
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Post Announcement</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {pinned.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Pin className="h-3.5 w-3.5" /> Pinned
          </div>
          {pinned.map((a, i) => (
            <Card key={i} className="border-primary/30 bg-primary/5">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 grid place-items-center shrink-0">
                      <Megaphone className="h-4 w-4 text-primary" />
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
          ))}
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Bell className="h-3.5 w-3.5" /> All Announcements
        </div>
        {rest.map((a, i) => (
          <Card key={i} className="hover:shadow-sm transition-shadow">
            <CardContent className="pt-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="h-9 w-9 rounded-lg bg-muted grid place-items-center shrink-0">
                    <Megaphone className="h-4 w-4 text-muted-foreground" />
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
        ))}
      </div>
    </PortalShell>
  );
}
