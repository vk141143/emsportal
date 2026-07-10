import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Target, TrendingUp, Star, Award } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

export const Route = createFileRoute("/hr/performance")({ component: HRPerf });

const cycles = [
  { dept: "Engineering", completed: 92, total: 120 },
  { dept: "Sales", completed: 68, total: 80 },
  { dept: "Marketing", completed: 34, total: 40 },
  { dept: "Design", completed: 22, total: 28 },
  { dept: "Ops", completed: 44, total: 52 },
];

const rating = [
  { label: "Outstanding", value: 42 },
  { label: "Exceeds", value: 210 },
  { label: "Meets", value: 685 },
  { label: "Needs Improvement", value: 84 },
  { label: "Below", value: 12 },
];
const RATING_COLORS = ["hsl(160 84% 39%)", "hsl(217 91% 60%)", "hsl(220 9% 60%)", "hsl(38 92% 50%)", "hsl(0 84% 60%)"];

function HRPerf() {
  return (
    <PortalShell role="hr" title="Performance & reviews" subtitle="Q3 2026 review cycle · 68% complete">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Reviews completed" value="260 / 320" delta="81%" tone="up" icon={Target} />
        <StatCard label="Avg. rating" value="3.8 / 5" tone="up" icon={Star} />
        <StatCard label="Promotions (Q)" value="34" icon={Award} />
        <StatCard label="9-Box Talent" value="A-Class 18%" tone="up" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Review cycle completion</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {cycles.map((c) => (
              <div key={c.dept} className="space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{c.dept}</span>
                  <span className="text-muted-foreground">{c.completed}/{c.total}</span>
                </div>
                <Progress value={(c.completed / c.total) * 100} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Rating distribution</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={rating} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="label" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {rating.map((_, i) => <Cell key={i} fill={RATING_COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>9-Box Talent Grid</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 aspect-[3/2] max-w-2xl mx-auto">
            {[
              ["High Potential / Low Perf", 24, "bg-amber-500/10 border-amber-500/30"],
              ["High Potential / Med Perf", 78, "bg-emerald-500/10 border-emerald-500/30"],
              ["Star Performer", 42, "bg-emerald-600/20 border-emerald-600/50"],
              ["Enigma", 12, "bg-slate-500/10 border-slate-500/30"],
              ["Core Player", 320, "bg-sky-500/10 border-sky-500/30"],
              ["High Performer", 96, "bg-emerald-500/10 border-emerald-500/30"],
              ["Under Performer", 18, "bg-rose-500/10 border-rose-500/30"],
              ["Solid Contributor", 240, "bg-sky-500/10 border-sky-500/30"],
              ["Trusted Pro", 88, "bg-sky-500/10 border-sky-500/30"],
            ].map(([label, count, cls]) => (
              <div key={label as string} className={`rounded-lg border p-3 flex flex-col justify-between ${cls}`}>
                <div className="text-[11px] font-medium">{label}</div>
                <div className="text-2xl font-bold">{count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
