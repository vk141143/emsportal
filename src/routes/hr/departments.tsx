import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Building2, Users, Plus, MoreHorizontal, Layers } from "lucide-react";
import { departments, designations } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/departments")({ component: HRDepartments });

function HRDepartments() {
  return (
    <PortalShell
      role="hr"
      title="Departments & Designations"
      subtitle="Manage organizational structure"
      actions={
        <Dialog>
          <DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" /> Add Department</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Department</DialogTitle></DialogHeader>
            <div className="space-y-3 py-2">
              <div className="space-y-1.5"><Label>Department Name</Label><Input placeholder="e.g. Product" /></div>
              <div className="space-y-1.5"><Label>Department Head</Label><Input placeholder="Manager name" /></div>
              <div className="space-y-1.5"><Label>Location</Label><Input placeholder="e.g. Remote" /></div>
              <div className="space-y-1.5"><Label>Budget</Label><Input placeholder="e.g. 100000" type="number" /></div>
              <Button className="w-full">Create Department</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Departments" value={String(departments.length)} icon={Building2} />
        <StatCard label="Total Designations" value={String(designations.length)} icon={Layers} />
        <StatCard label="Total Employees" value="1,240" icon={Users} />
      </div>

      <Tabs defaultValue="departments">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="designations">Designations</TabsTrigger>
        </TabsList>

        <TabsContent value="departments">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <Card key={d.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-2">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 grid place-items-center text-primary shrink-0">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                  </div>
                  <div className="mt-3">
                    <div className="font-semibold text-lg">{d.name}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">Head: {d.head}</div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-lg bg-muted/50 p-2.5">
                      <div className="text-xs text-muted-foreground">Employees</div>
                      <div className="font-semibold mt-0.5">{d.employees}</div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2.5">
                      <div className="text-xs text-muted-foreground">Location</div>
                      <div className="font-semibold mt-0.5 truncate">{d.location}</div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-muted-foreground">
                    Budget: <span className="font-medium text-foreground">${d.budget.toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="designations">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>All Designations</CardTitle>
              <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Add Designation</Button>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>ID</TableHead><TableHead>Title</TableHead>
                  <TableHead>Department</TableHead><TableHead>Level</TableHead>
                  <TableHead>Employees</TableHead><TableHead></TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {designations.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell className="font-mono text-xs">{d.id}</TableCell>
                      <TableCell className="font-medium">{d.title}</TableCell>
                      <TableCell><Badge variant="outline">{d.department}</Badge></TableCell>
                      <TableCell><Badge variant="secondary">{d.level}</Badge></TableCell>
                      <TableCell>{d.employees}</TableCell>
                      <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
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
