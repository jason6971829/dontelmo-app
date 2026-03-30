import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Minus, Plus, ShoppingBag, ChevronRight, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { PRODUCTS, CATEGORIES, formatPrice, getWhatsAppLink } from "../data/products";

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="text-center py-20 px-4">
        <span className="text-5xl mb-4 block">😕</span>
        <h1 className="font-heading text-lg tracking-[0.12em] mb-2">Producto no encontrado</h1>
        <Link to="/tienda" className="text-primary text-sm underline">Volver a la tienda</Link>
      </div>
    );
  }

  const category = CATEGORIES.find((c) => c.id === product.category);
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const whatsappMsg = `Hola! Me interesa el producto: *${product.name}* (${formatPrice(product.price)}). Me gustaria mas informacion 🐼`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-light mb-8 flex-wrap">
        <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
        <ChevronRight size={12} />
        <Link to="/tienda" className="hover:text-primary transition-colors">Tienda</Link>
        {category && (
          <>
            <ChevronRight size={12} />
            <Link to={`/tienda/${category.id}`} className="hover:text-primary transition-colors">{category.name}</Link>
          </>
        )}
        <ChevronRight size={12} />
        <span className="text-primary">{product.name}</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-14">
        {/* Image Gallery */}
        <div className="flex-1 max-w-xl">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="rounded-2xl overflow-hidden aspect-square"
          >
            {product.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors cursor-pointer">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-heading text-xl sm:text-2xl tracking-[0.1em] mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-6">
            {product.oldPrice && (
              <span className="text-text-light line-through text-lg">{formatPrice(product.oldPrice)}</span>
            )}
            <span className="text-primary font-semibold text-2xl">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="bg-red-50 text-red-500 text-xs font-medium px-2.5 py-1 rounded-full">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          <div className="bg-secondary-light/50 rounded-xl p-4 mb-6">
            <h3 className="font-heading text-[11px] tracking-[0.12em] text-accent mb-2">Incluye:</h3>
            <p className="text-sm text-text-light leading-relaxed font-light">{product.description}</p>
          </div>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center border border-border rounded-xl overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-text-light hover:bg-secondary-light transition-colors">
                <Minus size={16} />
              </button>
              <span className="w-12 h-10 flex items-center justify-center text-sm font-medium border-x border-border">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-text-light hover:bg-secondary-light transition-colors">
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-heading text-xs tracking-[0.12em] uppercase transition-all ${
                added
                  ? "bg-green-500 text-white"
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              {added ? <><Check size={16} /> Agregado</> : <><ShoppingBag size={16} /> Agregar al carrito</>}
            </button>
          </div>

          {/* WhatsApp */}
          <a
            href={getWhatsAppLink(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 border border-whatsapp/30 text-whatsapp rounded-xl font-heading text-xs tracking-[0.12em] uppercase hover:bg-green-50 transition-colors mb-6"
          >
            💬 Consultar por WhatsApp
          </a>

          {/* Info badges */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "🚚", label: "Envio a toda Bogota" },
              { icon: "⏰", label: "Servicio 24/7" },
              { icon: "📸", label: "Foto de entrega" },
              { icon: "✨", label: "Personalizable" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 bg-secondary-light/40 rounded-lg p-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-xs text-text-light">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-16 sm:mt-20">
          <h2 className="text-lg sm:text-xl mb-8 text-center">Tambien te va a gustar</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
