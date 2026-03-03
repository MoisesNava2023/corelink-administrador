import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const AdminHeader = () => {
  const { user, logout } = useAuth();

  return (
    <header className="h-14 flex items-center justify-between border-b px-4 bg-card">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <span className="text-sm font-semibold text-primary">Admin Panel</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">{user?.name}</span>
        <Button variant="ghost" size="sm" onClick={logout} className="text-destructive hover:text-destructive">
          <LogOut className="h-4 w-4 mr-1" />
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
