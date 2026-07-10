import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plug, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { integrationsList } from "@/lib/mock-data";

// NOTE: Audit page (/admin/audit) has been enhanced with:
// - Employee check-in/check-out logs with location coordinates
// - "View on Maps" button to open Google Maps with exact coordinates
// - Distance calculation between check-in and check-out locations
// - Separate tabs for Event Stream and Employee Logs
// - Filters for severity and employee search

export const Route = createFileRoute("/admin/integrations")({ component: AdminIntegrations });

const categoryColor: Record<string, string> = {
  Identity: "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  Communication: "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Productivity: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
  Billing: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Payroll: "bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400",
  HRIS: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400",
  "Project Management": "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
};

const smtpConfig = [
  { label: "SMTP Host", value: "smtp.gmail.com" },
  { label: "SMTP Port", value: "587" },
  { label: "From Email", value: "hr@acme.com" },
  { label: "Encryption", value: "TLS" },
];

function AdminIntegrations() {
  const connected = integrationsList.filter((i) => i.status === "Connected").length;

  return (
    <PortalShell
      role="admin"
      title="Integrations"
      subtitle="Connect third-party services, APIs, and webhooks"
      actions={<Button variant="outline" size="sm"><Plug className="h-4 w-4 mr-1.5" />Add Integration</Button>}
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
        <StatCard label="Total Integrations" value={String(integrationsList.length)} icon={Plug} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="Connected" value={String(connected)} tone="up" icon={CheckCircle} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
        <StatCard label="Disconnected" value={String(integrationsList.length - connected)} tone="down" icon={XCircle} color="bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrationsList.map((int) => (
          <Card key={int.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-muted grid place-items-center text-xl shrink-0">{int.logo}</div>
                  <div className="min-w-0">
                    <div className="font-medium text-sm">{int.name}</div>
                    <Badge className={`text-[10px] mt-1 ${categoryColor[int.category] || "bg-muted text-muted-foreground"}`} variant="outline">{int.category}</Badge>
                  </div>
                </div>
                <div className="shrink-0">
                  {int.status === "Connected"
                    ? <CheckCircle className="h-4 w-4 text-emerald-500" />
                    : <XCircle className="h-4 w-4 text-muted-foreground/40" />}
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Last sync: {int.lastSync}</span>
                <div className="flex gap-1">
                  {int.status === "Connected" && (
                    <Button variant="ghost" size="icon" className="h-7 w-7"><RefreshCw className="h-3.5 w-3.5" /></Button>
                  )}
                  <Button variant={int.status === "Connected" ? "outline" : "default"} size="sm" className="h-7 text-xs">
                    {int.status === "Connected" ? "Manage" : "Connect"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold">SMTP Configuration</CardTitle>
          <CardDescription>Email delivery settings for notifications and alerts.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {smtpConfig.map((s) => (
              <div key={s.label} className="rounded-lg border p-3">
                <div className="text-xs text-muted-foreground">{s.label}</div>
                <div className="font-medium text-sm mt-1">{s.value}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm">Test Connection</Button>
            <Button size="sm">Update SMTP</Button>
          </div>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
