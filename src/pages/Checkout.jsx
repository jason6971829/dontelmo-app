import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, getWhatsAppLink, OCCASIONS } from "../data/products";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "", phone: "", recipientName: "", recipientPhone: "",
    address: "", date: "", time: "", occasion: "", message: "", notes: "",
  });

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="font-heading text-xl tracking-[0.12em] mb-3">No hay productos en el carrito</h1>
        <Link to="/tienda" className="text-primary text-sm underline">Ir a la tienda</Link>
      </div>
    );
  }

  const handleWhatsApp = (e) => {
    e.preventDefault();

    const productLines = items.map((item) =>
      `• ${item.name} x${item.qty} = ${formatPrice(item.price * item.qty)}`
    ).join("\n");

    const msg = [
      `🐼 *NUEVO PEDIDO - Me Inspiras 17*`,
      ``,
      `👤 *Datos del comprador:*`,
      `Nombre: ${form.name}`,
      `Telefono: ${form.phone}`,
      ``,
      `🎁 *Datos de entrega:*`,
      `Para: ${form.recipientName || "Mismo comprador"}`,
      `Tel destinatario: ${form.recipientPhone || "-"}`,
      `Direccion: ${form.address}`,
      `Fecha: ${form.date}`,
      `Hora: ${form.time || "Cualquier hora"}`,
      form.occasion ? `Ocasion: ${form.occasion}` : "",
      form.message ? `Mensaje tarjeta: "${form.message}"` : "",
      form.notes ? `Notas: ${form.notes}` : "",
      ``,
      `🛒 *Productos:*`,
      productLines,
      ``,
      `💰 *Total: ${formatPrice(totalPrice)}*`,
      `📦 Envio: Gratis`,
    ].filter(Boolean).join("\n");

    window.open(getWhatsAppLink(msg), "_blank");
    clearCart();
    navigate("/?pedido=enviado");
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-light mb-8">
        <Link to="/carrito" className="hover:text-primary transition-colors">Carrito</Link>
        <ChevronRight size={12} />
        <span className="text-primary">Checkout</span>
      </div>

      <h1 className="text-xl sm:text-2xl mb-8">Finalizar Pedido</h1>

      <form onSubmit={handleWhatsApp} className="flex flex-col lg:flex-row gap-8">
        {/* Form */}
        <div className="flex-1 space-y-6">
          {/* Buyer info */}
          <div className="bg-white border border-border/50 rounded-2xl p-5 sm:p-6">
            <h2 className="font-heading text-xs tracking-[0.12em] text-heading mb-5">Tus datos</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-text-light mb-1.5 font-medium">Tu nombre *</label>
                <input type="text" required value={form.name} onChange={update("name")} placeholder="Juan Perez"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs text-text-light mb-1.5 font-medium">Tu telefono *</label>
                <input type="tel" required value={form.phone} onChange={update("phone")} placeholder="312 345 6789"
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          {/* Delivery info */}
          <div className="bg-white border border-border/50 rounded-2xl p-5 sm:p-6">
            <h2 className="font-heading text-xs tracking-[0.12em] text-heading mb-5">Datos de entrega</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-text-light mb-1.5 font-medium">Nombre del destinatario</label>
                  <input type="text" value={form.recipientName} onChange={update("recipientName")} placeholder="Nombre de quien recibe"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs text-text-light mb-1.5 font-medium">Telefono destinatario</label>
                  <input type="tel" value={form.recipientPhone} onChange={update("recipientPhone")} placeholder="Para coordinar entrega"
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-text-light mb-1.5 font-medium">Direccion de entrega *</label>
                <input type="text" required value={form.address} onChange={update("address")} placeholder="Calle, carrera, barrio, conjunto..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-text-light mb-1.5 font-medium">Fecha de entrega *</label>
                  <input type="date" required min={today} value={form.date} onChange={update("date")}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs text-text-light mb-1.5 font-medium">Hora preferida</label>
                  <input type="time" value={form.time} onChange={update("time")}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs text-text-light mb-1.5 font-medium">Ocasion</label>
                  <select value={form.occasion} onChange={update("occasion")}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary">
                    <option value="">Seleccionar...</option>
                    {OCCASIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-text-light mb-1.5 font-medium">Mensaje para la tarjeta</label>
                <textarea value={form.message} onChange={update("message")} rows={2} placeholder="Feliz cumpleanos mi amor..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary resize-none" />
              </div>
              <div>
                <label className="block text-xs text-text-light mb-1.5 font-medium">Notas adicionales</label>
                <textarea value={form.notes} onChange={update("notes")} rows={2} placeholder="Indicaciones especiales, conjunto, apto..."
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary resize-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:w-80">
          <div className="bg-white border border-border/50 rounded-2xl p-5 sm:p-6 sticky top-24">
            <h2 className="font-heading text-xs tracking-[0.12em] text-heading mb-5">Resumen del pedido</h2>
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.images[0]} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{item.name}</p>
                    <p className="text-xs text-text-light">x{item.qty}</p>
                  </div>
                  <span className="text-xs font-medium">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t border-border/50">
              <div className="flex justify-between text-sm">
                <span className="text-text-light">Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-light">Envio</span>
                <span className="text-whatsapp font-medium">Gratis</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-6 py-3.5 bg-whatsapp text-white font-heading text-xs tracking-[0.12em] uppercase rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              💬 Enviar Pedido por WhatsApp
            </button>
            <p className="text-[10px] text-text-light text-center mt-3 font-light">
              Seras redirigido a WhatsApp para confirmar tu pedido y coordinar el pago
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
