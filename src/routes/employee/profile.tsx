import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, Phone, MapPin, Briefcase, Calendar, Building2, Edit, Plus, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export const Route = createFileRoute("/employee/profile")({ component: EmployeeProfile });

const skills = ["React", "TypeScript", "Node.js", "AWS", "PostgreSQL", "Docker", "GraphQL", "Python"];

const education = [
  { degree: "B.Tech — Computer Science", institution: "IIT Bombay", year: "2015–2019", grade: "8.4 CGPA" },
  { degree: "Class XII — CBSE", institution: "Delhi Public School", year: "2015", grade: "94.2%" },
];

const experience = [
  { role: "Senior Software Engineer", company: "Acme Corp", period: "Mar 2022 – Present", location: "Bengaluru" },
  { role: "Software Engineer II", company: "Flipkart", period: "Jun 2020 – Feb 2022", location: "Bengaluru" },
  { role: "Software Engineer I", company: "Infosys", period: "Jul 2019 – May 2020", location: "Pune" },
];

function EmployeeProfile() {
  const { user } = useAuth();
  const [mySkills, setMySkills] = useState(skills);
  if (!user) return null;

  return (
    <PortalShell
      role="employee"
      title="My Profile"
      subtitle="Personal details, employment info and more"
      actions={<Button variant="outline"><Edit className="h-4 w-4 mr-2" /> Edit Profile</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6 text-center">
            <Avatar className="h-24 w-24 mx-auto">
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">AM</AvatarFallback>
            </Avatar>
            <div className="mt-4 font-semibold text-lg">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.jobTitle}</div>
            <div className="mt-3 flex justify-center gap-2 flex-wrap">
              <Badge variant="secondary">{user.department}</Badge>
              <Badge variant="outline">E-1042</Badge>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2 text-sm text-left">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail className="h-4 w-4 shrink-0" /> {user.email}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4 shrink-0" /> +91 98765 43210</div>
              <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4 shrink-0" /> Bengaluru, IN</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Briefcase className="h-4 w-4 shrink-0" /> Reports to Priya Nair</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4 shrink-0" /> Joined Mar 14, 2022</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Building2 className="h-4 w-4 shrink-0" /> Acme Corp · HQ Tower B</div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="personal">
            <TabsList className="flex-wrap h-auto gap-1">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Contact</TabsTrigger>
              <TabsTrigger value="bank">Bank Details</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {[
                    ["First name", "Alex"], ["Last name", "Morgan"], ["Date of birth", "1993-04-18"],
                    ["Gender", "Male"], ["Nationality", "Indian"], ["Marital status", "Married"],
                    ["Blood group", "O+"], ["Personal email", "alex.m.morgan@gmail.com"],
                    ["Employment type", "Full-time"], ["Work location", "Bengaluru HQ"],
                    ["Grade", "L5"], ["Cost center", "ENG-100"],
                  ].map(([l, v]) => (
                    <div key={l} className="space-y-1">
                      <Label className="text-xs text-muted-foreground">{l}</Label>
                      <Input defaultValue={v} readOnly className="bg-muted/30" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="emergency">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Emergency Contacts</CardTitle>
                  <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" /> Add Contact</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { name: "Sarah Morgan", relation: "Spouse", phone: "+91 98111 22334", email: "sarah.morgan@gmail.com" },
                    { name: "Robert Morgan", relation: "Father", phone: "+91 98222 33445", email: "robert.m@gmail.com" },
                  ].map((c) => (
                    <div key={c.name} className="rounded-xl border p-4 grid gap-3 md:grid-cols-4">
                      <div className="space-y-1"><Label className="text-xs text-muted-foreground">Name</Label><Input defaultValue={c.name} /></div>
                      <div className="space-y-1"><Label className="text-xs text-muted-foreground">Relationship</Label><Input defaultValue={c.relation} /></div>
                      <div className="space-y-1"><Label className="text-xs text-muted-foreground">Phone</Label><Input defaultValue={c.phone} /></div>
                      <div className="space-y-1"><Label className="text-xs text-muted-foreground">Email</Label><Input defaultValue={c.email} /></div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="bank">
              <Card>
                <CardHeader><CardTitle>Bank Details</CardTitle></CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                  {[
                    ["Account holder name", "Alex Morgan"],
                    ["Bank name", "HDFC Bank"],
                    ["Account number", "••••••••3456"],
                    ["IFSC code", "HDFC0001234"],
                    ["Branch", "Koramangala, Bengaluru"],
                    ["Account type", "Savings"],
                    ["PAN number", "ABCPM1234D"],
                    ["UAN (PF)", "100987654321"],
                  ].map(([l, v]) => (
                    <div key={l} className="space-y-1">
                      <Label className="text-xs text-muted-foreground">{l}</Label>
                      <Input defaultValue={v} readOnly className="bg-muted/30" />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <Button variant="outline">Request Bank Details Update</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Education</CardTitle>
                  <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" /> Add</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((e) => (
                    <div key={e.degree} className="rounded-xl border p-4 grid gap-3 md:grid-cols-4">
                      <div className="space-y-1 md:col-span-2"><Label className="text-xs text-muted-foreground">Degree / Course</Label><Input defaultValue={e.degree} /></div>
                      <div className="space-y-1 md:col-span-2"><Label className="text-xs text-muted-foreground">Institution</Label><Input defaultValue={e.institution} /></div>
                      <div className="space-y-1"><Label className="text-xs text-muted-foreground">Year</Label><Input defaultValue={e.year} /></div>
                      <div className="space-y-1"><Label className="text-xs text-muted-foreground">Grade / CGPA</Label><Input defaultValue={e.grade} /></div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="experience">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Work Experience</CardTitle>
                  <Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" /> Add</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.map((e) => (
                    <div key={e.role} className="rounded-xl border p-4 grid gap-3 md:grid-cols-4">
                      <div className="space-y-1 md:col-span-2"><Label className="text-xs text-muted-foreground">Role</Label><Input defaultValue={e.role} /></div>
                      <div className="space-y-1"><Label className="text-xs text-muted-foreground">Company</Label><Input defaultValue={e.company} /></div>
                      <div className="space-y-1"><Label className="text-xs text-muted-foreground">Location</Label><Input defaultValue={e.location} /></div>
                      <div className="space-y-1 md:col-span-2"><Label className="text-xs text-muted-foreground">Period</Label><Input defaultValue={e.period} /></div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="skills">
              <Card>
                <CardHeader><CardTitle>Skills</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {mySkills.map((s) => (
                      <Badge key={s} variant="secondary" className="gap-1 pr-1 text-sm py-1">
                        {s}
                        <button onClick={() => setMySkills(mySkills.filter((x) => x !== s))} className="ml-1 hover:text-destructive">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input placeholder="Add a skill…" id="skill-input" className="max-w-xs" onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val && !mySkills.includes(val)) { setMySkills([...mySkills, val]); (e.target as HTMLInputElement).value = ""; }
                      }
                    }} />
                    <Button variant="outline" onClick={() => {
                      const input = document.getElementById("skill-input") as HTMLInputElement;
                      const val = input.value.trim();
                      if (val && !mySkills.includes(val)) { setMySkills([...mySkills, val]); input.value = ""; }
                    }}><Plus className="h-4 w-4" /></Button>
                  </div>
                  <Button>Save Skills</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PortalShell>
  );
}
