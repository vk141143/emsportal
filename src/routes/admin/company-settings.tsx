import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Globe, Building2, MapPin, Clock, DollarSign, Calendar } from "lucide-react";

export const Route = createFileRoute("/admin/company-settings")({ component: AdminCompanySettings });

function AdminCompanySettings() {
  return (
    <PortalShell
      role="admin"
      title="Company Settings"
      subtitle="Configure company profile, locations, and preferences"
      actions={<Button>Save Changes</Button>}
    >
      <Tabs defaultValue="general">
        <TabsList className="flex-wrap">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="workdays">Work Days</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building2 className="h-4 w-4" /> Company Profile</CardTitle>
                <CardDescription>Basic company information visible across the platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2"><Label>Company Name</Label><Input defaultValue="Acme Corporation Pvt. Ltd." /></div>
                <div className="grid gap-2"><Label>GST Number</Label><Input defaultValue="29AABCU9603R1ZX" /></div>
                <div className="grid gap-2"><Label>PAN Number</Label><Input defaultValue="AABCU9603R" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2"><Label>Email</Label><Input defaultValue="hr@acme.com" /></div>
                  <div className="grid gap-2"><Label>Phone</Label><Input defaultValue="+91 80 4567 8900" /></div>
                </div>
                <div className="grid gap-2"><Label>Website</Label><Input defaultValue="https://acme.com" /></div>
                <div className="grid gap-2"><Label>Registered Address</Label><Input defaultValue="123 Tech Park, Bengaluru, Karnataka 560001" /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="h-4 w-4" /> Branding</CardTitle>
                <CardDescription>Logo, colors, and brand identity.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-xl border-2 border-dashed p-8 text-center">
                  <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 grid place-items-center text-white font-bold text-2xl mx-auto mb-3">A</div>
                  <div className="text-sm font-medium">Company Logo</div>
                  <div className="text-xs text-muted-foreground mt-1">PNG, SVG up to 2MB</div>
                  <Button variant="outline" size="sm" className="mt-3">Upload Logo</Button>
                </div>
                <div className="grid gap-2"><Label>Brand Color</Label>
                  <div className="flex gap-2">
                    <Input defaultValue="#6366f1" className="flex-1" />
                    <div className="h-9 w-9 rounded-md border" style={{ background: "#6366f1" }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Office Locations & Branches</CardTitle>
                  <CardDescription className="mt-1">Manage all company offices and branches.</CardDescription>
                </div>
                <Button size="sm">Add Location</Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/30">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Branch Name</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">City</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Country</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Employees</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground">Type</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "HQ — Bengaluru", city: "Bengaluru", country: "India", employees: 142, type: "Headquarters" },
                    { name: "Austin Office", city: "Austin", country: "USA", employees: 38, type: "Branch" },
                    { name: "London Office", city: "London", country: "UK", employees: 24, type: "Branch" },
                    { name: "Tokyo Office", city: "Tokyo", country: "Japan", employees: 18, type: "Branch" },
                    { name: "Remote", city: "—", country: "Global", employees: 26, type: "Remote" },
                  ].map((loc) => (
                    <tr key={loc.name} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{loc.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{loc.city}</td>
                      <td className="px-4 py-3 text-muted-foreground">{loc.country}</td>
                      <td className="px-4 py-3">{loc.employees}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{loc.type}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workdays">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Working Days</CardTitle>
                <CardDescription>Configure working days and weekend policy.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                  <div key={day} className="flex items-center justify-between rounded-lg border p-3">
                    <span className="text-sm font-medium">{day}</span>
                    <Switch defaultChecked={!["Saturday", "Sunday"].includes(day)} />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4" /> Office Hours</CardTitle>
                <CardDescription>Default working hours configuration.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2"><Label>Start Time</Label><Input type="time" defaultValue="09:00" /></div>
                  <div className="grid gap-2"><Label>End Time</Label><Input type="time" defaultValue="18:00" /></div>
                </div>
                <div className="grid gap-2"><Label>Grace Time (minutes)</Label><Input type="number" defaultValue="15" /></div>
                <div className="grid gap-2"><Label>Break Duration (minutes)</Label><Input type="number" defaultValue="60" /></div>
                <Separator />
                <div className="space-y-3">
                  {[
                    ["Flexible Timings", false],
                    ["Overtime Tracking", true],
                    ["GPS Attendance", false],
                    ["IP Restriction", false],
                  ].map(([label, val]) => (
                    <div key={label as string} className="flex items-center justify-between rounded-lg border p-3">
                      <span className="text-sm">{label}</span>
                      <Switch defaultChecked={val as boolean} />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preferences">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Globe className="h-4 w-4" /> Regional Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2"><Label>Timezone</Label>
                  <Select defaultValue="ist">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ist">Asia/Kolkata (IST +5:30)</SelectItem>
                      <SelectItem value="pst">America/Los_Angeles (PST -8:00)</SelectItem>
                      <SelectItem value="gmt">Europe/London (GMT +0:00)</SelectItem>
                      <SelectItem value="jst">Asia/Tokyo (JST +9:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2"><Label>Currency</Label>
                  <Select defaultValue="inr">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inr">INR — Indian Rupee (₹)</SelectItem>
                      <SelectItem value="usd">USD — US Dollar ($)</SelectItem>
                      <SelectItem value="gbp">GBP — British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2"><Label>Date Format</Label>
                  <Select defaultValue="dmy">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2"><Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2"><Label>Fiscal Year Start</Label>
                  <Select defaultValue="apr">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan">January</SelectItem>
                      <SelectItem value="apr">April</SelectItem>
                      <SelectItem value="jul">July</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </PortalShell>
  );
}
