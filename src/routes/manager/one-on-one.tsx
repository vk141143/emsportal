import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Calendar, Plus, Smile, Meh, TrendingUp } from "lucide-react";
import { oneOnOneMeetings } from "@/lib/mock-data";

export const Route = createFileRoute("/manager/one-on-one")({ component: ManagerOneOnOne });

const moodIcon: Record<string, React.ReactNode> = {
  Great: <Smile className="h-4 w-4 text-emerald-500" />,
  Good: <Smile className="h-4 w-4 text-blue-500" />,
  Neutral: <Meh className="h-4 w-4 text-amber-500" />,
};

const moodVariant: Record<string, "default" | "secondary" | "outline"> = {
  Great: "default",
  Good: "secondary",
  Neutral: "outline",
};

function ManagerOneOnOne() {
  return (
    <PortalShell
      role="manager"
      title="One-on-One Meetings"
      subtitle="Track conversations, notes and follow-ups"
      actions={<Button><Plus className="h-4 w-4 mr-2" /> Schedule 1:1</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Meetings This Month" value={String(oneOnOneMeetings.length)} icon={MessageSquare} />
        <StatCard label="Upcoming" value="4" delta="Next 2 weeks" tone="up" icon={Calendar} />
        <StatCard label="Avg. Mood" value="Good" delta="Based on last sessions" tone="up" icon={TrendingUp} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {oneOnOneMeetings.map((m) => (
          <Card key={m.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {m.employee.split(" ").map((s) => s[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{m.employee}</CardTitle>
                    <div className="text-xs text-muted-foreground">{m.date} · {m.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {moodIcon[m.mood]}
                  <Badge variant={moodVariant[m.mood]}>{m.mood}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">Notes</div>
                <Textarea
                  defaultValue={m.notes}
                  className="text-sm resize-none min-h-[80px] bg-muted/40"
                  readOnly
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Next: <span className="font-medium text-foreground">{m.nextDate}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Calendar className="h-3 w-3 mr-1" /> Reschedule</Button>
                  <Button size="sm"><MessageSquare className="h-3 w-3 mr-1" /> Add Notes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PortalShell>
  );
}
