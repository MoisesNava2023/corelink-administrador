import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import AdminHeader from "./AdminHeader";
import AppSidebar from "./AppSidebar";

const AdminLayout = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
