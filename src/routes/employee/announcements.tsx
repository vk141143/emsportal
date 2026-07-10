import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Megaphone, Search, Pin } from "lucide-react";
import { useState } from "react";
import { announcements } from "@/lib/mock-data";

export const Route = createFileRoute("/employee/announcements")({ component: EmployeeAnnouncements });

const allAnnouncements = [
  ...announcements,
  { title: "Office closed on Aug 15 — Independence Day", body: "The Bengaluru and Mumbai offices will be closed. Remote employees may work as usual.", tag: "Holiday", date: "2026-07-09" },
  { title: "New health insurance partner — Niva Bupa", body: "Effective August 1, our health insurance provider changes to Niva Bupa. Cashless at 5000+ hospitals.", tag: "Benefits", date: "2026-07-07" },
  { title: "Referral bonus increased to ₹50,000", body: "Refer a friend for any open role and earn ₹50,000 on their confirmation.", tag: "HR", date: "2026-07-04" },
  { title: "Q2 results — record revenue quarter", body: "We crossed $278K MRR in Q2. Thank you for your contributions!", tag: "Company", date: "2026-07-01" },
  { title: "Mandatory POSH training — complete by July 20", body: "All employees must complete the POSH training module in the Learning section.", tag: "Compliance", date: "2026-06-28" },
];

const tagColors: Record<string, string> = {
  Company: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  Benefits: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Compliance: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  Holiday: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  HR: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
};

const allTags = ["All", ...Array.from(new Set(allAnnouncements.map((a) => a.tag)))];

function EmployeeAnnouncements() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const filtered = allAnnouncements.filter((a) =>
    (activeTag === "All" || a.tag === activeTag) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.body.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <PortalShell role="employee" title="Announcements" subtitle="Company-wide updates and notices">
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {allTags.map((t) => (
            <Badge
              key={t}
              variant={t === activeTag ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveTag(t)}
            >
              {t}
            </Badge>
          ))}
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search announcements…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((a, i) => (
          <Card key={a.title} className="hover:shadow-sm transition-shadow">
            <CardContent className="pt-5 pb-5">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {i === 0 ? <Pin className="h-4 w-4" /> : <Megaphone className="h-4 w-4" />}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="font-semibold">{a.title}</div>
                        {i === 0 && <Badge variant="secondary" className="text-[10px]">📌 Pinned</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{a.body}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${tagColors[a.tag] || "bg-muted text-muted-foreground"}`}>{a.tag}</span>
                      <span className="text-[11px] text-muted-foreground">{a.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">No announcements found</div>
        )}
      </div>
    </PortalShell>
  );
}
