import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth, roleHome, type Role } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/login")({ component: LoginPage });

const DEMO: { role: Role; email: string; label: string; color: string }[] = [
  { role: "employee", email: "employee@acme.com", label: "Employee", color: "from-sky-500 to-indigo-500" },
  { role: "manager", email: "manager@acme.com", label: "Manager", color: "from-emerald-500 to-teal-500" },
  { role: "hr", email: "hr@acme.com", label: "HR", color: "from-fuchsia-500 to-rose-500" },
  { role: "admin", email: "admin@acme.com", label: "Super Admin", color: "from-amber-500 to-orange-600" },
];

function LoginPage() {
  const { login, user, hydrated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("employee@acme.com");
  const [password, setPassword] = useState("demo");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (hydrated && user) navigate({ to: roleHome[user.role] });
  }, [hydrated, user, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name}`);
      navigate({ to: roleHome[u.role] });
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      <div className="hidden lg:flex relative overflow-hidden bg-gradient-to-br from-indigo-600 via-fuchsia-600 to-rose-500 text-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative flex flex-col justify-between p-12 w-full">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-lg bg-white/20 backdrop-blur grid place-items-center font-bold">A</div>
            <span className="font-semibold">Acme HRMS</span>
          </div>
          <div>
            <h2 className="text-4xl font-bold leading-tight">The operating system for modern People Ops.</h2>
            <p className="mt-4 text-white/80 max-w-md">Trusted by 8,000+ enterprises across finance, healthcare and tech to run hire-to-retire workflows on a single, secure platform.</p>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              {[["12M+", "Payslips/yr"], ["99.99%", "Uptime SLA"], ["120+", "Countries"]].map(([v, l]) => (
                <div key={l} className="rounded-xl bg-white/10 backdrop-blur p-4">
                  <div className="text-2xl font-bold">{v}</div>
                  <div className="text-xs text-white/70">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-xs text-white/60">© 2026 Acme, Inc. · SOC 2 · ISO 27001 · GDPR</div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 grid place-items-center text-white font-bold">A</div>
            <span className="font-semibold">Acme HRMS</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Access your workspace with your work email.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</button>
              </div>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Sign in <ArrowRight className="ml-2 h-4 w-4" /></>}
            </Button>
          </form>

          <div className="mt-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Try a demo persona</div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO.map((d) => (
                <button
                  key={d.role}
                  onClick={() => { setEmail(d.email); setPassword("demo"); }}
                  className="group rounded-lg border p-3 text-left hover:bg-muted transition-colors"
                >
                  <div className={`h-6 w-6 rounded bg-gradient-to-br ${d.color} mb-2`} />
                  <div className="text-sm font-medium">{d.label}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{d.email}</div>
                </button>
              ))}
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground">All demo accounts use password <code className="rounded bg-muted px-1">demo</code>.</div>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            New to Acme? <Link to="/register" className="text-foreground font-medium hover:underline">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
