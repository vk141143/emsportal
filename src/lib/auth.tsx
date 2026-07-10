import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "employee" | "manager" | "hr" | "admin";
export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  department?: string;
  jobTitle?: string;
};

const DEMO_USERS: Record<string, User & { password: string }> = {
  "employee@acme.com": {
    id: "u1",
    name: "Alex Morgan",
    email: "employee@acme.com",
    role: "employee",
    department: "Engineering",
    jobTitle: "Senior Software Engineer",
    password: "demo",
  },
  "manager@acme.com": {
    id: "u2",
    name: "Priya Nair",
    email: "manager@acme.com",
    role: "manager",
    department: "Engineering",
    jobTitle: "Engineering Manager",
    password: "demo",
  },
  "hr@acme.com": {
    id: "u3",
    name: "Jordan Blake",
    email: "hr@acme.com",
    role: "hr",
    department: "People Ops",
    jobTitle: "HR Business Partner",
    password: "demo",
  },
  "admin@acme.com": {
    id: "u4",
    name: "Sam Rivera",
    email: "admin@acme.com",
    role: "admin",
    department: "Platform",
    jobTitle: "Super Admin",
    password: "demo",
  },
};

type Ctx = {
  user: User | null;
  hydrated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: { name: string; email: string; password: string; role: Role }) => Promise<User>;
  logout: () => void;
};

const AuthCtx = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hrms-user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  const persist = (u: User | null) => {
    if (u) localStorage.setItem("hrms-user", JSON.stringify(u));
    else localStorage.removeItem("hrms-user");
    setUser(u);
  };

  const login = async (email: string, password: string) => {
    await new Promise((r) => setTimeout(r, 400));
    const rec = DEMO_USERS[email.toLowerCase()];
    if (!rec || rec.password !== password) throw new Error("Invalid credentials");
    const { password: _p, ...u } = rec;
    persist(u);
    return u;
  };

  const register = async (data: { name: string; email: string; password: string; role: Role }) => {
    await new Promise((r) => setTimeout(r, 400));
    const u: User = {
      id: "new-" + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      department: "General",
      jobTitle: "New Hire",
    };
    persist(u);
    return u;
  };

  const logout = () => persist(null);

  return (
    <AuthCtx.Provider value={{ user, hydrated, login, register, logout }}>{children}</AuthCtx.Provider>
  );
}

export const useAuth = () => {
  const c = useContext(AuthCtx);
  if (!c) throw new Error("useAuth outside provider");
  return c;
};

export const roleHome: Record<Role, string> = {
  employee: "/employee/dashboard",
  manager: "/manager/dashboard",
  hr: "/hr/dashboard",
  admin: "/admin/dashboard",
};
