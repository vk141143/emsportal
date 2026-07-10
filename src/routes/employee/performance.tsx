import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Target, Star, TrendingUp, CheckCircle2, Plus } from "lucide-react";
import { goals } from "@/lib/mock-data";
import { useState } from "react";

export const Route = createFileRoute("/employee/performance")({ component: EmployeePerformance });

const reviews = [
  { period: "Q2 2026", type: "Mid-year Review", rating: 4.2, reviewer: "Priya Nair", status: "Completed", date: "2026-06-15" },
  { period: "Q4 2025", type: "Annual Review", rating: 4.5, reviewer: "Priya Nair", status: "Completed", date: "2025-12-20" },
  { period: "Q3 2026", type: "Mid-year Review", rating: null, reviewer: "Priya Nair", status: "Upcoming", date: "2026-09-15" },
];

const selfAssessmentQuestions = [
  "What were your key achievements this quarter?",
  "What challenges did you face and how did you overcome them?",
  "How well did you collaborate with your team?",
  "What skills did you develop or improve?",
  "What are your goals for the next quarter?",
];

const competencies = [
  { name: "Technical Skills", self: 4, manager: 4.2 },
  { name: "Communication", self: 3.5, manager: 3.8 },
  { name: "Collaboration", self: 4.5, manager: 4.3 },
  { name: "Problem Solving", self: 4, manager: 4.1 },
  { name: "Initiative", self: 3.8, manager: 3.6 },
];

function StarRating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`h-4 w-4 ${s <= Math.round(value) ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
      ))}
      <span className="ml-1 text-sm font-medium">{value}</span>
    </div>
  );
}

function EmployeePerformance() {
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <PortalShell role="employee" title="Performance" subtitle="Goals, reviews and self assessment">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active goals" value="4" delta="1 at risk" icon={Target} />
        <StatCard label="Last rating" value="4.2/5" delta="Q2 2026" icon={Star} tone="up" />
        <StatCard label="Goals on track" value="3/4" delta="75% completion" icon={TrendingUp} tone="up" />
        <StatCard label="Reviews done" value="2" delta="1 upcoming" icon={CheckCircle2} />
      </div>

      <Tabs defaultValue="goals">
        <TabsList>
          <TabsTrigger value="goals">Goals</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="self">Self Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="goals">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>My Goals — Q3 2026</CardTitle>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add Goal</Button>
            </CardHeader>
            <CardContent className="space-y-5">
              {goals.map((g) => (
                <div key={g.title} className="space-y-2 rounded-xl border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold">{g.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">Owner: {g.owner} · Due {g.due}</div>
                    </div>
                    <Badge variant={g.status === "At Risk" ? "destructive" : "secondary"}>{g.status}</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={g.progress} className="flex-1 h-2" />
                    <span className="text-sm font-semibold w-10 text-right">{g.progress}%</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Update Progress</Button>
                    <Button variant="ghost" size="sm">View Details</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Review History</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.period} className="rounded-xl border p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold">{r.type}</div>
                        <div className="text-xs text-muted-foreground">{r.period} · {r.date}</div>
                        <div className="text-xs text-muted-foreground">Reviewer: {r.reviewer}</div>
                      </div>
                      <Badge variant={r.status === "Completed" ? "default" : "secondary"}>{r.status}</Badge>
                    </div>
                    {r.rating && <StarRating value={r.rating} />}
                    {r.status === "Completed" && (
                      <Button variant="outline" size="sm">View Report</Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Competency Ratings</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {competencies.map((c) => (
                  <div key={c.name} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{c.name}</span>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>Self: {c.self}</span>
                        <span>Manager: {c.manager}</span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] text-muted-foreground w-12">Self</div>
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-sky-500 rounded-full" style={{ width: `${(c.self / 5) * 100}%` }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-[10px] text-muted-foreground w-12">Manager</div>
                        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(c.manager / 5) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="self">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Self Assessment — Q3 2026</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Due: September 10, 2026</p>
              </div>
              <Badge variant="secondary">Draft</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              {selfAssessmentQuestions.map((q, i) => (
                <div key={i} className="space-y-2">
                  <Label className="text-sm font-medium">{i + 1}. {q}</Label>
                  <Textarea
                    rows={3}
                    placeholder="Write your response…"
                    value={answers[i] || ""}
                    onChange={(e) => setAnswers({ ...answers, [i]: e.target.value })}
                  />
                </div>
              ))}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Overall self rating</Label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button key={s} className="h-10 w-10 rounded-lg border hover:bg-primary hover:text-primary-foreground transition-colors font-semibold text-sm">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">Save Draft</Button>
                <Button>Submit Assessment</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
