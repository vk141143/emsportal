import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Activity, Cpu, Database, Zap, CheckCircle2 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/system")({ component: AdminSystem });

const latency = Array.from({ length: 24 }, (_, i) => ({ h: `${i}:00`, p50: 82 + Math.round(Math.random() * 30), p95: 180 + Math.round(Math.random() * 60) }));

const services = [
  { name: "API Gateway", status: "Operational", uptime: 99.99, region: "Global" },
  { name: "Auth Service", status: "Operational", uptime: 99.98, region: "us-east-1" },
  { name: "Payroll Engine", status: "Operational", uptime: 100, region: "us-east-1" },
  { name: "Notifications", status: "Degraded", uptime: 98.72, region: "eu-west-1" },
  { name: "Reporting", status: "Operational", uptime: 99.94, region: "ap-south-1" },
  { name: "File Storage", status: "Operational", uptime: 99.99, region: "Global" },
];

function AdminSystem() {
  return (
    <PortalShell role="admin" title="System health" subtitle="Real-time observability and SLO tracking">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Uptime (30d)" value="99.99%" tone="up" icon={Activity} />
        <StatCard label="p95 latency" value="188ms" tone="up" icon={Zap} />
        <StatCard label="CPU (avg)" value="42%" icon={Cpu} />
        <StatCard label="DB connections" value="212 / 500" icon={Database} />
      </div>

      <Card>
        <CardHeader><CardTitle>API latency · last 24h</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latency}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="h" tick={{ fontSize: 10 }} interval={2} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Line type="monotone" dataKey="p50" stroke="hsl(160 84% 39%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="p95" stroke="hsl(38 92% 50%)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Services</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {services.map((s) => (
            <div key={s.name} className="rounded-lg border p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${s.status === "Operational" ? "text-emerald-500" : "text-amber-500"}`} />
                  <div className="font-medium text-sm">{s.name}</div>
                </div>
                <Badge variant={s.status === "Operational" ? "default" : "secondary"}>{s.status}</Badge>
              </div>
              <div className="text-xs text-muted-foreground mb-2">{s.region}</div>
              <Progress value={s.uptime} />
              <div className="mt-1 text-xs text-muted-foreground">{s.uptime}% uptime</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </PortalShell>
  );
}
