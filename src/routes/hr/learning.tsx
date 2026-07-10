import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GraduationCap, PlayCircle, Award, Clock, Plus, Download } from "lucide-react";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/learning")({ component: HRLearning });

const courses = [
  { id: "C-01", title: "Manager Fundamentals", enrolled: 88, complete: 72, hours: 6, cat: "Leadership", status: "Active" },
  { id: "C-02", title: "Anti-Harassment Training", enrolled: 1240, complete: 1198, hours: 1, cat: "Compliance", status: "Active" },
  { id: "C-03", title: "React Deep Dive", enrolled: 62, complete: 24, hours: 12, cat: "Technical", status: "Active" },
  { id: "C-04", title: "Financial Modeling", enrolled: 34, complete: 18, hours: 8, cat: "Finance", status: "Active" },
  { id: "C-05", title: "Communication Mastery", enrolled: 210, complete: 154, hours: 4, cat: "Soft Skills", status: "Active" },
  { id: "C-06", title: "GDPR & Data Privacy", enrolled: 1240, complete: 1088, hours: 2, cat: "Compliance", status: "Active" },
];

const employeeTraining = [
  { employee: "Alex Morgan", course: "React Deep Dive", progress: 80, status: "In Progress", due: "2026-07-31" },
  { employee: "Aisha Rahman", course: "Anti-Harassment Training", progress: 100, status: "Completed", due: "2026-07-20" },
  { employee: "Kenji Tanaka", course: "Manager Fundamentals", progress: 45, status: "In Progress", due: "2026-08-15" },
  { employee: "Marcus Wei", course: "Communication Mastery", progress: 100, status: "Completed", due: "2026-07-10" },
  { employee: "Nina Patel", course: "GDPR & Data Privacy", progress: 60, status: "In Progress", due: "2026-07-20" },
];

const certificates = [
  { employee: "Aisha Rahman", course: "Anti-Harassment Training", issued: "2026-07-08", expires: "2027-07-08", id: "CERT-001" },
  { employee: "Marcus Wei", course: "Communication Mastery", issued: "2026-07-05", expires: "2027-07-05", id: "CERT-002" },
  { employee: "Priya Nair", course: "Manager Fundamentals", issued: "2026-06-20", expires: "2027-06-20", id: "CERT-003" },
  { employee: "David Chen", course: "GDPR & Data Privacy", issued: "2026-06-15", expires: "2027-06-15", id: "CERT-004" },
];

function HRLearning() {
  return (
    <PortalShell
      role="hr"
      title="Training & Learning"
      subtitle="LMS · courses, certifications and compliance training"
      actions={<Button><Plus className="h-4 w-4 mr-2" /> Add Course</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Active Courses" value={String(courses.length)} icon={GraduationCap} />
        <StatCard label="Completions (Q)" value="1,842" tone="up" icon={Award} />
        <StatCard label="Avg. Time to Complete" value="4.2h" icon={Clock} />
        <StatCard label="Compliance Rate" value="96.6%" tone="up" icon={Award} />
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="training">Employee Training</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <Card key={c.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Badge variant="outline" className="text-[10px]">{c.cat}</Badge>
                      <div className="font-semibold mt-2 truncate">{c.title}</div>
                    </div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center text-primary shrink-0">
                      <PlayCircle className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-muted-foreground">{c.hours}h · {c.enrolled} enrolled</div>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span>Completion</span>
                      <span className="font-medium">{Math.round(c.complete / c.enrolled * 100)}%</span>
                    </div>
                    <Progress value={c.complete / c.enrolled * 100} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">Manage</Button>
                    <Button size="sm" className="flex-1">Assign</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Employee Training Assignments</CardTitle>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Assign Training</Button>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Employee</TableHead><TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead><TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {employeeTraining.map((t, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{t.employee.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                          <span className="font-medium text-sm">{t.employee}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{t.course}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 min-w-[100px]">
                          <Progress value={t.progress} className="flex-1" />
                          <span className="text-xs text-muted-foreground w-8">{t.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={t.status === "Completed" ? "default" : "secondary"}>{t.status}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{t.due}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="certificates">
          <Card>
            <CardHeader><CardTitle>Issued Certificates</CardTitle></CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Certificate ID</TableHead><TableHead>Employee</TableHead>
                  <TableHead>Course</TableHead><TableHead>Issued</TableHead>
                  <TableHead>Expires</TableHead><TableHead className="text-right">Action</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {certificates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-mono text-xs">{c.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7"><AvatarFallback className="text-[10px]">{c.employee.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                          <span className="font-medium text-sm">{c.employee}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{c.course}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.issued}</TableCell>
                      <TableCell className="text-sm">{c.expires}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm"><Download className="h-4 w-4 mr-1" /> Download</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
