import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Target, TrendingUp, Trophy, Plus, Star, MessageSquare } from "lucide-react";
import { goals, employees } from "@/lib/mock-data";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, Tooltip } from "recharts";

export const Route = createFileRoute("/manager/performance")({ component: ManagerPerf });

const skills = [
  { subject: "Delivery", A: 88 }, { subject: "Quality", A: 82 }, { subject: "Collab", A: 91 },
  { subject: "Innovation", A: 74 }, { subject: "Leadership", A: 79 }, { subject: "Ownership", A: 86 },
];

const feedbackList = [
  { employee: "Alex Morgan", feedback: "Great progress on auth v2. Needs to improve documentation habits.", rating: 4, date: "2026-07-08" },
  { employee: "Aisha Rahman", feedback: "Excellent onboarding. Proactively picked up backend ownership. Keep it up!", rating: 5, date: "2026-07-07" },
  { employee: "Kenji Tanaka", feedback: "Good technical skills. Communication with design team needs improvement.", rating: 3, date: "2026-07-06" },
  { employee: "Marcus Wei", feedback: "Design system work is outstanding. Strong leadership in design reviews.", rating: 5, date: "2026-07-05" },
];

function ManagerPerf() {
  const team = employees.filter((e) => e.department === "Engineering");

  return (
    <PortalShell role="manager" title="Performance Reviews" subtitle="Goals, OKRs, ratings and continuous feedback"
      actions={<Button><Plus className="h-4 w-4 mr-2" /> Create Goal</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="OKRs on track" value="14/19" tone="up" icon={Target} />
        <StatCard label="Avg. progress" value="68%" delta="+7% MoM" tone="up" icon={TrendingUp} />
        <StatCard label="Recognitions given" value="12" delta="This quarter" icon={Trophy} />
        <StatCard label="Pending reviews" value="3" icon={Target} />
      </div>

      <Tabs defaultValue="goals">
        <TabsList>
          <TabsTrigger value="goals">Goals & OKRs</TabsTrigger>
          <TabsTrigger value="feedback">Employee Feedback</TabsTrigger>
          <TabsTrigger value="ratings">Performance Ratings</TabsTrigger>
        </TabsList>

        <TabsContent value="goals">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Team OKR Progress</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {goals.map((g) => (
                  <div key={g.title} className="rounded-lg border p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <div className="font-medium">{g.title}</div>
                        <div className="text-xs text-muted-foreground">Owner: {g.owner} · Due {g.due}</div>
                      </div>
                      <Badge variant={g.status === "At Risk" ? "destructive" : "secondary"}>{g.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={g.progress} className="flex-1" />
                      <span className="text-sm font-medium w-10 text-right">{g.progress}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Team Competencies</CardTitle></CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={skills}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Radar name="Team" dataKey="A" stroke="hsl(160 84% 39%)" fill="hsl(160 84% 39%)" fillOpacity={0.4} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <div className="grid gap-4 md:grid-cols-2">
            {feedbackList.map((f, i) => (
              <Card key={i}>
                <CardContent className="pt-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{f.employee.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{f.employee}</div>
                        <div className="text-xs text-muted-foreground">{f.date}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <Star key={s} className={`h-4 w-4 ${s < f.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                      ))}
                    </div>
                  </div>
                  <Textarea defaultValue={f.feedback} className="text-sm resize-none min-h-[72px] bg-muted/40" readOnly />
                  <Button variant="outline" size="sm" className="w-full"><MessageSquare className="h-3 w-3 mr-1" /> Add Feedback</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ratings">
          <Card>
            <CardHeader><CardTitle>Team Performance Ratings</CardTitle></CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Employee</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Stars</th>
                    <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {team.slice(0, 5).map((e, i) => (
                    <tr key={e.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 shrink-0">
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">{e.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{e.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{e.jobTitle}</td>
                      <td className="py-3 px-4 font-semibold">{3 + (i % 3)}/5</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className={`h-4 w-4 ${s < (3 + (i % 3)) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{["Meets", "Exceeds", "Outstanding", "Meets", "Exceeds"][i % 5]}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
