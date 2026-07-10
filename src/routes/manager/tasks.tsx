import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Target, CheckCircle2, Clock, AlertTriangle, Plus } from "lucide-react";
import { useState } from "react";
import { tasks, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/tasks")({ component: ManagerTasks });

type Task = typeof tasks[0];

function TaskTable({ items }: { items: Task[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((t) => (
          <TableRow key={t.id}>
            <TableCell>
              <div className="font-medium">{t.title}</div>
              <div className="text-xs text-muted-foreground font-mono">{t.id}</div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="text-[10px]">{t.assignee.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
                </Avatar>
                <span className="text-sm">{t.assignee}</span>
              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">{t.project}</TableCell>
            <TableCell>
              <Badge variant={t.priority === "High" ? "destructive" : t.priority === "Medium" ? "secondary" : "outline"}>
                {t.priority}
              </Badge>
            </TableCell>
            <TableCell className="text-sm">{t.due}</TableCell>
            <TableCell>
              <Badge variant={t.status === "Review" ? "outline" : t.status === "In Progress" ? "default" : "secondary"}>
                {t.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function ManagerTasks() {
  const [allTasks, setAllTasks] = useState<Task[]>(tasks as Task[]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", project: "", description: "", assignee: "", priority: "Medium", due: "", status: "Todo" });

  const teamMembers = employees.filter((e) => e.department === "Engineering");

  const handleAdd = () => {
    if (!form.title || !form.assignee) return;
    setAllTasks((prev) => [{
      id: `T-${Date.now()}`,
      title: form.title,
      project: form.project || "General",
      assignee: form.assignee,
      priority: form.priority,
      due: form.due || "TBD",
      status: form.status,
    }, ...prev]);
    setForm({ title: "", project: "", description: "", assignee: "", priority: "Medium", due: "", status: "Todo" });
    setOpen(false);
  };

  const todo = allTasks.filter((t) => t.status === "Todo");
  const inProgress = allTasks.filter((t) => t.status === "In Progress");
  const review = allTasks.filter((t) => t.status === "Review");
  const highPriority = allTasks.filter((t) => t.priority === "High");

  return (
    <PortalShell
      role="manager"
      title="Tasks"
      subtitle="Assign and track team tasks"
      actions={<Button onClick={() => setOpen(true)}><Plus className="h-4 w-4 mr-2" /> Assign Task</Button>}
    >
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Assign New Task</DialogTitle></DialogHeader>
          <div className="grid gap-4 py-2">
            <div className="grid gap-2">
              <Label>Task Title</Label>
              <Input placeholder="e.g. Fix login bug" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea rows={2} placeholder="Task details…" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid gap-2">
              <Label>Project</Label>
              <Input placeholder="e.g. Auth v2" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-3">
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
              <div className="grid gap-2">
                <Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todo">Todo</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Review">Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Assign To</Label>
              <Select value={form.assignee} onValueChange={(v) => setForm({ ...form, assignee: v })}>
                <SelectTrigger><SelectValue placeholder="Select team member" /></SelectTrigger>
                <SelectContent>
                  {teamMembers.map((m) => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Assign Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total Tasks" value={String(allTasks.length)} icon={Target} />
        <StatCard label="In Progress" value={String(inProgress.length)} tone="up" icon={Clock} />
        <StatCard label="In Review" value={String(review.length)} icon={CheckCircle2} />
        <StatCard label="High Priority" value={String(highPriority.length)} tone="down" icon={AlertTriangle} />
      </div>

      <Card>
        <CardHeader><CardTitle>Task Board</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all">
            <div className="px-6 pt-2">
              <TabsList>
                <TabsTrigger value="all">All ({allTasks.length})</TabsTrigger>
                <TabsTrigger value="todo">Todo ({todo.length})</TabsTrigger>
                <TabsTrigger value="progress">In Progress ({inProgress.length})</TabsTrigger>
                <TabsTrigger value="review">Review ({review.length})</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="all" className="overflow-x-auto"><TaskTable items={allTasks} /></TabsContent>
            <TabsContent value="todo" className="overflow-x-auto"><TaskTable items={todo} /></TabsContent>
            <TabsContent value="progress" className="overflow-x-auto"><TaskTable items={inProgress} /></TabsContent>
            <TabsContent value="review" className="overflow-x-auto"><TaskTable items={review} /></TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
