import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";
import PandaMascot from "../components/PandaMascot";

export default function Cart() {
  const { items, updateQty, removeItem, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="flex justify-center mb-4">
          <PandaMascot expression="sad" size={130} message="¡No hay nada aquí! 😢" animate={true} />
        </div>
        <h1 className="font-heading text-xl tracking-[0.12em] mb-3">Tu carrito esta vacio</h1>
        <p className="text-sm text-text-light mb-8 font-light">Agrega productos para comenzar tu pedido</p>
        <Link
          to="/tienda"
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-heading text-xs tracking-[0.15em] uppercase rounded-full hover:bg-primary-dark transition-colors"
        >
          Ver Tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-xl sm:text-2xl mb-8">Tu Carrito</h1>

      {/* Items */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4 bg-white border border-border/50 rounded-2xl p-4 sm:p-5">
            <Link to={`/producto/${item.slug}`} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
              <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <Link to={`/producto/${item.slug}`} className="font-heading text-xs sm:text-sm tracking-[0.1em] text-heading hover:text-primary transition-colors truncate">
                  {item.name}
                </Link>
                <button onClick={() => removeItem(item.id)} className="p-1.5 text-text-light hover:text-red-500 transition-colors shrink-0">
                  <Trash2 size={16} />
                </button>
              </div>
              <p className="text-primary font-semibold text-sm mt-1">{formatPrice(item.price)}</p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center border border-border rounded-lg overflow-hidden">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-8 h-8 flex items-center justify-center text-text-light hover:bg-secondary-light transition-colors">
                    <Minus size={14} />
                  </button>
                  <span className="w-10 h-8 flex items-center justify-center text-xs font-medium border-x border-border">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-8 h-8 flex items-center justify-center text-text-light hover:bg-secondary-light transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
                <span className="text-sm font-semibold text-text">{formatPrice(item.price * item.qty)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white border border-border/50 rounded-2xl p-6">
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-text-light">Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-light">Envio</span>
            <span className="text-whatsapp font-medium">Gratis</span>
          </div>
          <div className="h-px bg-border" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-primary text-lg">{formatPrice(totalPrice)}</span>
          </div>
        </div>
        <Link
          to="/checkout"
          className="block w-full py-3.5 bg-primary text-white font-heading text-xs tracking-[0.15em] uppercase rounded-xl text-center hover:bg-primary-dark transition-colors"
        >
          Finalizar Pedido
        </Link>
        <Link
          to="/tienda"
          className="block w-full py-3 text-center text-sm text-text-light hover:text-primary transition-colors mt-3"
        >
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}
