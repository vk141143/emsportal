import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, Plus, Download, Upload, MoreHorizontal, ArrowRightLeft, TrendingUp, UserMinus, Trash2, ChevronRight, ChevronLeft, Check, Eye, EyeOff, MapPin, FileText, CreditCard, User, Building2 } from "lucide-react";
import { employees } from "@/lib/mock-data";

export const Route = createFileRoute("/hr/employees")({ component: HREmployees });

type Deduction = { id: number; label: string; percent: number; amount: number };

const STEPS = [
  { label: "Details", icon: User },
  { label: "Credentials", icon: CreditCard },
  { label: "Template", icon: FileText },
  { label: "Payroll", icon: Building2 },
  { label: "Offer Letter", icon: Check },
];

function CreateEmployeeDialog() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [showPass, setShowPass] = useState(false);
  const [templateFile, setTemplateFile] = useState<File | null>(null);
  const [deductions, setDeductions] = useState<Deduction[]>([
    { id: 1, label: "PF", percent: 12, amount: 0 },
    { id: 2, label: "Professional Tax", percent: 2, amount: 0 },
  ]);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", department: "", jobTitle: "",
    location: "", address: "", joinDate: "", manager: "",
    loginEmail: "", tempPassword: "",
    totalSalary: "",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const totalSalaryNum = parseFloat(form.totalSalary) || 0;
  const totalDeductions = deductions.reduce((sum, d) => sum + (totalSalaryNum * d.percent) / 100, 0);
  const netSalary = totalSalaryNum - totalDeductions;

  const addDeduction = () =>
    setDeductions((d) => [...d, { id: Date.now(), label: "", percent: 0, amount: 0 }]);
  const removeDeduction = (id: number) => setDeductions((d) => d.filter((x) => x.id !== id));
  const updateDeduction = (id: number, key: "label" | "percent", val: string) =>
    setDeductions((d) =>
      d.map((x) =>
        x.id === id
          ? { ...x, [key]: key === "percent" ? parseFloat(val) || 0 : val,
              amount: key === "percent" ? (totalSalaryNum * (parseFloat(val) || 0)) / 100 : x.amount }
          : x
      )
    );

  const reset = () => { setStep(0); setForm({ firstName: "", lastName: "", email: "", department: "", jobTitle: "", location: "", address: "", joinDate: "", manager: "", loginEmail: "", tempPassword: "", totalSalary: "" }); setDeductions([{ id: 1, label: "PF", percent: 12, amount: 0 }, { id: 2, label: "Professional Tax", percent: 2, amount: 0 }]); setTemplateFile(null); };

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" /> Create Employee</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Employee</DialogTitle>
        </DialogHeader>

        {/* Step indicator */}
        <div className="flex items-center gap-1 py-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="flex items-center gap-1 flex-1">
                <div className={`flex items-center gap-1.5 text-xs font-medium px-2 py-1 rounded-full transition-colors ${
                  i === step ? "bg-primary text-primary-foreground" :
                  i < step ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
                }`}>
                  <Icon className="h-3 w-3" />{s.label}
                </div>
                {i < STEPS.length - 1 && <div className={`h-px flex-1 ${i < step ? "bg-emerald-400" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        <Separator />

        {/* Step 0 — Employee Details */}
        {step === 0 && (
          <div className="grid gap-4 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>First Name</Label><Input placeholder="John" value={form.firstName} onChange={(e) => set("firstName", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Last Name</Label><Input placeholder="Doe" value={form.lastName} onChange={(e) => set("lastName", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="john.doe@acme.com" value={form.email} onChange={(e) => set("email", e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Department</Label>
                <Select value={form.department} onValueChange={(v) => set("department", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>{["Engineering", "Sales", "Marketing", "Design", "People Ops", "Finance"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Job Title</Label><Input placeholder="Software Engineer" value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Location / City</Label><Input placeholder="Bengaluru" value={form.location} onChange={(e) => set("location", e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Join Date</Label><Input type="date" value={form.joinDate} onChange={(e) => set("joinDate", e.target.value)} /></div>
            </div>
            <div className="space-y-1.5"><Label>Full Address</Label><Textarea placeholder="123, MG Road, Bengaluru, Karnataka 560001" rows={2} value={form.address} onChange={(e) => set("address", e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Manager</Label><Input placeholder="Manager name" value={form.manager} onChange={(e) => set("manager", e.target.value)} /></div>
          </div>
        )}

        {/* Step 1 — Login Credentials */}
        {step === 1 && (
          <div className="grid gap-4 py-2">
            <div className="rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
              These credentials will be emailed to the employee. They must change the password on first login.
            </div>
            <div className="space-y-1.5">
              <Label>Login Email</Label>
              <Input type="email" placeholder="john.doe@acme.com" value={form.loginEmail || form.email}
                onChange={(e) => set("loginEmail", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Temporary Password</Label>
              <div className="relative">
                <Input type={showPass ? "text" : "password"} placeholder="Min 8 characters"
                  value={form.tempPassword} onChange={(e) => set("tempPassword", e.target.value)} className="pr-10" />
                <button type="button" onClick={() => setShowPass((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-fit"
              onClick={() => set("tempPassword", Math.random().toString(36).slice(-10) + "A1!")}>
              Generate Password
            </Button>
            <div className="rounded-lg border p-3 space-y-1 text-sm">
              <div className="font-medium text-muted-foreground text-xs uppercase tracking-wide mb-2">Credential Preview</div>
              <div className="flex gap-2"><span className="text-muted-foreground w-24">Email:</span><span className="font-mono">{form.loginEmail || form.email || "—"}</span></div>
              <div className="flex gap-2"><span className="text-muted-foreground w-24">Password:</span><span className="font-mono">{form.tempPassword ? "••••••••" : "—"}</span></div>
              <div className="flex gap-2"><span className="text-muted-foreground w-24">Role:</span><span>Employee</span></div>
            </div>
          </div>
        )}

        {/* Step 2 — Company Template Upload */}
        {step === 2 && (
          <div className="grid gap-4 py-2">
            <div className="text-sm text-muted-foreground">Upload your company letterhead template. The following details will be auto-filled into the template.</div>
            <div className="rounded-lg border p-4 space-y-2 text-sm bg-muted/30">
              <div className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-3">Fields that will be filled</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5" /><div><div className="text-xs text-muted-foreground">Employee Name</div><div className="font-medium">{form.firstName} {form.lastName}</div></div></div>
                <div className="flex gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5" /><div><div className="text-xs text-muted-foreground">Joining Date</div><div className="font-medium">{form.joinDate || "—"}</div></div></div>
                <div className="flex gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5" /><div><div className="text-xs text-muted-foreground">Location</div><div className="font-medium">{form.location || "—"}</div></div></div>
                <div className="flex gap-2"><MapPin className="h-4 w-4 text-muted-foreground mt-0.5" /><div><div className="text-xs text-muted-foreground">Address</div><div className="font-medium text-xs">{form.address || "—"}</div></div></div>
              </div>
            </div>
            <div
              className="border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => document.getElementById("template-upload")?.click()}
            >
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              {templateFile ? (
                <div className="text-sm font-medium text-emerald-600">{templateFile.name}</div>
              ) : (
                <div className="text-sm text-muted-foreground">Click to upload company template (PDF / DOCX)</div>
              )}
              <input id="template-upload" type="file" accept=".pdf,.docx" className="hidden"
                onChange={(e) => setTemplateFile(e.target.files?.[0] ?? null)} />
            </div>
          </div>
        )}

        {/* Step 3 — Payroll Setup */}
        {step === 3 && (
          <div className="grid gap-4 py-2">
            <div className="space-y-1.5">
              <Label>Total / Gross Salary (₹)</Label>
              <Input type="number" placeholder="e.g. 80000" value={form.totalSalary}
                onChange={(e) => {
                  set("totalSalary", e.target.value);
                  const sal = parseFloat(e.target.value) || 0;
                  setDeductions((d) => d.map((x) => ({ ...x, amount: (sal * x.percent) / 100 })));
                }} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Deductions</Label>
                <Button variant="outline" size="sm" onClick={addDeduction}><Plus className="h-3 w-3 mr-1" /> Add Deduction</Button>
              </div>
              <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-3 py-2 font-medium text-muted-foreground">Deduction</th>
                      <th className="text-left px-3 py-2 font-medium text-muted-foreground">% Rate</th>
                      <th className="text-left px-3 py-2 font-medium text-muted-foreground">Amount (₹)</th>
                      <th className="px-2 py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {deductions.map((d) => (
                      <tr key={d.id} className="border-t">
                        <td className="px-3 py-2">
                          <Input className="h-8 text-sm" placeholder="e.g. PF" value={d.label}
                            onChange={(e) => updateDeduction(d.id, "label", e.target.value)} />
                        </td>
                        <td className="px-3 py-2">
                          <Input className="h-8 text-sm w-20" type="number" placeholder="12" value={d.percent || ""}
                            onChange={(e) => updateDeduction(d.id, "percent", e.target.value)} />
                        </td>
                        <td className="px-3 py-2 font-mono text-sm">
                          ₹{((totalSalaryNum * d.percent) / 100).toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-2 py-2">
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-rose-500" onClick={() => removeDeduction(d.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-lg bg-muted/40 p-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Gross Salary</span><span className="font-mono">₹{totalSalaryNum.toLocaleString("en-IN")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Total Deductions</span><span className="font-mono text-rose-600">- ₹{totalDeductions.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span></div>
              <Separator />
              <div className="flex justify-between font-semibold text-base"><span>Net Salary</span><span className="font-mono text-emerald-600">₹{netSalary.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span></div>
            </div>
          </div>
        )}

        {/* Step 4 — Offer Letter */}
        {step === 4 && (
          <div className="grid gap-4 py-2">
            <div className="text-sm text-muted-foreground">Review the offer letter before sending. You can edit the content below.</div>
            <div className="rounded-lg border p-5 space-y-3 text-sm bg-white dark:bg-card font-serif">
              <div className="text-center space-y-0.5">
                <div className="font-bold text-lg">ACME CORP</div>
                <div className="text-xs text-muted-foreground">123 Business Park, Bengaluru, Karnataka 560001</div>
              </div>
              <Separator />
              <div className="text-right text-xs text-muted-foreground">Date: {new Date().toLocaleDateString("en-IN")}</div>
              <div className="font-semibold">OFFER LETTER</div>
              <Textarea
                className="font-sans text-sm min-h-[200px]"
                defaultValue={`Dear ${form.firstName} ${form.lastName},

We are pleased to offer you the position of ${form.jobTitle || "[Job Title]"} in the ${form.department || "[Department]"} department at Acme Corp.

Your joining date will be ${form.joinDate || "[Join Date]"}.
Work Location: ${form.location || "[Location]"}
Address: ${form.address || "[Address]"}

Compensation:
  Gross Salary: ₹${totalSalaryNum.toLocaleString("en-IN")}/month
  Net Salary: ₹${netSalary.toLocaleString("en-IN", { maximumFractionDigits: 0 })}/month

This offer is contingent upon successful completion of background verification.

We look forward to welcoming you to the team.

Warm regards,
HR Department
Acme Corp`}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1"><Download className="h-4 w-4 mr-2" /> Download PDF</Button>
              <Button variant="outline" className="flex-1"><Upload className="h-4 w-4 mr-2" /> Send via Email</Button>
            </div>
          </div>
        )}

        <Separator />
        <div className="flex justify-between pt-1">
          <Button variant="outline" onClick={() => step === 0 ? setOpen(false) : setStep((s) => s - 1)}>
            {step === 0 ? "Cancel" : <><ChevronLeft className="h-4 w-4 mr-1" /> Back</>}
          </Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)}>Next <ChevronRight className="h-4 w-4 ml-1" /></Button>
          ) : (
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setOpen(false); reset(); }}>
              <Check className="h-4 w-4 mr-1" /> Create Employee
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EmployeeDirectory() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const filtered = employees.filter((e) =>
    (dept === "all" || e.department === dept) &&
    (e.name.toLowerCase().includes(q.toLowerCase()) || e.email.toLowerCase().includes(q.toLowerCase()))
  );
  const depts = ["all", ...Array.from(new Set(employees.map((e) => e.department)))];

  return (
    <Card>
      <CardHeader className="flex flex-col md:flex-row md:items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or email…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
        </div>
        <Select value={dept} onValueChange={setDept}>
          <SelectTrigger className="w-full md:w-48"><SelectValue /></SelectTrigger>
          <SelectContent>{depts.map((d) => <SelectItem key={d} value={d}>{d === "all" ? "All departments" : d}</SelectItem>)}</SelectContent>
        </Select>
        <Button variant="outline"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead><TableHead>ID</TableHead>
              <TableHead>Department</TableHead><TableHead>Location</TableHead>
              <TableHead>Joined</TableHead><TableHead>Manager</TableHead>
              <TableHead>Status</TableHead><TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((e) => (
              <TableRow key={e.id} className="hover:bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/10 text-primary">{e.name.split(" ").map((s) => s[0]).join("")}</AvatarFallback></Avatar>
                    <div className="min-w-0"><div className="font-medium text-sm truncate">{e.name}</div><div className="text-xs text-muted-foreground truncate">{e.jobTitle}</div></div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{e.id}</TableCell>
                <TableCell><Badge variant="outline">{e.department}</Badge></TableCell>
                <TableCell>{e.location}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{e.joined}</TableCell>
                <TableCell className="text-sm">{e.manager}</TableCell>
                <TableCell><Badge variant={e.status === "Active" ? "default" : e.status === "On Leave" ? "secondary" : "outline"}>{e.status}</Badge></TableCell>
                <TableCell><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function BulkActions({ type }: { type: "import" | "export" | "transfer" | "promotion" | "termination" }) {
  const configs = {
    import: { icon: Upload, title: "Bulk Import Employees", desc: "Upload a CSV file to import multiple employees at once.", action: "Import", color: "text-emerald-600" },
    export: { icon: Download, title: "Bulk Export Employees", desc: "Export all employee data to CSV or Excel format.", action: "Export", color: "text-purple-600" },
    transfer: { icon: ArrowRightLeft, title: "Employee Transfer", desc: "Transfer employees between departments or locations.", action: "Process Transfer", color: "text-amber-600" },
    promotion: { icon: TrendingUp, title: "Employee Promotion", desc: "Update designation, level, and compensation for promotions.", action: "Process Promotion", color: "text-teal-600" },
    termination: { icon: UserMinus, title: "Employee Termination", desc: "Initiate offboarding and termination process.", action: "Initiate Termination", color: "text-rose-600" },
  };
  const cfg = configs[type];
  const Icon = cfg.icon;

  return (
    <Card>
      <CardContent className="pt-8 max-w-lg mx-auto text-center space-y-4">
        <div className={`h-16 w-16 rounded-2xl bg-muted grid place-items-center mx-auto ${cfg.color}`}>
          <Icon className="h-8 w-8" />
        </div>
        <div>
          <div className="font-semibold text-lg">{cfg.title}</div>
          <div className="text-sm text-muted-foreground mt-1">{cfg.desc}</div>
        </div>
        {type === "import" && (
          <div className="border-2 border-dashed rounded-xl p-8 text-sm text-muted-foreground">
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            Drag & drop CSV file here, or click to browse
            <div className="mt-2"><Button variant="outline" size="sm">Browse File</Button></div>
          </div>
        )}
        {type === "export" && (
          <div className="flex gap-3 justify-center">
            <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
            <Button><Download className="h-4 w-4 mr-2" /> Export Excel</Button>
          </div>
        )}
        {(type === "transfer" || type === "promotion" || type === "termination") && (
          <div className="space-y-3 text-left">
            <div className="space-y-1.5">
              <Label>Select Employee</Label>
              <Select><SelectTrigger><SelectValue placeholder="Choose employee" /></SelectTrigger>
                <SelectContent>{employees.map((e) => <SelectItem key={e.id} value={e.id}>{e.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            {type === "transfer" && (
              <div className="space-y-1.5">
                <Label>Transfer To Department</Label>
                <Select><SelectTrigger><SelectValue placeholder="Select department" /></SelectTrigger>
                  <SelectContent>{["Engineering", "Sales", "Marketing", "Design"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            )}
            {type === "promotion" && (
              <div className="space-y-1.5">
                <Label>New Designation</Label>
                <Input placeholder="e.g. Senior Engineer" />
              </div>
            )}
            {type === "termination" && (
              <div className="space-y-1.5">
                <Label>Last Working Day</Label>
                <Input type="date" />
              </div>
            )}
            <Button className="w-full">{cfg.action}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function HREmployees() {
  return (
    <PortalShell
      role="hr"
      title="Employee Management"
      subtitle={`${employees.length} employees across all departments`}
      actions={
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
          <CreateEmployeeDialog />
        </div>
      }
    >
      <Tabs defaultValue="directory">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="directory">Employee Directory</TabsTrigger>
          <TabsTrigger value="create">Create Employee</TabsTrigger>
          <TabsTrigger value="import">Bulk Import</TabsTrigger>
          <TabsTrigger value="export">Bulk Export</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="promotion">Promotion</TabsTrigger>
          <TabsTrigger value="termination">Termination</TabsTrigger>
        </TabsList>
        <TabsContent value="directory"><EmployeeDirectory /></TabsContent>
        <TabsContent value="create">
          <Card><CardContent className="pt-8 max-w-lg mx-auto">
            <div className="font-semibold text-lg mb-4">Create New Employee</div>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>First Name</Label><Input placeholder="John" /></div>
                <div className="space-y-1.5"><Label>Last Name</Label><Input placeholder="Doe" /></div>
              </div>
              <div className="space-y-1.5"><Label>Email</Label><Input type="email" placeholder="john.doe@acme.com" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Department</Label>
                  <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>{["Engineering", "Sales", "Marketing", "Design", "People Ops", "Finance"].map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5"><Label>Job Title</Label><Input placeholder="Software Engineer" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Location</Label><Input placeholder="Bengaluru" /></div>
                <div className="space-y-1.5"><Label>Join Date</Label><Input type="date" /></div>
              </div>
              <div className="space-y-1.5"><Label>Manager</Label><Input placeholder="Manager name" /></div>
              <Button className="w-full">Create Employee</Button>
            </div>
          </CardContent></Card>
        </TabsContent>
        <TabsContent value="import"><BulkActions type="import" /></TabsContent>
        <TabsContent value="export"><BulkActions type="export" /></TabsContent>
        <TabsContent value="transfer"><BulkActions type="transfer" /></TabsContent>
        <TabsContent value="promotion"><BulkActions type="promotion" /></TabsContent>
        <TabsContent value="termination"><BulkActions type="termination" /></TabsContent>
      </Tabs>
    </PortalShell>
  );
}
