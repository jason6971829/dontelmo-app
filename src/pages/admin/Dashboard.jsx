import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { adminGetProducts } from "../../hooks/useSupabase";
import { useOrders } from "../../hooks/useSupabase";
import { formatPrice } from "../../data/products";

const StatCard = ({ icon: Icon, label, value, color, to }) => (
  <Link to={to} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5 hover:border-gray-600 transition-colors">
    <div className="flex items-center gap-3 mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} />
      </div>
      <span className="text-gray-400 text-xs uppercase tracking-wider">{label}</span>
    </div>
    <div className="text-white text-2xl font-bold">{value}</div>
  </Link>
);

export default function Dashboard() {
  const [productCount, setProductCount] = useState(0);
  const { orders } = useOrders();

  useEffect(() => {
    adminGetProducts().then(({ data }) => setProductCount(data?.length || 0));
  }, []);

  const today = new Date().toISOString().split("T")[0];
  const todayOrders = orders.filter((o) => o.created_at?.startsWith(today));
  const pendingOrders = orders.filter((o) => o.status === "pendiente");
  const totalRevenue = orders.filter((o) => o.status !== "cancelado").reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-white text-xl font-semibold">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Bienvenido al panel de administracion</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Package} label="Productos" value={productCount} color="bg-blue-500/10 text-blue-400" to="/admin/productos" />
        <StatCard icon={ShoppingCart} label="Pedidos Hoy" value={todayOrders.length} color="bg-green-500/10 text-green-400" to="/admin/pedidos" />
        <StatCard icon={TrendingUp} label="Pendientes" value={pendingOrders.length} color="bg-yellow-500/10 text-yellow-400" to="/admin/pedidos" />
        <StatCard icon={DollarSign} label="Ventas Total" value={formatPrice(totalRevenue)} color="bg-purple-500/10 text-purple-400" to="/admin/pedidos" />
      </div>

      {/* Recent orders */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
          <h2 className="text-white text-sm font-medium">Pedidos Recientes</h2>
          <Link to="/admin/pedidos" className="text-primary text-xs hover:underline">Ver todos</Link>
        </div>
        {orders.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No hay pedidos aun. Los pedidos apareceran aqui cuando los clientes compren.
          </div>
        ) : (
          <div className="divide-y divide-gray-700/50">
            {orders.slice(0, 5).map((order) => (
              <Link key={order.id} to={`/admin/pedidos/${order.id}`} className="flex items-center justify-between p-4 hover:bg-gray-700/20 transition-colors">
                <div>
                  <p className="text-white text-sm">{order.customer_name}</p>
                  <p className="text-gray-500 text-xs">{new Date(order.created_at).toLocaleDateString("es-CO")}</p>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-medium">{formatPrice(order.total)}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    order.status === "completado" ? "bg-green-500/10 text-green-400" :
                    order.status === "cancelado" ? "bg-red-500/10 text-red-400" :
                    "bg-yellow-500/10 text-yellow-400"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
