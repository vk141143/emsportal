import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckSquare, Clock, AlertCircle, Plus, Circle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/employee/tasks")({ component: EmployeeTasks });

const initialTasks = [
  { id: 1, title: "Review PR #482 — auth refactor", project: "Auth v2", priority: "High", due: "2026-07-10", status: "Done" },
  { id: 2, title: "Update API docs for /users endpoint", project: "Docs", priority: "Medium", due: "2026-07-12", status: "In Progress" },
  { id: 3, title: "Sync with Priya on Q3 roadmap", project: "Planning", priority: "Medium", due: "2026-07-11", status: "In Progress" },
  { id: 4, title: "Fix flaky test in CI pipeline", project: "DevOps", priority: "High", due: "2026-07-13", status: "Todo" },
  { id: 5, title: "Write unit tests for OAuth module", project: "Auth v2", priority: "High", due: "2026-07-15", status: "Todo" },
  { id: 6, title: "Update Docusaurus config", project: "Docs", priority: "Low", due: "2026-07-18", status: "Todo" },
  { id: 7, title: "Code review for Aisha's PR", project: "Auth v2", priority: "Medium", due: "2026-07-11", status: "In Progress" },
  { id: 8, title: "Deploy staging build", project: "DevOps", priority: "High", due: "2026-07-14", status: "Done" },
];

const priorityColor: Record<string, string> = {
  High: "destructive",
  Medium: "secondary",
  Low: "outline",
};

function TaskCard({ task, onStatusChange }: { task: typeof initialTasks[0]; onStatusChange: (id: number, status: string) => void }) {
  return (
    <div className="rounded-lg border bg-card p-3 space-y-2 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-2">
        <button onClick={() => onStatusChange(task.id, task.status === "Done" ? "Todo" : "Done")} className="mt-0.5 shrink-0">
          {task.status === "Done"
            ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            : <Circle className="h-4 w-4 text-muted-foreground" />}
        </button>
        <div className="min-w-0">
          <div className={`text-sm font-medium ${task.status === "Done" ? "line-through text-muted-foreground" : ""}`}>{task.title}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{task.project}</div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Badge variant={priorityColor[task.priority] as "destructive" | "secondary" | "outline"} className="text-[10px]">{task.priority}</Badge>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" /> {task.due}
        </div>
      </div>
    </div>
  );
}

function EmployeeTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const updateStatus = (id: number, current: string) => {
    setTasks(tasks.map((t) => t.id === id ? { ...t, status: current === "Done" ? "Todo" : "Done" } : t));
  };

  const todo = tasks.filter((t) => t.status === "Todo");
  const inProgress = tasks.filter((t) => t.status === "In Progress");
  const done = tasks.filter((t) => t.status === "Done");

  return (
    <PortalShell
      role="employee"
      title="Tasks"
      subtitle="Your assigned tasks across all projects"
      actions={
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> New Task</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Task</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2"><Label>Title</Label><Input placeholder="Task title" /></div>
              <div className="space-y-2"><Label>Project</Label>
                <select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
                  {["Auth v2", "Docs", "DevOps", "Planning"].map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2"><Label>Priority</Label>
                  <select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
                    {["High", "Medium", "Low"].map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div className="space-y-2"><Label>Due Date</Label><Input type="date" /></div>
              </div>
              <div className="space-y-2"><Label>Description</Label><Textarea rows={3} /></div>
            </div>
            <DialogFooter><Button>Create</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total tasks" value={`${tasks.length}`} delta="This sprint" icon={CheckSquare} />
        <StatCard label="In progress" value={`${inProgress.length}`} delta="Active now" icon={Clock} />
        <StatCard label="Overdue" value="1" delta="Fix flaky test" icon={AlertCircle} tone="down" />
        <StatCard label="Completed" value={`${done.length}`} delta={`${Math.round((done.length / tasks.length) * 100)}% done`} icon={CheckCircle2} tone="up" />
      </div>

      <Tabs defaultValue="board">
        <TabsList>
          <TabsTrigger value="board">Board</TabsTrigger>
          <TabsTrigger value="list">List</TabsTrigger>
        </TabsList>

        <TabsContent value="board">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { label: "To Do", tasks: todo, color: "border-t-slate-400" },
              { label: "In Progress", tasks: inProgress, color: "border-t-sky-500" },
              { label: "Done", tasks: done, color: "border-t-emerald-500" },
            ].map((col) => (
              <div key={col.label} className={`rounded-xl border border-t-4 ${col.color} bg-muted/30 p-3 space-y-3`}>
                <div className="flex items-center justify-between px-1">
                  <div className="text-sm font-semibold">{col.label}</div>
                  <Badge variant="secondary">{col.tasks.length}</Badge>
                </div>
                {col.tasks.map((t) => <TaskCard key={t.id} task={t} onStatusChange={updateStatus} />)}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader><CardTitle>All Tasks</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {tasks.map((t) => (
                <div key={t.id} className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                  <button onClick={() => updateStatus(t.id, t.status)}>
                    {t.status === "Done"
                      ? <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      : <Circle className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm font-medium ${t.status === "Done" ? "line-through text-muted-foreground" : ""}`}>{t.title}</div>
                    <div className="text-xs text-muted-foreground">{t.project}</div>
                  </div>
                  <Badge variant={priorityColor[t.priority] as "destructive" | "secondary" | "outline"} className="text-[10px] shrink-0">{t.priority}</Badge>
                  <Badge variant={t.status === "Done" ? "default" : t.status === "In Progress" ? "secondary" : "outline"} className="text-[10px] shrink-0">{t.status}</Badge>
                  <div className="text-xs text-muted-foreground shrink-0">{t.due}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
