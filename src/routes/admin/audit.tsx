import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, ShieldCheck, AlertTriangle, Download, MapPin, ExternalLink } from "lucide-react";
import { auditLogs } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/audit")({ component: AdminAudit });

const extended = [
  ...auditLogs,
  { time: "08:22:15", actor: "elena.v@globex.com", action: "Failed login attempt", target: "auth:login", severity: "Medium", coords: { lat: 52.52, lng: 13.405 }, location: "Berlin, DE" },
  { time: "07:58:41", actor: "priya.nair@acme.com", action: "Downloaded payroll export", target: "report:payroll-june", severity: "Medium", coords: { lat: 12.9716, lng: 77.5946 }, location: "Bengaluru, IN" },
  { time: "07:14:20", actor: "system", action: "SSO SAML metadata refreshed", target: "tenant:hooli", severity: "Low", coords: null, location: "System" },
  { time: "06:42:11", actor: "sam.rivera@acme.com", action: "Enabled feature flag: ai-copilot", target: "flag:ai-copilot", severity: "Low", coords: { lat: 37.7749, lng: -122.4194 }, location: "San Francisco, US" },
];

const employeeLogs = [
  { id: "L-001", employee: "Alex Morgan", date: "2026-07-10", checkIn: "09:05 AM", checkOut: "06:30 PM", checkInCoords: { lat: 12.9716, lng: 77.5946 }, checkOutCoords: { lat: 12.9720, lng: 77.5950 }, location: "Bengaluru Office" },
  { id: "L-002", employee: "Priya Nair", date: "2026-07-10", checkIn: "08:55 AM", checkOut: "06:45 PM", checkInCoords: { lat: 12.9716, lng: 77.5946 }, checkOutCoords: { lat: 12.9720, lng: 77.5950 }, location: "Bengaluru Office" },
  { id: "L-003", employee: "Jordan Blake", date: "2026-07-10", checkIn: "09:15 AM", checkOut: "05:30 PM", checkInCoords: { lat: 30.2672, lng: -97.7431 }, checkOutCoords: { lat: 30.2680, lng: -97.7440 }, location: "Austin Office" },
  { id: "L-004", employee: "Sam Rivera", date: "2026-07-10", checkIn: "09:00 AM", checkOut: "06:00 PM", checkInCoords: { lat: 37.7749, lng: -122.4194 }, checkOutCoords: { lat: 37.7755, lng: -122.4200 }, location: "San Francisco Office" },
  { id: "L-005", employee: "Nina Patel", date: "2026-07-10", checkIn: "09:30 AM", checkOut: "06:15 PM", checkInCoords: { lat: 51.5074, lng: -0.1278 }, checkOutCoords: { lat: 51.5080, lng: -0.1285 }, location: "London Office" },
  { id: "L-006", employee: "Marcus Wei", date: "2026-07-10", checkIn: "09:20 AM", checkOut: "06:20 PM", checkInCoords: { lat: 51.5074, lng: -0.1278 }, checkOutCoords: { lat: 51.5080, lng: -0.1285 }, location: "London Office" },
];

function MapViewDialog({ log, open, onClose }: { log: typeof employeeLogs[0] | null; open: boolean; onClose: () => void }) {
  if (!log) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{log.employee} — Check-in/Check-out Locations</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-3">
            <div className="text-sm font-semibold">Check-in Location</div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-emerald-600" />
              <span className="font-mono text-sm">{log.checkInCoords.lat.toFixed(4)}, {log.checkInCoords.lng.toFixed(4)}</span>
              <a href={`https://maps.google.com/?q=${log.checkInCoords.lat},${log.checkInCoords.lng}`} target="_blank" rel="noreferrer"
                className="text-blue-600 hover:underline text-sm flex items-center gap-1 ml-auto">
                <ExternalLink className="h-4 w-4" />View on Maps
              </a>
            </div>
            <div className="text-xs text-muted-foreground">{log.checkIn} — {log.location}</div>
          </div>

          <div className="rounded-lg border p-4 space-y-3">
            <div className="text-sm font-semibold">Check-out Location</div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-rose-600" />
              <span className="font-mono text-sm">{log.checkOutCoords.lat.toFixed(4)}, {log.checkOutCoords.lng.toFixed(4)}</span>
              <a href={`https://maps.google.com/?q=${log.checkOutCoords.lat},${log.checkOutCoords.lng}`} target="_blank" rel="noreferrer"
                className="text-blue-600 hover:underline text-sm flex items-center gap-1 ml-auto">
                <ExternalLink className="h-4 w-4" />View on Maps
              </a>
            </div>
            <div className="text-xs text-muted-foreground">{log.checkOut} — {log.location}</div>
          </div>

          <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-3 text-xs text-muted-foreground">
            <div className="font-semibold text-blue-900 dark:text-blue-400 mb-1">Distance Traveled</div>
            <div>Approximately {(Math.random() * 15 + 1).toFixed(1)} km between check-in and check-out locations</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function AdminAudit() {
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [tab, setTab] = useState("events");
  const [selectedLog, setSelectedLog] = useState<typeof employeeLogs[0] | null>(null);

  const severities = ["all", "High", "Medium", "Low"];

  const filteredEvents = extended.filter((a) =>
    (severityFilter === "all" || a.severity === severityFilter) &&
    (a.action.toLowerCase().includes(search.toLowerCase()) || a.actor.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredLogs = employeeLogs.filter((l) =>
    l.employee.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PortalShell role="admin" title="Audit logs" subtitle="Immutable trail of all privileged and sensitive actions"
      actions={<Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Events (24h)" value="12,482" icon={ShieldCheck} />
        <StatCard label="High severity" value="4" tone="down" icon={AlertTriangle} />
        <StatCard label="Failed logins" value="23" icon={AlertTriangle} />
        <StatCard label="Retention" value="7 years" icon={ShieldCheck} />
      </div>

      <div className="flex gap-2 border-b">
        <Button variant={tab === "events" ? "default" : "outline"} size="sm" onClick={() => setTab("events")}>Event Stream</Button>
        <Button variant={tab === "employees" ? "default" : "outline"} size="sm" onClick={() => setTab("employees")}>Employee Logs</Button>
      </div>

      {tab === "events" && (
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center gap-3">
            <CardTitle>Event stream</CardTitle>
            <div className="flex flex-wrap gap-2 md:ml-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Filter by actor, action…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 w-64" />
              </div>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                <SelectContent>{severities.map((s) => <SelectItem key={s} value={s}>{s === "all" ? "All Severities" : s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {filteredEvents.map((a, i) => (
              <div key={i} className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[auto_auto_1fr_auto] items-center gap-3 rounded-lg border p-3">
                <div className="font-mono text-xs text-muted-foreground shrink-0 hidden md:block">{a.time}</div>
                <div className="hidden md:block">
                  <Badge variant="outline" className="font-mono text-[10px]">{a.actor.split("@")[0]}</Badge>
                </div>
                <div className="min-w-0">
                  <div className="text-sm truncate"><span className="md:hidden font-mono text-xs text-muted-foreground mr-2">{a.time}</span>{a.action}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">{a.target} · {a.actor}</div>
                </div>
                <Badge variant={a.severity === "High" ? "destructive" : a.severity === "Medium" ? "secondary" : "outline"} className="shrink-0">{a.severity}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {tab === "employees" && (
        <Card>
          <CardHeader className="flex flex-col md:flex-row md:items-center gap-3">
            <CardTitle>Employee Check-in/Check-out Logs</CardTitle>
            <div className="relative md:ml-auto md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Filter by employee or ID…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold">Employee</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">Check-in</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">Check-out</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold">Location</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="font-medium text-sm">{log.employee}</div>
                      <div className="text-xs text-muted-foreground">{log.id}</div>
                    </td>
                    <td className="px-4 py-3 text-xs">{log.date}</td>
                    <td className="px-4 py-3 text-xs font-mono">{log.checkIn}</td>
                    <td className="px-4 py-3 text-xs font-mono">{log.checkOut}</td>
                    <td className="px-4 py-3 text-xs">{log.location}</td>
                    <td className="px-4 py-3">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>View on Maps</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      <MapViewDialog log={selectedLog} open={!!selectedLog} onClose={() => setSelectedLog(null)} />
    </PortalShell>
  );
}
