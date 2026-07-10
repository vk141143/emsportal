import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Plus, AlertTriangle, CheckCircle2, FileCheck } from "lucide-react";
import { hrDocuments, employees } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/documents")({ component: HRDocuments });

const letterTypes = [
  { key: "offer", label: "Offer Letter", icon: FileText, desc: "Generate offer letter for new hires" },
  { key: "appointment", label: "Appointment Letter", icon: FileCheck, desc: "Formal appointment confirmation" },
  { key: "experience", label: "Experience Letter", icon: FileText, desc: "Work experience certificate" },
  { key: "relieving", label: "Relieving Letter", icon: FileText, desc: "Relieving letter on separation" },
];

function LetterGenerator({ type }: { type: string }) {
  const cfg = letterTypes.find((l) => l.key === type)!;
  return (
    <Card>
      <CardHeader><CardTitle>{cfg.label} Generator</CardTitle></CardHeader>
      <CardContent className="space-y-4 max-w-2xl">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Employee</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select employee" /></SelectTrigger>
              <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Date</Label>
            <Input type="date" defaultValue="2026-07-10" />
          </div>
        </div>

        {type === "offer" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>Designation</Label><Input placeholder="Software Engineer" /></div>
              <div className="space-y-1.5"><Label>Department</Label><Input placeholder="Engineering" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5"><Label>CTC (Annual)</Label><Input placeholder="₹12,00,000" /></div>
              <div className="space-y-1.5"><Label>Joining Date</Label><Input type="date" /></div>
            </div>
          </>
        )}
        {type === "appointment" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Designation</Label><Input placeholder="Software Engineer" /></div>
            <div className="space-y-1.5"><Label>Joining Date</Label><Input type="date" /></div>
          </div>
        )}
        {type === "experience" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>From Date</Label><Input type="date" /></div>
            <div className="space-y-1.5"><Label>To Date</Label><Input type="date" /></div>
          </div>
        )}
        {type === "relieving" && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5"><Label>Last Working Day</Label><Input type="date" /></div>
            <div className="space-y-1.5"><Label>Reason</Label><Input placeholder="Resignation" /></div>
          </div>
        )}

        <div className="space-y-1.5">
          <Label>Additional Notes</Label>
          <Textarea placeholder="Any additional information to include in the letter…" className="min-h-[80px]" />
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">Preview Letter</Button>
          <Button className="flex-1"><Download className="h-4 w-4 mr-2" /> Generate & Download</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function HRDocuments() {
  const expired = hrDocuments.filter((d) => d.status === "Expired").length;
  const active = hrDocuments.filter((d) => d.status === "Active").length;

  return (
    <PortalShell
      role="hr"
      title="Documents"
      subtitle="Employee documents and letter generation"
      actions={<Button><Plus className="h-4 w-4 mr-2" /> Upload Document</Button>}
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Total Documents" value={String(hrDocuments.length)} icon={FileText} />
        <StatCard label="Active" value={String(active)} tone="up" icon={CheckCircle2} />
        <StatCard label="Expired / Expiring" value={String(expired)} tone="down" icon={AlertTriangle} />
      </div>

      <Tabs defaultValue="all">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="offer">Offer Letter</TabsTrigger>
          <TabsTrigger value="appointment">Appointment Letter</TabsTrigger>
          <TabsTrigger value="experience">Experience Letter</TabsTrigger>
          <TabsTrigger value="relieving">Relieving Letter</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader><TableRow>
                  <TableHead>Document</TableHead><TableHead>Type</TableHead>
                  <TableHead>Employee</TableHead><TableHead>Date</TableHead>
                  <TableHead>Expiry</TableHead><TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow></TableHeader>
                <TableBody>
                  {hrDocuments.map((d) => (
                    <TableRow key={d.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="font-medium text-sm">{d.name}</span>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{d.type}</Badge></TableCell>
                      <TableCell>{d.employee}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{d.date}</TableCell>
                      <TableCell className="text-sm">{d.expiry}</TableCell>
                      <TableCell>
                        <Badge variant={d.status === "Active" ? "default" : d.status === "Expired" ? "destructive" : "secondary"}>
                          {d.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm"><Download className="h-4 w-4 mr-1" /> Download</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {["offer", "appointment", "experience", "relieving"].map((t) => (
          <TabsContent key={t} value={t}><LetterGenerator type={t} /></TabsContent>
        ))}
      </Tabs>
    </PortalShell>
  );
}
