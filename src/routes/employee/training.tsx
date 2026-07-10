import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen, Award, Clock, Play, CheckCircle2, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/employee/training")({ component: EmployeeTraining });

const courses = [
  {
    id: "C-01", title: "Security Awareness Training 2026", category: "Compliance", mandatory: true,
    progress: 0, duration: "2h", due: "2026-07-20", status: "Not Started",
  },
  {
    id: "C-02", title: "AWS Cloud Practitioner Essentials", category: "Technical", mandatory: false,
    progress: 65, duration: "8h", due: "2026-09-01", status: "In Progress",
  },
  {
    id: "C-03", title: "Effective Communication at Work", category: "Soft Skills", mandatory: false,
    progress: 100, duration: "3h", due: "2026-06-30", status: "Completed",
  },
  {
    id: "C-04", title: "POSH — Prevention of Sexual Harassment", category: "Compliance", mandatory: true,
    progress: 100, duration: "1.5h", due: "2026-04-01", status: "Completed",
  },
  {
    id: "C-05", title: "React 19 — New Features Deep Dive", category: "Technical", mandatory: false,
    progress: 30, duration: "5h", due: "2026-10-01", status: "In Progress",
  },
  {
    id: "C-06", title: "Leadership Fundamentals", category: "Leadership", mandatory: false,
    progress: 0, duration: "6h", due: "2026-12-31", status: "Not Started",
  },
];

const certificates = [
  { name: "POSH Compliance 2026", issued: "2026-04-02", expires: "2027-04-01", issuer: "Acme HR" },
  { name: "Effective Communication", issued: "2026-06-30", expires: null, issuer: "Acme L&D" },
  { name: "AWS Cloud Practitioner", issued: "2025-11-15", expires: "2027-11-15", issuer: "Amazon Web Services" },
];

const categoryColor: Record<string, string> = {
  Compliance: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
  Technical: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
  "Soft Skills": "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  Leadership: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
};

function EmployeeTraining() {
  const completed = courses.filter((c) => c.status === "Completed").length;
  const mandatory = courses.filter((c) => c.mandatory && c.status !== "Completed").length;

  return (
    <PortalShell role="employee" title="Training" subtitle="Courses, certifications and learning paths">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Courses enrolled" value={`${courses.length}`} delta="2 mandatory" icon={BookOpen} />
        <StatCard label="Completed" value={`${completed}`} delta={`${Math.round((completed / courses.length) * 100)}% completion`} icon={CheckCircle2} tone="up" />
        <StatCard label="Mandatory pending" value={`${mandatory}`} delta="Due soon" icon={AlertTriangle} tone={mandatory > 0 ? "down" : "up"} />
        <StatCard label="Certificates" value={`${certificates.length}`} delta="Earned" icon={Award} tone="up" />
      </div>

      {mandatory > 0 && (
        <Card className="border-rose-200 bg-rose-50 dark:bg-rose-900/20 dark:border-rose-800">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">You have {mandatory} mandatory training(s) pending. Please complete them before the due date.</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((c) => (
              <Card key={c.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${categoryColor[c.category]}`}>{c.category}</span>
                        {c.mandatory && <Badge variant="destructive" className="text-[10px]">Mandatory</Badge>}
                      </div>
                      <div className="font-semibold text-sm">{c.title}</div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {c.duration}</span>
                        <span>Due: {c.due}</span>
                      </div>
                    </div>
                    <Badge variant={c.status === "Completed" ? "default" : c.status === "In Progress" ? "secondary" : "outline"}>
                      {c.status}
                    </Badge>
                  </div>
                  {c.status !== "Not Started" && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span><span>{c.progress}%</span>
                      </div>
                      <Progress value={c.progress} className="h-1.5" />
                    </div>
                  )}
                  <Button
                    size="sm"
                    variant={c.status === "Completed" ? "outline" : "default"}
                    className="w-full gap-2"
                  >
                    {c.status === "Completed"
                      ? <><CheckCircle2 className="h-4 w-4" /> View Certificate</>
                      : c.status === "In Progress"
                      ? <><Play className="h-4 w-4" /> Continue</>
                      : <><Play className="h-4 w-4" /> Start Course</>}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="certificates">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <Card key={cert.name} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="h-16 w-16 rounded-full bg-amber-100 dark:bg-amber-900/30 grid place-items-center mx-auto">
                    <Award className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div className="font-semibold">{cert.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">Issued by {cert.issuer}</div>
                    <div className="text-xs text-muted-foreground">Issued: {cert.issued}</div>
                    {cert.expires && <div className="text-xs text-muted-foreground">Expires: {cert.expires}</div>}
                  </div>
                  <Button variant="outline" size="sm" className="w-full">Download Certificate</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
