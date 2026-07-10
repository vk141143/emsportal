import { useEffect, type ReactNode } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, Building2, Briefcase, Calendar, FileText, Wallet,
  Target, TrendingUp, GraduationCap, Database, Megaphone, Settings, LogOut,
  Search, Bell, Moon, Sun, Monitor, Menu, ShieldCheck, Activity, UserCog,
  BarChart2, CheckSquare, MapPin, Clock, Gift, ClipboardList, Layers,
  KeyRound, Plug, Mail, Star, FolderOpen, Package, Cpu, Globe, User,
  ChevronDown, ChevronRight,
} from "lucide-react";
import { useAuth, type Role } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState } from "react";

type NavItem = { label: string; to: string; icon: React.ComponentType<{ className?: string }>; badge?: string };
type NavSection = { section: string; items: NavItem[] };

const NAV: Record<Role, { brand: string; accent: string; nav: NavSection[] }> = {
  employee: {
    brand: "MyWorkspace",
    accent: "from-sky-500 to-indigo-500",
    nav: [
      { section: "Home", items: [{ label: "Dashboard", to: "/employee/dashboard", icon: LayoutDashboard }] },
      { section: "Work", items: [
        { label: "Attendance", to: "/employee/attendance", icon: Calendar },
        { label: "Leave", to: "/employee/leaves", icon: CheckSquare },
        { label: "Projects", to: "/employee/projects", icon: Briefcase },
        { label: "Tasks", to: "/employee/tasks", icon: Target },
      ]},
      { section: "Finance", items: [{ label: "Payroll", to: "/employee/payslips", icon: Wallet }] },
      { section: "Growth", items: [
        { label: "Performance", to: "/employee/performance", icon: TrendingUp },
        { label: "Training", to: "/employee/training", icon: GraduationCap },
      ]},
      { section: "Resources", items: [
        { label: "Documents", to: "/employee/documents", icon: FileText },
        { label: "Assets", to: "/employee/assets", icon: Database },
        { label: "Announcements", to: "/employee/announcements", icon: Megaphone },
        { label: "Support", to: "/employee/support", icon: UserCog },
      ]},
      { section: "Account", items: [
        { label: "Profile", to: "/employee/profile", icon: User },
        { label: "Settings", to: "/employee/settings", icon: Settings },
      ]},
    ],
  },
  manager: {
    brand: "Team Lead",
    accent: "from-emerald-500 to-teal-500",
    nav: [
      { section: "Overview", items: [
        { label: "Dashboard", to: "/manager/dashboard", icon: LayoutDashboard },
        { label: "My Team", to: "/manager/team", icon: Users },
        { label: "Calendar", to: "/manager/calendar", icon: Calendar },
      ]},
      { section: "Approvals", items: [
        { label: "Attendance Approval", to: "/manager/attendance", icon: ClipboardList },
        { label: "Leave Approval", to: "/manager/approvals", icon: CheckSquare },
      ]},
      { section: "Work", items: [
        { label: "Projects", to: "/manager/projects", icon: Briefcase },
        { label: "Tasks", to: "/manager/tasks", icon: Target },
      ]},
      { section: "People", items: [
        { label: "Performance Reviews", to: "/manager/performance", icon: TrendingUp },
        { label: "One-on-One Meetings", to: "/manager/one-on-one", icon: UserCog },
        { label: "Reports", to: "/manager/reports", icon: BarChart2 },
      ]},
      { section: "Resources", items: [
        { label: "Announcements", to: "/manager/announcements", icon: Megaphone },
        { label: "Leave", to: "/manager/leaves", icon: CheckSquare },
        { label: "Documents", to: "/manager/documents", icon: FileText },
        { label: "Assets", to: "/manager/assets", icon: Database },
        { label: "Support", to: "/manager/support", icon: UserCog },
      ]},
      { section: "Account", items: [
        { label: "Profile", to: "/manager/profile", icon: User },
        { label: "Settings", to: "/manager/settings", icon: Settings },
      ]},
    ],
  },
  hr: {
    brand: "People Hub",
    accent: "from-fuchsia-500 to-rose-500",
    nav: [
      { section: "Overview", items: [{ label: "Dashboard", to: "/hr/dashboard", icon: LayoutDashboard }] },
      { section: "Workforce", items: [
        { label: "Employees", to: "/hr/employees", icon: Users },
        { label: "Departments", to: "/hr/departments", icon: Building2 },
        { label: "Attendance", to: "/hr/attendance", icon: Calendar },
        { label: "Leave Management", to: "/hr/leaves", icon: CheckSquare },
      ]},
      { section: "Talent", items: [
        { label: "Recruitment", to: "/hr/recruitment", icon: Briefcase },
        { label: "Performance", to: "/hr/performance", icon: TrendingUp },
        { label: "Training", to: "/hr/learning", icon: GraduationCap },
      ]},
      { section: "Operations", items: [
        { label: "Payroll", to: "/hr/payroll", icon: Wallet },
        { label: "Documents", to: "/hr/documents", icon: FileText },
        { label: "Assets", to: "/hr/assets", icon: Database },
        { label: "Reports", to: "/hr/reports", icon: BarChart2 },
      ]},
      { section: "General", items: [
        { label: "Holiday Calendar", to: "/hr/holidays", icon: Calendar },
        { label: "Announcements", to: "/hr/announcements", icon: Megaphone },
        { label: "Settings", to: "/hr/settings", icon: Settings },
      ]},
    ],
  },
  admin: {
    brand: "Admin Center",
    accent: "from-violet-600 to-indigo-600",
    nav: [
      { section: "Overview", items: [
        { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
      ]},
      { section: "Workforce", items: [
        { label: "Employees", to: "/admin/employees", icon: Users },
        { label: "Departments", to: "/admin/departments", icon: Building2 },
        { label: "Designations", to: "/admin/designations", icon: Star },
        { label: "Teams", to: "/admin/teams", icon: Layers },
        { label: "Managers", to: "/admin/managers", icon: UserCog },
      ]},
      { section: "Time & Attendance", items: [
        { label: "Attendance", to: "/admin/attendance", icon: Clock },
        { label: "Leaves", to: "/admin/leaves", icon: CheckSquare },
        { label: "Shifts", to: "/admin/shifts", icon: Calendar },
        { label: "Holiday Calendar", to: "/admin/holidays", icon: Gift },
      ]},
      { section: "Finance", items: [
        { label: "Payroll", to: "/admin/payroll", icon: Wallet },
      ]},
      { section: "Talent", items: [
        { label: "Recruitment", to: "/admin/recruitment", icon: Briefcase },
        { label: "Offer Letters", to: "/admin/offer-letters", icon: Mail },
        { label: "Performance", to: "/admin/performance", icon: TrendingUp },
        { label: "Training", to: "/admin/training", icon: GraduationCap },
      ]},
      { section: "Operations", items: [
        { label: "Documents", to: "/admin/documents", icon: FolderOpen },
        { label: "Assets", to: "/admin/assets", icon: Package },
        { label: "Projects", to: "/admin/projects", icon: Cpu },
        { label: "Tasks", to: "/admin/tasks", icon: Target },
      ]},
      { section: "Reports & Comms", items: [
        { label: "Reports", to: "/admin/reports", icon: BarChart2 },
        { label: "Announcements", to: "/admin/announcements", icon: Megaphone },
      ]},
      { section: "Administration", items: [
        { label: "Branches", to: "/admin/branches", icon: MapPin },
        { label: "Company Settings", to: "/admin/company-settings", icon: Globe },
        { label: "Roles & Permissions", to: "/admin/roles", icon: KeyRound },
        { label: "Audit Logs", to: "/admin/audit", icon: Activity },
        { label: "Notifications", to: "/admin/notifications", icon: Bell },
        { label: "Security", to: "/admin/security", icon: ShieldCheck },
      ]},
      { section: "Account", items: [
        { label: "Profile", to: "/admin/profile", icon: User },
      ]},
    ],
  },
};

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).slice(0, 2).join("").toUpperCase();
}

function SidebarInner({ role, onNavigate }: { role: Role; onNavigate?: () => void }) {
  const cfg = NAV[role];
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (section: string) =>
    setCollapsed((p) => ({ ...p, [section]: !p[section] }));

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <img 
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL6ae8sAY6zsQcO3SQoRg24Zf712ePeqvGJq0lrOZAHg&s" 
          alt="Logo" 
          className="h-9 w-9 rounded-xl shadow-sm shrink-0 object-cover"
        />
        <div className="min-w-0">
          <div className="text-sm font-bold truncate">{cfg.brand}</div>
          <div className="text-[10px] text-muted-foreground truncate uppercase tracking-widest">Acme Corp · {role}</div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1">
        {cfg.nav.map((section) => {
          const isCollapsed = collapsed[section.section];
          return (
            <div key={section.section} className="mb-1">
              <button
                onClick={() => toggle(section.section)}
                className="w-full flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {section.section}
                {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              {!isCollapsed && (
                <ul className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.to || pathname.startsWith(item.to + "/");
                    const Icon = item.icon;
                    return (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          onClick={onNavigate}
                          className={cn(
                            "group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150",
                            active
                              ? "bg-primary text-primary-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          <span className="truncate flex-1">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-[10px] h-4 px-1">{item.badge}</Badge>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>

      <div className="border-t p-3">
        <div className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
          <div className="font-medium text-foreground mb-0.5">Acme Corp HRMS</div>
          <span className="text-foreground">hr@acme.com</span>
        </div>
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const Icon = theme === "dark" ? Moon : theme === "light" ? Sun : Monitor;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Theme"><Icon className="h-4 w-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={(v) => setTheme(v as "light" | "dark" | "system")}>
          <DropdownMenuRadioItem value="light"><Sun className="h-4 w-4 mr-2" /> Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark"><Moon className="h-4 w-4 mr-2" /> Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system"><Monitor className="h-4 w-4 mr-2" /> System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PortalShell({ role, title, subtitle, actions, children }: {
  role: Role;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { user, hydrated, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!user) navigate({ to: "/login" });
    else if (user.role !== role) navigate({ to: "/unauthorized" });
  }, [hydrated, user, role, navigate]);

  if (!hydrated || !user || user.role !== role) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="text-sm text-muted-foreground animate-pulse">Loading workspace…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 flex w-full">
      <aside className="hidden lg:flex w-60 shrink-0 border-r bg-card flex-col">
        <SidebarInner role={role} />
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-background/80 backdrop-blur px-4 md:px-6 h-14">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">
              <SidebarInner role={role} onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="hidden md:flex items-center gap-2 flex-1 max-w-sm">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search employees, docs, policies…" className="pl-9 bg-muted/50 border-0 h-9 text-sm" />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <ThemeToggle />
            <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 px-2">
                  <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{initials(user.name)}</AvatarFallback></Avatar>
                  <div className="hidden sm:block text-left leading-tight">
                    <div className="text-xs font-semibold">{user.name}</div>
                    <div className="text-[10px] text-muted-foreground capitalize">{user.role}</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to={`/${role}/profile` as any}>Profile</Link></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); navigate({ to: "/login" }); }} className="text-rose-600">
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
                <Badge variant="secondary" className="capitalize text-[10px]">{role}</Badge>
                <span>{NAV[role].brand}</span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight mt-1 truncate">{title}</h1>
              {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-2 shrink-0">{actions}</div>}
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export function StatCard({ label, value, delta, icon: Icon, tone = "default", color }: {
  label: string; value: string; delta?: string; icon?: React.ComponentType<{ className?: string }>;
  tone?: "default" | "up" | "down"; color?: string;
}) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider leading-none">{label}</div>
          <div className="mt-2 text-2xl font-bold tracking-tight">{value}</div>
          {delta && (
            <div className={cn(
              "mt-1 text-xs font-medium",
              tone === "up" && "text-emerald-600 dark:text-emerald-400",
              tone === "down" && "text-rose-600 dark:text-rose-400",
              tone === "default" && "text-muted-foreground",
            )}>{delta}</div>
          )}
        </div>
        {Icon && (
          <div className={cn("h-9 w-9 shrink-0 rounded-lg grid place-items-center", color || "bg-primary/10 text-primary")}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
    </div>
  );
}
