import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Calendar, MoreVertical, Star } from "lucide-react";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/team")({ component: ManagerTeam });

function ManagerTeam() {
  const team = employees.filter((e) => e.department === "Engineering");
  return (
    <PortalShell role="manager" title="My team" subtitle="Engineering · direct and dotted-line reports"
      actions={<Button variant="outline">Org chart</Button>}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {team.map((e, i) => (
          <Card key={e.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar className="h-12 w-12"><AvatarFallback className="bg-primary/10 text-primary">{e.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                  <div className="min-w-0">
                    <div className="font-semibold truncate">{e.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{e.jobTitle}</div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0"><MoreVertical className="h-4 w-4" /></Button>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                <Badge variant="secondary">{e.location}</Badge>
                <Badge variant="outline">{e.status}</Badge>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Q3 Goal progress</span><span className="font-medium">{40 + i * 12}%</span></div>
                <Progress value={40 + i * 12} />
              </div>
              <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                <Star className="h-3 w-3" />
                <span className="ml-1">Last review: Exceeds</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm"><MessageSquare className="h-3 w-3 mr-1" /> 1:1</Button>
                <Button variant="outline" size="sm"><Calendar className="h-3 w-3 mr-1" /> Schedule</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
