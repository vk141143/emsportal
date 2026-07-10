import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Star, Briefcase, Users, Plus, TrendingUp, Upload, Calendar, MoreHorizontal } from "lucide-react";
import { candidates } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/recruitment")({ component: HRRecruit });

const stages = ["Screening", "Assessment", "Interview", "Offer", "Hired"];

const openJobs = [
  { id: "J-01", role: "Senior Backend Engineer", dept: "Engineering", loc: "Remote", apps: 48, status: "Active" },
  { id: "J-02", role: "Product Designer", dept: "Design", loc: "London", apps: 32, status: "Active" },
  { id: "J-03", role: "Data Scientist", dept: "Data", loc: "New York", apps: 71, status: "Active" },
  { id: "J-04", role: "Sales Engineer", dept: "Sales", loc: "Berlin", apps: 22, status: "Active" },
  { id: "J-05", role: "DevOps Lead", dept: "Platform", loc: "Bengaluru", apps: 39, status: "Paused" },
  { id: "J-06", role: "Content Marketer", dept: "Marketing", loc: "Remote", apps: 55, status: "Active" },
];

const interviews = [
  { candidate: "Riya Shah", role: "Frontend Engineer", date: "2026-07-14", time: "10:00 AM", interviewer: "Priya Nair", type: "Technical" },
  { candidate: "Mohamed Ali", role: "Product Manager", date: "2026-07-14", time: "2:00 PM", interviewer: "David Chen", type: "Final" },
  { candidate: "Carlos Ruiz", role: "Data Scientist", date: "2026-07-15", time: "11:00 AM", interviewer: "Alex Morgan", type: "Technical" },
  { candidate: "Yuki Sato", role: "Backend Engineer", date: "2026-07-16", time: "3:00 PM", interviewer: "Aisha Rahman", type: "Peer" },
];

function HRRecruit() {
  return (
    <PortalShell
      role="hr"
      title="Recruitment"
      subtitle="Applicant tracking · 42 open roles"
      actions={<Button><Plus className="h-4 w-4 mr-2" /> Post New Job</Button>}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Open Roles" value="42" icon={Briefcase} />
        <StatCard label="Candidates in Pipeline" value="318" delta="+22 this week" tone="up" icon={Users} />
        <StatCard label="Time to Hire" value="28d" delta="-4d MoM" tone="up" icon={TrendingUp} />
        <StatCard label="Offer Acceptance" value="86%" tone="up" icon={Star} />
      </div>

      <Tabs defaultValue="jobs">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Tracking</TabsTrigger>
          <TabsTrigger value="pipeline">Interview Pipeline</TabsTrigger>
          <TabsTrigger value="resume">Resume Upload</TabsTrigger>
          <TabsTrigger value="schedule">Interview Schedule</TabsTrigger>
        </TabsList>

        <TabsContent value="jobs">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Open Positions</CardTitle>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add Job</Button>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>ID</TableHead><TableHead>Role</TableHead>
                  <TableHead>Department</TableHead><TableHead>Location</TableHead>
                  <TableHead>Applicants</TableHead><TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {openJobs.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="font-mono text-xs">{j.id}</TableCell>
                      <TableCell className="font-medium">{j.role}</TableCell>
                      <TableCell><Badge variant="outline">{j.dept}</Badge></TableCell>
                      <TableCell>{j.loc}</TableCell>
                      <TableCell><Badge variant="secondary">{j.apps} applicants</Badge></TableCell>
                      <TableCell><Badge variant={j.status === "Active" ? "default" : "secondary"}>{j.status}</Badge></TableCell>
                      <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="candidates">
          <Card>
            <CardHeader><CardTitle>All Candidates</CardTitle></CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Candidate</TableHead><TableHead>Role</TableHead>
                  <TableHead>Stage</TableHead><TableHead>Source</TableHead>
                  <TableHead>Rating</TableHead><TableHead>Applied</TableHead>
                  <TableHead></TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {candidates.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{c.name.split(" ").map((x) => x[0]).join("")}</AvatarFallback></Avatar>
                          <span className="font-medium text-sm">{c.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{c.role}</TableCell>
                      <TableCell><Badge variant={c.stage === "Hired" ? "default" : c.stage === "Rejected" ? "destructive" : "secondary"}>{c.stage}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.source}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span className="text-sm">{c.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">{c.applied}</TableCell>
                      <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pipeline">
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {stages.map((s) => {
              const items = candidates.filter((c) => c.stage === s);
              return (
                <div key={s} className="rounded-xl bg-muted/40 p-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-semibold text-sm">{s}</div>
                    <Badge variant="secondary">{items.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {items.map((c) => (
                      <Card key={c.id} className="p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Avatar className="h-8 w-8"><AvatarFallback className="text-xs">{c.name.split(" ").map((x) => x[0]).join("")}</AvatarFallback></Avatar>
                          <div className="min-w-0"><div className="font-medium text-sm truncate">{c.name}</div><div className="text-[11px] text-muted-foreground truncate">{c.role}</div></div>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{c.source}</span>
                          <div className="flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-400 text-amber-400" /> {c.rating}</div>
                        </div>
                      </Card>
                    ))}
                    {items.length === 0 && <div className="text-xs text-muted-foreground text-center py-4">No candidates</div>}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="resume">
          <Card>
            <CardContent className="pt-8 max-w-lg mx-auto text-center space-y-4">
              <div className="h-16 w-16 rounded-2xl bg-blue-50 dark:bg-blue-950 grid place-items-center mx-auto text-blue-600">
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <div className="font-semibold text-lg">Upload Resume</div>
                <div className="text-sm text-muted-foreground mt-1">Upload candidate resumes to parse and add to the pipeline</div>
              </div>
              <div className="border-2 border-dashed rounded-xl p-8 text-sm text-muted-foreground">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                Drag & drop PDF or DOCX files here
                <div className="mt-2"><Button variant="outline" size="sm">Browse Files</Button></div>
              </div>
              <div className="space-y-3 text-left">
                <div className="space-y-1.5"><Label>Assign to Job</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select job opening" /></SelectTrigger>
                    <SelectContent>{openJobs.map((j) => <SelectItem key={j.id} value={j.id}>{j.role}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Upload & Parse Resume</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Interview Schedule</CardTitle>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Schedule Interview</Button>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Candidate</TableHead><TableHead>Role</TableHead>
                  <TableHead>Date</TableHead><TableHead>Time</TableHead>
                  <TableHead>Interviewer</TableHead><TableHead>Type</TableHead>
                  <TableHead></TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {interviews.map((i, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{i.candidate}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{i.role}</TableCell>
                      <TableCell>{i.date}</TableCell>
                      <TableCell>{i.time}</TableCell>
                      <TableCell>{i.interviewer}</TableCell>
                      <TableCell><Badge variant="outline">{i.type}</Badge></TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm"><Calendar className="h-4 w-4 mr-1" /> Reschedule</Button>
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
