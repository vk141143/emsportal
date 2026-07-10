import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Target, CheckCircle, Clock, AlertCircle, Plus } from "lucide-react";
import { tasks } from "@/lib/mock-data";

export const Route = createFileRoute("/admin/tasks")({ component: AdminTasks });

const statusColor: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  Todo: "bg-muted text-muted-foreground",
  Review: "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400",
  Done: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400",
};

const priorityColor: Record<string, string> = {
  High: "bg-rose-100 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400",
  Medium: "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400",
  Low: "bg-muted text-muted-foreground",
};

const columns = ["Todo", "In Progress", "Review", "Done"];

function TaskCard({ task }: { task: typeof tasks[0] }) {
  return (
    <div className="rounded-lg border bg-card p-3 shadow-sm hover:shadow-md transition-shadow space-y-2">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-medium leading-tight">{task.title}</span>
        <Badge className={`text-[10px] shrink-0 ${priorityColor[task.priority]}`} variant="outline">{task.priority}</Badge>
      </div>
      <div className="text-xs text-muted-foreground">{task.project}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Avatar className="h-5 w-5">
            <AvatarFallback className="text-[9px]">{task.assignee.split(" ").map((s) => s[0]).join("")}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">{task.assignee.split(" ")[0]}</span>
        </div>
        <span className="text-[10px] text-muted-foreground">{task.due}</span>
      </div>
    </div>
  );
}

function AdminTasks() {
  const [view, setView] = useState("kanban");

  return (
    <PortalShell
      role="admin"
      title="Tasks"
      subtitle="Kanban board, task assignments, and progress tracking"
      actions={
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setView(view === "kanban" ? "list" : "kanban")}>
            {view === "kanban" ? "List View" : "Kanban View"}
          </Button>
          <Button size="sm"><Plus className="h-4 w-4 mr-1.5" />New Task</Button>
        </div>
      }
    >
      <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
        <StatCard label="Total Tasks" value={String(tasks.length)} icon={Target} color="bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400" />
        <StatCard label="In Progress" value={String(tasks.filter((t) => t.status === "In Progress").length)} icon={Clock} color="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" />
        <StatCard label="In Review" value={String(tasks.filter((t) => t.status === "Review").length)} icon={AlertCircle} color="bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" />
        <StatCard label="Completed" value="0" icon={CheckCircle} color="bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" />
      </div>

      {view === "kanban" ? (
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col);
            return (
              <div key={col} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{col}</span>
                    <Badge variant="secondary" className="text-xs">{colTasks.length}</Badge>
                  </div>
                </div>
                <div className="space-y-2 min-h-24">
                  {colTasks.map((t) => <TaskCard key={t.id} task={t} />)}
                  {colTasks.length === 0 && (
                    <div className="rounded-lg border border-dashed p-4 text-center text-xs text-muted-foreground">No tasks</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Task</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Assignee</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Project</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Priority</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Due</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 font-medium">{t.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.assignee}</td>
                    <td className="px-4 py-3 text-muted-foreground">{t.project}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs ${priorityColor[t.priority]}`} variant="outline">{t.priority}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{t.due}</td>
                    <td className="px-4 py-3">
                      <Badge className={`text-xs ${statusColor[t.status]}`} variant="outline">{t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </PortalShell>
  );
}
