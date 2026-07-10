import { createFileRoute } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Download, Search, Upload, FolderOpen, AlertTriangle, Eye, X } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/employee/documents")({ component: EmployeeDocs });

const docs = [
  { name: "Offer Letter.pdf", category: "Onboarding", date: "2022-03-01", size: "245 KB", expiry: null },
  { name: "Employment Contract.pdf", category: "Onboarding", date: "2022-03-14", size: "512 KB", expiry: null },
  { name: "NDA - Confidentiality.pdf", category: "Legal", date: "2022-03-14", size: "180 KB", expiry: null },
  { name: "PAN Card.pdf", category: "KYC", date: "2022-03-15", size: "95 KB", expiry: null },
  { name: "Aadhaar Card.pdf", category: "KYC", date: "2022-03-15", size: "120 KB", expiry: null },
  { name: "Payslip - June 2026.pdf", category: "Payroll", date: "2026-06-30", size: "88 KB", expiry: null },
  { name: "Form 16 - FY 2025-26.pdf", category: "Tax", date: "2026-05-31", size: "310 KB", expiry: null },
  { name: "Health Insurance Card.pdf", category: "Benefits", date: "2025-04-01", size: "72 KB", expiry: "2026-03-31" },
  { name: "Passport Copy.pdf", category: "KYC", date: "2022-03-15", size: "200 KB", expiry: "2026-08-10" },
  { name: "Driving License.pdf", category: "KYC", date: "2022-03-15", size: "150 KB", expiry: "2026-07-25" },
  { name: "Performance Review Q2 2026.pdf", category: "Performance", date: "2026-06-15", size: "220 KB", expiry: null },
];

const categories = ["All", "Onboarding", "Payroll", "Tax", "Benefits", "Legal", "Performance", "KYC"];

function DocCard({ d, onPreview }: { d: typeof docs[0]; onPreview: (name: string) => void }) {
  const isExpiringSoon = d.expiry && new Date(d.expiry) < new Date("2026-08-31");
  const isExpired = d.expiry && new Date(d.expiry) < new Date("2026-07-10");
  return (
    <div className="group flex items-start gap-3 rounded-lg border p-4 hover:shadow-md transition-all bg-card">
      <div className={`h-10 w-10 rounded-lg grid place-items-center shrink-0 ${isExpired ? "bg-rose-100 text-rose-600" : isExpiringSoon ? "bg-amber-100 text-amber-600" : "bg-primary/10 text-primary"}`}>
        <FileText className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium text-sm truncate">{d.name}</div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <FolderOpen className="h-3 w-3" />{d.category} · {d.size}
        </div>
        <div className="text-[11px] text-muted-foreground mt-0.5">Uploaded {d.date}</div>
        {d.expiry && (
          <div className={`text-[11px] mt-1 flex items-center gap-1 ${isExpired ? "text-rose-600" : "text-amber-600"}`}>
            <AlertTriangle className="h-3 w-3" />
            {isExpired ? "Expired" : "Expires"} {d.expiry}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <Button variant="ghost" size="icon" onClick={() => onPreview(d.name)}><Eye className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
      </div>
    </div>
  );
}

function EmployeeDocs() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [previewDoc, setPreviewDoc] = useState<string | null>(null);

  const filtered = docs.filter((d) =>
    (activeCategory === "All" || d.category === activeCategory) &&
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const expiryAlerts = docs.filter((d) => d.expiry && new Date(d.expiry) < new Date("2026-08-31"));

  return (
    <PortalShell
      role="employee"
      title="My Documents"
      subtitle="Contracts, IDs, payslips and personal uploads"
      actions={
        <Dialog>
          <DialogTrigger asChild>
            <Button><Upload className="h-4 w-4 mr-2" /> Upload Document</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Upload Document</DialogTitle></DialogHeader>
            <div className="space-y-4 py-2">
              <div className="border-2 border-dashed rounded-xl p-8 text-center space-y-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                <div className="text-sm font-medium">Drop files here or click to browse</div>
                <div className="text-xs text-muted-foreground">PDF, JPG, PNG up to 10MB</div>
              </div>
              <Input placeholder="Document name" />
              <select className="w-full rounded-md border px-3 py-2 text-sm bg-background">
                {categories.slice(1).map((c) => <option key={c}>{c}</option>)}
              </select>
              <Button className="w-full">Upload</Button>
            </div>
          </DialogContent>
        </Dialog>
      }
    >
      {expiryAlerts.length > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-base">
              <AlertTriangle className="h-4 w-4" /> Expiry Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {expiryAlerts.map((d) => (
              <Badge key={d.name} variant="outline" className="border-amber-300 text-amber-700 dark:text-amber-400 gap-1">
                <AlertTriangle className="h-3 w-3" /> {d.name} · {d.expiry}
              </Badge>
            ))}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Documents</TabsTrigger>
          <TabsTrigger value="expiry" className="gap-1">
            <AlertTriangle className="h-3 w-3 text-amber-500" /> Expiry Alerts
            <Badge variant="destructive" className="ml-1 h-4 px-1 text-[10px]">{expiryAlerts.length}</Badge>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Badge
                    key={c}
                    variant={c === activeCategory ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setActiveCategory(c)}
                  >
                    {c}
                  </Badge>
                ))}
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search documents…" className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((d) => <DocCard key={d.name} d={d} onPreview={setPreviewDoc} />)}
                {filtered.length === 0 && (
                  <div className="col-span-3 text-center py-12 text-muted-foreground">No documents found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expiry">
          <Card>
            <CardHeader><CardTitle>Documents Expiring Soon</CardTitle></CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {expiryAlerts.map((d) => <DocCard key={d.name} d={d} onPreview={setPreviewDoc} />)}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Preview Dialog */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{previewDoc}</span>
            </DialogTitle>
          </DialogHeader>
          <div className="rounded-xl border bg-muted/40 h-96 flex items-center justify-center">
            <div className="text-center space-y-2 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto opacity-40" />
              <div className="text-sm">Document preview</div>
              <div className="text-xs">PDF viewer would render here</div>
            </div>
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setPreviewDoc(null)}><X className="h-4 w-4 mr-2" /> Close</Button>
            <Button><Download className="h-4 w-4 mr-2" /> Download</Button>
          </div>
        </DialogContent>
      </Dialog>
    </PortalShell>
  );
}
