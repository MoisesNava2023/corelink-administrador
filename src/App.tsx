import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { ClientProvider } from "@/context/ClientContext";
import { SalesProvider } from "@/context/SalesContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminLayout from "@/components/layout/AdminLayout";
import Login from "@/pages/auth/Login";
import DashboardHome from "@/pages/dashboard/DashboardHome";
import Products from "@/pages/dashboard/Products";
import Clients from "@/pages/dashboard/Clients";
import Sales from "@/pages/dashboard/Sales";
import SaleDetail from "@/pages/dashboard/SaleDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <ProductProvider>
          <ClientProvider>
            <SalesProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                    <Route index element={<DashboardHome />} />
                    <Route path="products" element={<Products />} />
                    <Route path="clients" element={<Clients />} />
                    <Route path="sales" element={<Sales />} />
                    <Route path="sales/:id" element={<SaleDetail />} />
                  </Route>
                  <Route path="/" element={<Navigate to="/login" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SalesProvider>
          </ClientProvider>
        </ProductProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
