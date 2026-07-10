import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useAuth, roleHome } from "@/lib/auth";

export const Route = createFileRoute("/unauthorized")({ component: Unauthorized });

function Unauthorized() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen grid place-items-center bg-background px-4">
      <div className="max-w-md text-center">
        <div className="mx-auto h-14 w-14 rounded-full bg-destructive/10 grid place-items-center text-destructive">
          <ShieldAlert className="h-7 w-7" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Access denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">Your role doesn't have permission to view this page.</p>
        <div className="mt-6 flex justify-center gap-2">
          {user ? <Button asChild><Link to={roleHome[user.role]}>Go to your dashboard</Link></Button> : <Button asChild><Link to="/login">Sign in</Link></Button>}
        </div>
      </div>
    </div>
  );
}
