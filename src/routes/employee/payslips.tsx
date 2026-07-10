import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wallet, TrendingUp, Landmark, Download, FileText, Plus, Receipt } from "lucide-react";
import { payslips } from "@/lib/mock-data";

export const Route = createFileRoute("/employee/payslips")({ component: EmployeePayroll });

const pfData = [
  { month: "Jun 2026", employee: 1140, employer: 1140, total: 2280, balance: 48600 },
  { month: "May 2026", employee: 1140, employer: 1140, total: 2280, balance: 46320 },
  { month: "Apr 2026", employee: 1140, employer: 1140, total: 2280, balance: 44040 },
  { month: "Mar 2026", employee: 1104, employer: 1104, total: 2208, balance: 41760 },
];

const esiData = [
  { month: "Jun 2026", employee: 142.5, employer: 712.5, total: 855, status: "Paid" },
  { month: "May 2026", employee: 142.5, employer: 712.5, total: 855, status: "Paid" },
  { month: "Apr 2026", employee: 142.5, employer: 712.5, total: 855, status: "Paid" },
];

const taxData = [
  { label: "Gross Salary (YTD)", value: "₹57,000" },
  { label: "Standard Deduction", value: "₹50,000" },
  { label: "HRA Exemption", value: "₹18,000" },
  { label: "Section 80C", value: "₹1,50,000" },
  { label: "Section 80D (Health)", value: "₹25,000" },
  { label: "Taxable Income", value: "₹2,14,000" },
  { label: "Tax Payable", value: "₹0 (Nil slab)" },
  { label: "TDS Deducted (YTD)", value: "₹0" },
];

const reimbursements = [
  { id: "R-01", type: "Travel", amount: 2400, date: "2026-07-05", status: "Approved", desc: "Client visit — Pune" },
  { id: "R-02", type: "Internet", amount: 800, date: "2026-07-01", status: "Paid", desc: "Monthly broadband" },
  { id: "R-03", type: "Books", amount: 1200, date: "2026-06-20", status: "Pending", desc: "Tech books" },
  { id: "R-04", type: "Meal", amount: 650, date: "2026-06-15", status: "Rejected", desc: "Team lunch" },
];

function EmployeePayroll() {
  const ytd = payslips.reduce((s, p) => s + p.net, 0);
  return (
    <PortalShell role="employee" title="Payroll" subtitle="Salary slips, PF, ESI, tax and reimbursements">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="YTD Net Pay" value={`₹${ytd.toLocaleString()}`} delta="6 payslips" icon={Wallet} tone="up" />
        <StatCard label="Last payslip" value="₹7,680" delta="June 30, 2026" icon={TrendingUp} />
        <StatCard label="PF Balance" value="₹48,600" delta="Employee + Employer" icon={Landmark} tone="up" />
        <StatCard label="Next payout" value="Jul 30" delta="Direct deposit" icon={Wallet} />
      </div>

      <Tabs defaultValue="slips">
        <TabsList>
          <TabsTrigger value="slips">Salary Slips</TabsTrigger>
          <TabsTrigger value="pf">PF</TabsTrigger>
          <TabsTrigger value="esi">ESI</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="reimbursements">Reimbursements</TabsTrigger>
        </TabsList>

        <TabsContent value="slips">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>Payslip History</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Gross</TableHead>
                      <TableHead>Deductions</TableHead>
                      <TableHead>Net</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payslips.map((p) => (
                      <TableRow key={p.period}>
                        <TableCell className="font-medium">{p.period}</TableCell>
                        <TableCell>₹{p.gross.toLocaleString()}</TableCell>
                        <TableCell className="text-muted-foreground">₹{p.deductions.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">₹{p.net.toLocaleString()}</TableCell>
                        <TableCell><Badge>{p.status}</Badge></TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm"><Download className="h-4 w-4 mr-1" /> PDF</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Tax Documents</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {["Form 16 · FY 2025-26", "Investment Declaration", "Rent Receipts", "Section 80C Proofs", "Form 12BB"].map((d) => (
                  <div key={d} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="text-sm truncate">{d}</div>
                    </div>
                    <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pf">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>PF Contribution History</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Employee (12%)</TableHead>
                      <TableHead>Employer (12%)</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Running Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pfData.map((p) => (
                      <TableRow key={p.month}>
                        <TableCell className="font-medium">{p.month}</TableCell>
                        <TableCell>₹{p.employee}</TableCell>
                        <TableCell>₹{p.employer}</TableCell>
                        <TableCell className="font-semibold">₹{p.total}</TableCell>
                        <TableCell className="text-emerald-600 font-semibold">₹{p.balance.toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>PF Summary</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  ["UAN Number", "100987654321"],
                  ["PF Account", "MH/BAN/12345/000/0001234"],
                  ["Total Balance", "₹48,600"],
                  ["Employee Share", "₹24,300"],
                  ["Employer Share", "₹24,300"],
                  ["Interest Rate", "8.15% p.a."],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b pb-2 last:border-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">Download PF Passbook</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="esi">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader><CardTitle>ESI Contribution History</CardTitle></CardHeader>
              <CardContent className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Employee (0.75%)</TableHead>
                      <TableHead>Employer (3.25%)</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {esiData.map((e) => (
                      <TableRow key={e.month}>
                        <TableCell className="font-medium">{e.month}</TableCell>
                        <TableCell>₹{e.employee}</TableCell>
                        <TableCell>₹{e.employer}</TableCell>
                        <TableCell className="font-semibold">₹{e.total}</TableCell>
                        <TableCell><Badge>{e.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>ESI Details</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {[
                  ["ESI Number", "31-00-123456-000-0001"],
                  ["Dispensary", "ESI Hospital, Bengaluru"],
                  ["Coverage", "Self + Family"],
                  ["Eligible Since", "Mar 2022"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b pb-2 last:border-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-medium">{v}</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">Download ESI Card</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tax">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle>Tax Computation — FY 2026-27</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                {taxData.map(({ label, value }) => (
                  <div key={label} className="flex justify-between border-b pb-2 last:border-0">
                    <span className="text-muted-foreground">{label}</span>
                    <span className="font-semibold">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Investment Declaration</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { section: "80C — PF + ELSS", declared: 150000, limit: 150000 },
                  { section: "80D — Health Insurance", declared: 25000, limit: 25000 },
                  { section: "HRA Exemption", declared: 18000, limit: 60000 },
                  { section: "LTA", declared: 0, limit: 20000 },
                ].map((inv) => (
                  <div key={inv.section} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{inv.section}</span>
                      <span className="text-muted-foreground">₹{inv.declared.toLocaleString()} / ₹{inv.limit.toLocaleString()}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${(inv.declared / inv.limit) * 100}%` }} />
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-2">Submit Declaration</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reimbursements">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2"><Receipt className="h-4 w-4" /> Reimbursements</CardTitle>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Claim</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Submit Reimbursement</DialogTitle></DialogHeader>
                  <div className="space-y-4 py-2">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
                        {["Travel", "Internet", "Books", "Meal", "Medical", "Other"].map((t) => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2"><Label>Amount (₹)</Label><Input type="number" placeholder="0.00" /></div>
                    <div className="space-y-2"><Label>Date</Label><Input type="date" /></div>
                    <div className="space-y-2"><Label>Description</Label><Textarea rows={2} /></div>
                    <div className="space-y-2"><Label>Receipt</Label><Input type="file" /></div>
                  </div>
                  <DialogFooter><Button>Submit</Button></DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reimbursements.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell>{r.type}</TableCell>
                      <TableCell className="text-muted-foreground">{r.desc}</TableCell>
                      <TableCell className="font-semibold">₹{r.amount}</TableCell>
                      <TableCell>{r.date}</TableCell>
                      <TableCell>
                        <Badge variant={r.status === "Paid" ? "default" : r.status === "Approved" ? "secondary" : r.status === "Rejected" ? "destructive" : "outline"}>
                          {r.status}
                        </Badge>
                      </TableCell>
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
