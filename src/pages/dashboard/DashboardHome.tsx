import { useProduct } from "@/context/ProductContext";
import { useClient } from "@/context/ClientContext";
import { useSales } from "@/context/SalesContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, ShoppingCart, DollarSign } from "lucide-react";

const DashboardHome = () => {
  const { products } = useProduct();
  const { clients } = useClient();
  const { sales } = useSales();

  const totalRevenue =
    sales?.reduce((acc, s) => acc + s.totalAmount, 0) ?? 0;

  const stats = [
    { label: "Productos", value: products?.length ?? 0, icon: Package },
    { label: "Clientes", value: clients?.length ?? 0, icon: Users },
    { label: "Ventas", value: sales?.length ?? 0, icon: ShoppingCart },
    { label: "Ingresos", value: `$${totalRevenue.toFixed(2)}`, icon: DollarSign },
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