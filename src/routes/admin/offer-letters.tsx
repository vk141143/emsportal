import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Mail, FileText, CheckCircle, Clock, Plus, Search, MoreHorizontal, Eye, Download } from "lucide-react";

export const Route = createFileRoute("/admin/offer-letters")({ component: AdminOfferLetters });

const templates = [
  { id: "OT-01", name: "Software Engineer Offer", dept: "Engineering", variables: 12, lastUsed: "2 days ago", status: "Active" },
  { id: "OT-02", name: "Senior Engineer Offer", dept: "Engineering", variables: 14, lastUsed: "1 week ago", status: "Active" },
  { id: "OT-03", name: "Design Lead Offer", dept: "Design", variables: 11, lastUsed: "3 weeks ago", status: "Active" },
  { id: "OT-04", name: "Sales Executive Offer", dept: "Sales", variables: 10, lastUsed: "Yesterday", status: "Active" },
  { id: "OT-05", name: "Internship Offer", dept: "All", variables: 8, lastUsed: "Never", status: "Draft" },
];

const offerTracking = [
  { id: "OF-101", candidate: "Riya Shah", role: "Frontend Engineer", sentDate: "2026-07-08", expiry: "2026-07-22", status: "Pending" },
  { id: "OF-102", candidate: "Mohamed Ali", role: "Product Manager", sentDate: "2026-07-05", expiry: "2026-07-19", status: "Accepted" },
  { id: "OF-103", candidate: "Carlos Ruiz", role: "Data Scientist", sentDate: "2026-07-01", expiry: "2026-07-15", status: "Expired" },
  { id: "OF-104", candidate: "Yuki Sato", role: "Backend Engineer", sentDate: "2026-07-09", expiry: "2026-07-23", status: "Pending" },
  { id: "OF-105", candidate: "Fatima Khan", role: "DevOps Engineer", sentDate: "2026-06-28", expiry: "2026-07-12", status: "Accepted" },
];

const statusColor: Record<string, string> = {
  Pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Accepted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Expired: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Draft: "bg-muted text-muted-foreground",
};

function AdminOfferLetters() {
  const [search, setSearch] = useState("");

  return (
    <PortalShell
      role="admin"
      title="Offer Letters"
      subtitle="Manage offer letter templates, generation, and tracking"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FileText className="h-4 w-4 mr-1.5" />New Template</Button>
          <Button size="sm"><Plus className="h-4 w-4 mr-1.5" />Generate Offer</Button>
        </div>
      }
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Templates" value={String(templates.length)} icon={FileText} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Sent This Month" value="7" icon={Mail} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="Accepted" value="2" tone="up" icon={CheckCircle} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Pending / Expiring" value="2" tone="down" icon={Clock} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
      </div>

      <Tabs defaultValue="tracking">
        <TabsList>
          <TabsTrigger value="tracking">Offer Tracking</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="tracking">
          <Card>
            <CardHeader className="pb-3">
              <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search candidates…" className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Candidate</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Role</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Sent</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Expiry</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {offerTracking.filter((o) => o.candidate.toLowerCase().includes(search.toLowerCase())).map((o) => (
                    <tr key={o.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{o.candidate}</td>
                      <td className="px-4 py-3 text-muted-foreground">{o.role}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{o.sentDate}</td>
                      <td className="px-4 py-3 text-xs text-muted-foreground">{o.expiry}</td>
                      <td className="px-4 py-3">
                        <Badge className={`text-xs ${statusColor[o.status]}`} variant="outline">{o.status}</Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Eye className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Download className="h-3.5 w-3.5" /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((t) => (
              <Card key={t.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="h-10 w-10 rounded-xl bg-violet-100 dark:bg-violet-900/30 grid place-items-center text-violet-600 dark:text-violet-400">
                      <FileText className="h-5 w-5" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreHorizontal className="h-4 w-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Template</DropdownMenuItem>
                        <DropdownMenuItem>Preview</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-rose-600">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardTitle className="text-base mt-2">{t.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Department</span>
                    <span className="font-medium">{t.dept}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Variables</span>
                    <Badge variant="secondary">{t.variables}</Badge>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Last Used</span>
                    <span className="text-muted-foreground">{t.lastUsed}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    <Badge className={`text-xs ${statusColor[t.status]}`} variant="outline">{t.status}</Badge>
                  </div>
                  <Button size="sm" className="w-full mt-2" variant="outline">Use Template</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
