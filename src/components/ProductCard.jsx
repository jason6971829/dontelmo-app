import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../data/products";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link to={`/producto/${product.slug}`} className="block relative overflow-hidden aspect-square">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-primary/90 text-white text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1.5 rounded-full">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="p-4 text-center">
        <Link to={`/producto/${product.slug}`}>
          <h3 className="font-heading text-xs sm:text-sm tracking-[0.12em] text-heading mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center gap-2 mb-3">
          {product.oldPrice && (
            <span className="text-text-light line-through text-xs">{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-primary font-semibold text-sm">{formatPrice(product.price)}</span>
        </div>
        <button
          onClick={() => addItem(product)}
          className="w-full py-2.5 border border-primary/30 text-primary font-heading text-[11px] tracking-[0.15em] uppercase rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
