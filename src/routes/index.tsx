import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth, roleHome } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, Users, Building2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({ component: Landing });

function Landing() {
  const { user, hydrated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (hydrated && user) navigate({ to: roleHome[user.role] });
  }, [hydrated, user, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 grid place-items-center text-white font-bold">A</div>
            <span className="font-bold tracking-tight">Acme HRMS</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild><Link to="/login">Sign in</Link></Button>
            <Button asChild><Link to="/register">Get started</Link></Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1 text-xs">
            <Sparkles className="h-3 w-3" /> Enterprise HR, reimagined
          </div>
          <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight">
            One platform for your entire <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">people operations</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Multi-tenant HRMS covering hiring, onboarding, payroll, performance, and governance — with dedicated portals for employees, managers, HR, and super admins.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" asChild><Link to="/login">Sign in <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            <Button size="lg" variant="outline" asChild><Link to="/register">Create account</Link></Button>
          </div>
          <div className="mt-6 grid gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> SOC 2 · ISO 27001 · GDPR ready</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Role-based access for 4 personas</div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-4">
          {[
            { icon: Users, title: "Employee Portal", desc: "Self-service for attendance, leaves, payslips and profile." },
            { icon: ShieldCheck, title: "Manager Portal", desc: "Team dashboards, approvals, OKRs and 1:1s." },
            { icon: Building2, title: "HR Portal", desc: "Hire-to-retire — recruitment, payroll, performance." },
            { icon: Sparkles, title: "Admin Portal", desc: "Multi-tenant governance, billing and audit." },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border p-6 bg-card">
              <div className="h-10 w-10 rounded-lg bg-primary/10 grid place-items-center text-primary mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="font-semibold">{f.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
