import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/admin/settings")({ component: AdminSettings });

function AdminSettings() {
  return (
    <PortalShell role="admin" title="Settings" subtitle="Platform configuration, security and integrations"
      actions={<Button>Save changes</Button>}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Organization</CardTitle><CardDescription>Basic details visible across the platform.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2"><Label>Legal name</Label><Input defaultValue="Acme Corporation, Inc." /></div>
            <div className="grid gap-2"><Label>Primary domain</Label><Input defaultValue="acme.com" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2"><Label>Timezone</Label>
                <Select defaultValue="pst"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="pst">Pacific (PST)</SelectItem><SelectItem value="ist">India (IST)</SelectItem><SelectItem value="cet">Central Europe</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="grid gap-2"><Label>Fiscal year start</Label>
                <Select defaultValue="apr"><SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="jan">January</SelectItem><SelectItem value="apr">April</SelectItem><SelectItem value="jul">July</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Security</CardTitle><CardDescription>Authentication and access policies.</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            {[
              ["Enforce SSO for all users", true],
              ["Require MFA (TOTP)", true],
              ["Password rotation every 90 days", false],
              ["Session timeout (30 min)", true],
              ["IP allowlist for admin actions", false],
            ].map(([l, v]) => (
              <div key={l as string} className="flex items-center justify-between rounded-lg border p-3">
                <div className="text-sm">{l}</div>
                <Switch defaultChecked={v as boolean} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Integrations</CardTitle><CardDescription>Connected identity, HRIS and payroll systems.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Okta SSO", "Connected"], ["Slack", "Connected"], ["Google Workspace", "Connected"],
              ["Stripe (Billing)", "Connected"], ["ADP Payroll", "Not connected"], ["Workday HCM", "Not connected"],
            ].map(([n, s]) => (
              <div key={n as string} className="flex items-center justify-between rounded-lg border p-3">
                <div className="text-sm font-medium">{n}</div>
                <Button variant={s === "Connected" ? "outline" : "default"} size="sm">{s === "Connected" ? "Manage" : "Connect"}</Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Feature flags</CardTitle><CardDescription>Gradual rollouts and experiments.</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            {[
              ["ai-copilot", "AI HR Copilot", true], ["new-payroll-ui", "Payroll UI v2", true],
              ["deel-integration", "Deel EOR sync", false], ["skills-taxonomy", "Skills taxonomy v3", false],
            ].map(([k, l, v]) => (
              <div key={k as string} className="flex items-center justify-between rounded-lg border p-3">
                <div><div className="text-sm font-medium">{l}</div><div className="text-xs text-muted-foreground font-mono">{k}</div></div>
                <Switch defaultChecked={v as boolean} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PortalShell>
  );
}
