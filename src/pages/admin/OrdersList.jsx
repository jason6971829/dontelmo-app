import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Eye } from "lucide-react";
import { useOrders, updateOrderStatus } from "../../hooks/useSupabase";
import { formatPrice } from "../../data/products";

const STATUS_OPTIONS = [
  { value: "pendiente", label: "Pendiente", color: "bg-yellow-500/10 text-yellow-400" },
  { value: "confirmado", label: "Confirmado", color: "bg-blue-500/10 text-blue-400" },
  { value: "en_camino", label: "En camino", color: "bg-purple-500/10 text-purple-400" },
  { value: "entregado", label: "Entregado", color: "bg-green-500/10 text-green-400" },
  { value: "cancelado", label: "Cancelado", color: "bg-red-500/10 text-red-400" },
];

export default function OrdersList() {
  const { orders, loading, refetch } = useOrders();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleStatusChange = async (id, status) => {
    await updateOrderStatus(id, status);
    refetch();
  };

  const filtered = orders.filter((o) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (search && !o.customer_name?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-white text-xl font-semibold">Pedidos</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} pedidos en total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nombre..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm focus:outline-none focus:border-primary">
          <option value="all">Todos los estados</option>
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Cargando...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            {orders.length === 0 ? "No hay pedidos aun. Apareceran cuando los clientes envien pedidos por WhatsApp." : "No se encontraron pedidos con esos filtros."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider">Cliente</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider hidden sm:table-cell">Fecha</th>
                  <th className="text-right text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider">Total</th>
                  <th className="text-center text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider">Estado</th>
                  <th className="text-right text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {filtered.map((order) => {
                  const status = STATUS_OPTIONS.find((s) => s.value === order.status) || STATUS_OPTIONS[0];
                  return (
                    <tr key={order.id} className="hover:bg-gray-700/20 transition-colors">
                      <td className="px-4 py-3">
                        <p className="text-white text-sm">{order.customer_name}</p>
                        <p className="text-gray-500 text-xs">{order.customer_phone}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-sm hidden sm:table-cell">
                        {new Date(order.created_at).toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-4 py-3 text-right text-white text-sm font-medium">{formatPrice(order.total)}</td>
                      <td className="px-4 py-3 text-center">
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 ${status.color} cursor-pointer focus:outline-none`}
                        >
                          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/admin/pedidos/${order.id}`} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors inline-flex">
                          <Eye size={15} />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
