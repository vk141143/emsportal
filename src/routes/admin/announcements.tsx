import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Megaphone, Pin, Plus, Calendar, Bell } from "lucide-react";
import { hrAnnouncements } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/announcements")({ component: AdminAnnouncements });

const tagColor: Record<string, string> = {
  Performance: "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  Policy: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Onboarding: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Payroll: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Compliance: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
  Company: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
  Benefits: "bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400",
};

const scheduled = [
  { title: "Independence Day Wishes", date: "2026-08-15", type: "Festival", status: "Scheduled" },
  { title: "Q3 All-Hands Meeting", date: "2026-08-01", type: "Company", status: "Scheduled" },
  { title: "Diwali Celebration Announcement", date: "2026-10-18", type: "Festival", status: "Draft" },
];

function AdminAnnouncements() {
  return (
    <PortalShell
      role="admin"
      title="Announcements"
      subtitle="Company-wide communications, news, and alerts"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Calendar className="h-4 w-4 mr-1.5" />Schedule</Button>
          <Button size="sm"><Plus className="h-4 w-4 mr-1.5" />New Announcement</Button>
        </div>
      }
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Total Announcements" value={String(hrAnnouncements.length)} icon={Megaphone} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Pinned" value={String(hrAnnouncements.filter((a) => a.pinned).length)} icon={Pin} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Scheduled" value={String(scheduled.filter((s) => s.status === "Scheduled").length)} icon={Calendar} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Drafts" value={String(scheduled.filter((s) => s.status === "Draft").length)} icon={Bell} color="bg-muted text-muted-foreground" />
      </div>

      <Tabs defaultValue="published">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
        </TabsList>

        <TabsContent value="published" className="space-y-3">
          {hrAnnouncements.map((a) => (
            <Card key={a.id} className={`hover:shadow-md transition-shadow ${a.pinned ? "border-violet-200 dark:border-violet-800" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {a.pinned && <Pin className="h-3.5 w-3.5 text-violet-500 shrink-0" />}
                      <span className="font-semibold text-sm">{a.title}</span>
                      <Badge className={`text-xs ${tagColor[a.tag] || "bg-muted text-muted-foreground"}`} variant="outline">{a.tag}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{a.body}</p>
                    <div className="text-xs text-muted-foreground mt-2">{a.date}</div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-rose-600">Delete</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-3">
          {scheduled.map((s, i) => (
            <Card key={i}>
              <CardContent className="p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-sm">{s.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Scheduled for {s.date} · {s.type}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={s.status === "Scheduled" ? "secondary" : "outline"} className="text-xs">{s.status}</Badge>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
