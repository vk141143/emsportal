import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Briefcase, CheckCircle2, Clock, AlertTriangle, Plus, UserPlus } from "lucide-react";
import { useState } from "react";
import { projects, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/projects")({ component: ManagerProjects });

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  "In Progress": "default", Planning: "secondary", Review: "outline", Completed: "secondary",
};
const statusColor: Record<string, string> = {
  "In Progress": "text-blue-600", Planning: "text-amber-600",
  Review: "text-purple-600", Completed: "text-emerald-600",
};

type Project = typeof projects[0];

function AssignProjectDialog({ onAdd }: { onAdd: (p: Project) => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "", status: "Planning", priority: "Medium",
    assignees: "", due: "", description: "",
  });

  const handleSubmit = () => {
    if (!form.name) return;
    onAdd({
      id: `P-${Date.now()}`,
      name: form.name,
      status: form.status,
      priority: form.priority,
      assignees: form.assignees ? form.assignees.split(",").map((s) => s.trim()) : [],
      due: form.due || "TBD",
      progress: 0,
    });
    setForm({ name: "", status: "Planning", priority: "Medium", assignees: "", due: "", description: "" });
    setOpen(false);
  };

  const teamMembers = employees.filter((e) => e.department === "Engineering");

  return (
    <>
      <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> Assign Project</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Assign New Project</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Project Name</Label>
              <Input placeholder="e.g. API Gateway v2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea rows={2} placeholder="Brief project description…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planning">Planning</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Priority</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Assign Team Members</Label>
              <Select onValueChange={(v) => {
                const current = form.assignees ? form.assignees.split(",").map((s) => s.trim()) : [];
                if (!current.includes(v)) setForm({ ...form, assignees: [...current, v].join(", ") });
              }}>
                <SelectTrigger><SelectValue placeholder="Select team member" /></SelectTrigger>
                <SelectContent>
                  {teamMembers.map((m) => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {form.assignees && (
                <div className="text-xs text-muted-foreground bg-muted/40 rounded p-2">{form.assignees}</div>
              )}
            </div>
            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>Assign Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ManagerProjects() {
  const [allProjects, setAllProjects] = useState<Project[]>(projects as Project[]);
  const active = allProjects.filter((p) => p.status !== "Completed").length;
  const completed = allProjects.filter((p) => p.status === "Completed").length;
  const highPriority = allProjects.filter((p) => p.priority === "High").length;

  return (
    <PortalShell
      role="manager"
      title="Projects"
      subtitle="Track and manage team projects"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><UserPlus className="h-4 w-4 mr-2" /> Assign Member</Button>
          <AssignProjectDialog onAdd={(p) => setAllProjects((prev) => [p, ...prev])} />
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Projects" value={String(allProjects.length)} icon={Briefcase} />
        <StatCard label="Active" value={String(active)} tone="up" icon={Clock} />
        <StatCard label="Completed" value={String(completed)} tone="up" icon={CheckCircle2} />
        <StatCard label="High Priority" value={String(highPriority)} tone="down" icon={AlertTriangle} />
      </div>

      <Card>
        <CardHeader><CardTitle>All Projects</CardTitle></CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assignees</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProjects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">{p.id}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[p.status]} className={statusColor[p.status]}>{p.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={p.priority === "High" ? "destructive" : p.priority === "Medium" ? "secondary" : "outline"}>{p.priority}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {p.assignees.map((a) => (
                        <Avatar key={a} className="h-7 w-7 border-2 border-background">
                          <AvatarFallback className="text-[10px]">{a.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{p.due}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 min-w-[120px]">
                      <Progress value={p.progress} className="flex-1" />
                      <span className="text-xs text-muted-foreground w-8 text-right">{p.progress}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
