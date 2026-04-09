import { useProducts } from "@/hooks/useProducts";
import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

const DashboardHome = () => {
  const { data: products } = useProducts(1);
  const { data: orderResponse } = useOrders();

  const orders = Array.isArray(orderResponse?.response)
    ? orderResponse.response
    : Array.isArray(orderResponse?.response?.data)
    ? orderResponse.response.data
    : [];

  const productsCount = products?.length ?? 0;
  const ordersCount = orders.length;
  const uniqueClients = (() => {
    const set = new Set<string>();
    for (const o of orders) {
      if (o.customerName) set.add(o.customerName);
    }
    return set.size;
  })();
  const totalIncome = orders.reduce((acc, o) => {
    const amount = Number(o.total ?? o.totalAmount ?? 0);
    return acc + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  const isLoading = false;

  const stats = [
    { label: "Productos", value: isLoading ? "Cargando..." : productsCount, icon: Package },
    { label: "Clientes", value: isLoading ? "Cargando..." : uniqueClients, icon: Users },
    { label: "Ventas", value: isLoading ? "Cargando..." : ordersCount, icon: ShoppingCart },
    { label: "Ingresos", value: isLoading ? "Cargando..." : `$${totalIncome.toFixed(2)}`, icon: DollarSign },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {s.label}
              </CardTitle>
              <s.icon className="h-5 w-5 text-primary" />
            </CardHeader>

            <CardContent>
              <p className="text-3xl font-bold">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;