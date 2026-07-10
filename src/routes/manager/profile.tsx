import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { User, Mail, MapPin, Calendar, Star, Edit, Users, Target, MessageSquare } from "lucide-react";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/manager/profile")({ component: ManagerProfile });

const performanceRatings = [
  { category: "Team Delivery", score: 88, max: 100 },
  { category: "Communication", score: 92, max: 100 },
  { category: "Goal Setting", score: 85, max: 100 },
  { category: "Mentorship", score: 90, max: 100 },
  { category: "Stakeholder Mgmt", score: 78, max: 100 },
];

function ManagerProfile() {
  const { user } = useAuth();

  return (
    <PortalShell
      role="manager"
      title="Profile"
      subtitle="Your personal and professional information"
      actions={<Button variant="outline"><Edit className="h-4 w-4 mr-2" /> Edit Profile</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-8 flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {user?.name.split(" ").map((s) => s[0]).join("") ?? "TL"}
              </AvatarFallback>
            </Avatar>
            <div className="font-bold text-xl">{user?.name ?? "Team Lead"}</div>
            <div className="text-muted-foreground text-sm mt-1">Engineering Manager</div>
            <Badge className="mt-2" variant="secondary">Team Lead</Badge>

            <div className="w-full mt-6 space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{user?.email ?? "manager@acme.com"}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Bengaluru, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Joined August 2019</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <User className="h-4 w-4 text-muted-foreground shrink-0" />
                <span>Reports to: David Chen (CTO)</span>
              </div>
            </div>

            <div className="w-full mt-6 pt-6 border-t grid grid-cols-3 gap-3 text-center">
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Users className="h-3 w-3" /> Reports</div>
              </div>
              <div>
                <div className="text-2xl font-bold">19</div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Target className="h-3 w-3" /> Goals</div>
              </div>
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-xs text-muted-foreground flex items-center justify-center gap-1"><MessageSquare className="h-3 w-3" /> 1:1s</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Ratings */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Performance Ratings</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {performanceRatings.map((r) => (
                <div key={r.category} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{r.category}</span>
                    <span className="text-muted-foreground">{r.score}/{r.max}</span>
                  </div>
                  <Progress value={r.score} />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Overall Rating</CardTitle></CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((s) => (
                    <Star key={s} className="h-6 w-6 fill-amber-400 text-amber-400" />
                  ))}
                  <Star className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                  <div className="font-bold text-2xl">4.0 / 5.0</div>
                  <div className="text-sm text-muted-foreground">Q3 2026 · Exceeds Expectations</div>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-muted/50 text-sm text-muted-foreground italic">
                "Priya consistently delivers high-quality results and fosters a collaborative team environment. Strong mentorship skills and clear communication with stakeholders."
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PortalShell>
  );
}
