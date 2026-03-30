import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, MapPin, Calendar, Clock, Gift, MessageSquare } from "lucide-react";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";
import { updateOrderStatus } from "../../hooks/useSupabase";
import { formatPrice } from "../../data/products";

const STATUS_OPTIONS = [
  { value: "pendiente", label: "Pendiente", color: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30" },
  { value: "confirmado", label: "Confirmado", color: "bg-blue-500/10 text-blue-400 border-blue-500/30" },
  { value: "en_camino", label: "En camino", color: "bg-purple-500/10 text-purple-400 border-purple-500/30" },
  { value: "entregado", label: "Entregado", color: "bg-green-500/10 text-green-400 border-green-500/30" },
  { value: "cancelado", label: "Cancelado", color: "bg-red-500/10 text-red-400 border-red-500/30" },
];

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) { setLoading(false); return; }
    supabase.from("orders").select("*").eq("id", id).single().then(({ data }) => {
      setOrder(data);
      setLoading(false);
    });
  }, [id]);

  const handleStatusChange = async (status) => {
    await updateOrderStatus(id, status);
    setOrder((prev) => ({ ...prev, status }));
  };

  if (loading) return <div className="text-gray-500 text-center py-12">Cargando...</div>;
  if (!order) return <div className="text-gray-500 text-center py-12">Pedido no encontrado</div>;

  const status = STATUS_OPTIONS.find((s) => s.value === order.status) || STATUS_OPTIONS[0];
  const items = order.items || [];

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/pedidos" className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div className="flex-1">
          <h1 className="text-white text-xl font-semibold">Pedido #{order.id?.slice(0, 8)}</h1>
          <p className="text-gray-500 text-sm">{new Date(order.created_at).toLocaleString("es-CO")}</p>
        </div>
        <select value={order.status} onChange={(e) => handleStatusChange(e.target.value)}
          className={`text-sm px-4 py-2 rounded-lg border ${status.color} cursor-pointer focus:outline-none`}>
          {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer info */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-white text-sm font-medium mb-4">Comprador</h2>
          <div className="space-y-3 text-sm">
            <p className="text-white font-medium">{order.customer_name}</p>
            <div className="flex items-center gap-2 text-gray-400"><Phone size={14} /> {order.customer_phone}</div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-white text-sm font-medium mb-4">Entrega</h2>
          <div className="space-y-3 text-sm">
            {order.recipient_name && <p className="text-white">Para: {order.recipient_name}</p>}
            {order.recipient_phone && <div className="flex items-center gap-2 text-gray-400"><Phone size={14} /> {order.recipient_phone}</div>}
            <div className="flex items-center gap-2 text-gray-400"><MapPin size={14} /> {order.address}</div>
            <div className="flex items-center gap-2 text-gray-400"><Calendar size={14} /> {order.delivery_date}</div>
            {order.delivery_time && <div className="flex items-center gap-2 text-gray-400"><Clock size={14} /> {order.delivery_time}</div>}
            {order.occasion && <div className="flex items-center gap-2 text-gray-400"><Gift size={14} /> {order.occasion}</div>}
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-white text-sm font-medium mb-4">Notas</h2>
          <div className="space-y-3 text-sm">
            {order.message && (
              <div>
                <p className="text-gray-500 text-xs mb-1">Mensaje tarjeta:</p>
                <p className="text-white italic flex items-start gap-2"><MessageSquare size={14} className="mt-0.5 shrink-0" /> "{order.message}"</p>
              </div>
            )}
            {order.notes && (
              <div>
                <p className="text-gray-500 text-xs mb-1">Notas adicionales:</p>
                <p className="text-gray-300">{order.notes}</p>
              </div>
            )}
            {!order.message && !order.notes && <p className="text-gray-500">Sin notas</p>}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl mt-6 overflow-hidden">
        <div className="p-4 border-b border-gray-700/50">
          <h2 className="text-white text-sm font-medium">Productos ({items.length})</h2>
        </div>
        <div className="divide-y divide-gray-700/30">
          {items.map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {item.image && <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                <div>
                  <p className="text-white text-sm">{item.name}</p>
                  <p className="text-gray-500 text-xs">x{item.qty}</p>
                </div>
              </div>
              <span className="text-white text-sm font-medium">{formatPrice(item.price * item.qty)}</span>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-gray-700/50 flex justify-between items-center">
          <span className="text-gray-400 text-sm">Total</span>
          <span className="text-white text-lg font-bold">{formatPrice(order.total)}</span>
        </div>
      </div>
    </div>
  );
}
