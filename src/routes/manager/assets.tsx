import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, StatCard } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Laptop, Monitor, Smartphone, Wifi, Package, RotateCcw, Calendar, Hash } from "lucide-react";

export const Route = createFileRoute("/manager/assets")({ component: ManagerAssets });

const assets = [
  { id: "AST-2001-01", type: "Laptop", name: "MacBook Pro 14\" M3", serial: "C02XG2JFHV2Q", assigned: "2022-03-14", condition: "Good", icon: Laptop, color: "bg-sky-100 text-sky-600", specs: "Apple M3 · 16GB RAM · 512GB SSD" },
  { id: "AST-2001-02", type: "Monitor", name: "Dell UltraSharp 27\" 4K", serial: "CN-0T2HR0-74231", assigned: "2022-03-14", condition: "Good", icon: Monitor, color: "bg-violet-100 text-violet-600", specs: "27\" · 4K UHD · USB-C Hub" },
  { id: "AST-2001-03", type: "SIM Card", name: "Airtel Corporate SIM", serial: "8991101200003204663", assigned: "2022-04-01", condition: "Active", icon: Wifi, color: "bg-emerald-100 text-emerald-600", specs: "5G · Unlimited Data · Corp Plan" },
  { id: "AST-2001-04", type: "Phone", name: "iPhone 15 Pro", serial: "DNPXQ2XFHV2Q", assigned: "2023-01-10", condition: "Good", icon: Smartphone, color: "bg-amber-100 text-amber-600", specs: "256GB · Space Black · iOS 18" },
];

function ManagerAssets() {
  return (
    <PortalShell role="manager" title="Assets" subtitle="Company assets assigned to you">
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Total assets" value="4" delta="All in good condition" icon={Package} tone="up" />
        <StatCard label="Laptop" value="MacBook M3" delta="Assigned Mar 2022" icon={Laptop} />
        <StatCard label="Phone" value="iPhone 15 Pro" delta="Assigned Jan 2023" icon={Smartphone} />
        <StatCard label="Returns" value="0" delta="Historical" icon={RotateCcw} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {assets.map((a) => {
          const Icon = a.icon;
          return (
            <Card key={a.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`h-14 w-14 rounded-xl grid place-items-center shrink-0 ${a.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-semibold">{a.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{a.specs}</div>
                      </div>
                      <Badge variant="secondary">{a.condition}</Badge>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Hash className="h-3 w-3" />
                        <span className="font-mono truncate">{a.serial}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>Since {a.assigned}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Badge variant="outline" className="text-[10px]">{a.type}</Badge>
                      <Badge variant="outline" className="text-[10px] font-mono">{a.id}</Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-1">
                        <RotateCcw className="h-3.5 w-3.5" /> Return Asset
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>Return Asset — {a.name}</DialogTitle></DialogHeader>
                      <div className="space-y-4 py-2">
                        <div className="rounded-lg bg-muted/50 p-3 text-sm space-y-1">
                          <div className="font-medium">{a.name}</div>
                          <div className="text-muted-foreground font-mono text-xs">{a.serial}</div>
                        </div>
                        <div className="space-y-2">
                          <Label>Reason for return</Label>
                          <select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
                            {["Upgrade", "Damaged", "No longer needed", "Leaving company", "Other"].map((r) => <option key={r}>{r}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label>Condition on return</Label>
                          <select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
                            {["Excellent", "Good", "Fair", "Damaged"].map((c) => <option key={c}>{c}</option>)}
                          </select>
                        </div>
                        <div className="space-y-2"><Label>Notes</Label><Textarea rows={3} placeholder="Any additional notes…" /></div>
                      </div>
                      <DialogFooter><Button>Submit Return Request</Button></DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm">Report Issue</Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><RotateCcw className="h-4 w-4" /> Return History</CardTitle></CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground text-center py-8">No return history</div>
        </CardContent>
      </Card>
    </PortalShell>
  );
}
