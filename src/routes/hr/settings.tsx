import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Settings, Building2, Calendar, DollarSign, Bell } from "lucide-react";

export const Route = createFileRoute("/hr/settings")({ component: HRSettings });

function HRSettings() {
  return (
    <PortalShell role="hr" title="Settings" subtitle="Configure HR module preferences">
      <Tabs defaultValue="company">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="company"><Building2 className="h-4 w-4 mr-1" /> Company</TabsTrigger>
          <TabsTrigger value="leave"><Calendar className="h-4 w-4 mr-1" /> Leave Policy</TabsTrigger>
          <TabsTrigger value="payroll"><DollarSign className="h-4 w-4 mr-1" /> Payroll</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="h-4 w-4 mr-1" /> Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader><CardTitle>Company Information</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <div className="space-y-1.5"><Label>Company Name</Label><Input defaultValue="Acme Corp" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5"><Label>Industry</Label><Input defaultValue="Technology" /></div>
                <div className="space-y-1.5"><Label>Company Size</Label><Input defaultValue="1,240 employees" /></div>
              </div>
              <div className="space-y-1.5"><Label>Headquarters</Label><Input defaultValue="San Francisco, CA" /></div>
              <div className="space-y-1.5"><Label>Fiscal Year Start</Label>
                <Select defaultValue="jan">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {["January", "April", "July", "October"].map((m) => (
                      <SelectItem key={m} value={m.toLowerCase().slice(0, 3)}>{m}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Work Week</Label>
                <Select defaultValue="mon-fri">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mon-fri">Monday – Friday</SelectItem>
                    <SelectItem value="mon-sat">Monday – Saturday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leave">
          <Card>
            <CardHeader><CardTitle>Leave Policy Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              {[
                { label: "Casual Leave (days/year)", defaultValue: "15" },
                { label: "Sick Leave (days/year)", defaultValue: "12" },
                { label: "Annual Leave (days/year)", defaultValue: "21" },
                { label: "Maternity Leave (days)", defaultValue: "180" },
                { label: "Paternity Leave (days)", defaultValue: "15" },
              ].map((f) => (
                <div key={f.label} className="space-y-1.5">
                  <Label>{f.label}</Label>
                  <Input type="number" defaultValue={f.defaultValue} className="w-32" />
                </div>
              ))}
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium text-sm">Carry Forward Unused Leaves</div>
                  <div className="text-xs text-muted-foreground">Allow employees to carry forward unused leaves to next year</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium text-sm">Require Medical Certificate</div>
                  <div className="text-xs text-muted-foreground">For sick leave beyond 3 consecutive days</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Button>Save Policy</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card>
            <CardHeader><CardTitle>Payroll Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4 max-w-lg">
              <div className="space-y-1.5"><Label>Payroll Cycle</Label>
                <Select defaultValue="monthly">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-weekly</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Payroll Cutoff Day</Label><Input type="number" defaultValue="25" className="w-32" /></div>
              <div className="space-y-1.5"><Label>Pay Day</Label><Input type="number" defaultValue="30" className="w-32" /></div>
              <div className="space-y-1.5"><Label>Currency</Label>
                <Select defaultValue="usd">
                  <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usd">USD ($)</SelectItem>
                    <SelectItem value="inr">INR (₹)</SelectItem>
                    <SelectItem value="eur">EUR (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <div className="font-medium text-sm">Auto-run Payroll</div>
                  <div className="text-xs text-muted-foreground">Automatically process payroll on cutoff date</div>
                </div>
                <Switch />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader><CardTitle>Notification Preferences</CardTitle></CardHeader>
            <CardContent className="space-y-3 max-w-lg">
              {[
                { label: "Leave Request Submitted", desc: "Notify when an employee submits a leave request" },
                { label: "Attendance Correction Request", desc: "Notify when an employee requests attendance correction" },
                { label: "New Employee Joined", desc: "Notify HR team when a new employee is onboarded" },
                { label: "Document Expiry Alert", desc: "Alert 30 days before document expiry" },
                { label: "Payroll Run Reminder", desc: "Remind 3 days before payroll cutoff" },
                { label: "Performance Review Due", desc: "Notify when review cycle is approaching deadline" },
              ].map((n) => (
                <div key={n.label} className="flex items-center justify-between rounded-lg border p-4">
                  <div>
                    <div className="font-medium text-sm">{n.label}</div>
                    <div className="text-xs text-muted-foreground">{n.desc}</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
