import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { TESTIMONIALS } from "../data/products";
import { useProducts, useCategories } from "../hooks/useSupabase";

export default function Home() {
  const { products, loading: loadingProducts } = useProducts();
  const { categories, loading: loadingCategories } = useCategories();

  const featured = useMemo(() => products.filter((p) => p.featured), [products]);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-secondary-light via-secondary to-secondary-light overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 text-center lg:text-left">
            <p className="font-heading text-xs tracking-[0.25em] text-accent mb-4 uppercase">Expertos en crear sonrisas</p>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-primary tracking-[0.1em] leading-tight mb-6">
              Regalos que enamoran
            </h1>
            <p className="text-text-light text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8 leading-relaxed font-light">
              Desayunos sorpresa, arreglos florales, globos personalizados y detalles
              unicos. Envios a toda Bogota las 24 horas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link
                to="/tienda"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-heading text-xs tracking-[0.15em] uppercase rounded-full hover:bg-primary-dark transition-colors"
              >
                Ver Tienda <ChevronRight size={14} />
              </Link>
              <a
                href="https://wa.me/573126634993"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-primary/30 text-primary font-heading text-xs tracking-[0.15em] uppercase rounded-full hover:bg-primary/5 transition-colors"
              >
                WhatsApp 24/7
              </a>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <img
                src="/catalog-images/page_011.jpg"
                alt="Arreglo floral"
                className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover object-top"
              />
              <img
                src="/catalog-images/page_031.jpg"
                alt="Desayuno sorpresa"
                className="rounded-2xl shadow-lg w-full aspect-[3/4] object-cover object-top mt-8"
              />
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="var(--color-background)" />
          </svg>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-center text-xl sm:text-2xl mb-10">Nuestras Categorias</h2>
        {loadingCategories ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl aspect-square bg-secondary-light animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/tienda/${cat.slug || cat.id}`}
                className="group relative rounded-2xl overflow-hidden aspect-square"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.target.style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                  <span className="text-2xl mb-1 block">{cat.emoji}</span>
                  <span className="font-heading text-[11px] text-white tracking-[0.15em] uppercase">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Featured Products Carousel */}
      <section className="bg-secondary-light/40 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-xl sm:text-2xl mb-3">Los Detalles Mas Lindos</h2>
          <p className="text-center text-text-light text-sm mb-10">de Bogota</p>
          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="rounded-2xl h-72 bg-secondary-light animate-pulse" />
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.2}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
              }}
              className="pb-12"
            >
              {featured.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* Feature Section - side by side */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1">
            <img
              src="/catalog-images/page_016.jpg"
              alt="Ramos de rosas"
              className="rounded-2xl shadow-lg w-full max-w-md mx-auto object-cover object-top"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <p className="font-heading text-xs tracking-[0.2em] text-accent mb-2 uppercase">Especial</p>
            <h2 className="text-2xl sm:text-3xl mb-4">Arreglos Florales</h2>
            <p className="text-text-light text-sm leading-relaxed mb-6 font-light max-w-md mx-auto lg:mx-0">
              Ramos y arreglos con las flores mas frescas. Desde rosas premium hasta
              girasoles radiantes, cada detalle esta hecho con amor para esa
              persona especial.
            </p>
            <Link
              to="/tienda/flores"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary font-heading text-[11px] tracking-[0.15em] uppercase rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Ver Flores <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Second Feature - Desayunos */}
      <section className="max-w-7xl mx-auto px-4 pb-16 sm:pb-20">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-10 lg:gap-16">
          <div className="flex-1">
            <img
              src="/catalog-images/page_041.jpg"
              alt="Desayuno Luxury"
              className="rounded-2xl shadow-lg w-full max-w-md mx-auto object-cover object-top"
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <p className="font-heading text-xs tracking-[0.2em] text-accent mb-2 uppercase">Lo mas pedido</p>
            <h2 className="text-2xl sm:text-3xl mb-4">Desayunos Sorpresa</h2>
            <p className="text-text-light text-sm leading-relaxed mb-6 font-light max-w-md mx-auto lg:mx-0">
              Sorprende a esa persona especial con un desayuno lleno de amor.
              Incluye opciones clasicas, luxury y personalizadas para cada ocasion.
            </p>
            <Link
              to="/tienda/desayunos-sorpresa"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/30 text-primary font-heading text-[11px] tracking-[0.15em] uppercase rounded-full hover:bg-primary hover:text-white transition-all"
            >
              Ver Desayunos <ChevronRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* How to Buy */}
      <section id="como-comprar" className="bg-secondary-light/40 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-center text-xl sm:text-2xl mb-12">Como Comprar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {[
              { icon: "👆", label: "Elige tu detalle", desc: "Escoge los productos que mas te gusten" },
              { icon: "🛒", label: "Agrega al carrito", desc: "Selecciona cantidad y personaliza" },
              { icon: "📝", label: "Llena tus datos", desc: "Datos de entrega y mensaje especial" },
              { icon: "💳", label: "Realiza el pago", desc: "WhatsApp, Nequi o transferencia" },
              { icon: "🏠", label: "Recibe en casa", desc: "Entrega puntual con foto de entrega" },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4 text-3xl">
                  {step.icon}
                </div>
                <h3 className="text-[11px] tracking-[0.12em] mb-2">{step.label}</h3>
                <p className="text-xs text-text-light font-light">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/catalog-images/page_026.jpg"
            alt="Sorprende"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative text-center px-4">
          <h2 className="font-heading text-2xl sm:text-4xl text-white tracking-[0.15em] mb-4">
            Sorprende a los que mas quieres
          </h2>
          <p className="text-white/70 text-sm sm:text-base mb-8 font-light">
            Detalles personalizados con entrega a toda Bogota
          </p>
          <Link
            to="/tienda"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white font-heading text-xs tracking-[0.15em] uppercase rounded-full hover:bg-primary-dark transition-colors"
          >
            Comprar Ahora
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-16 sm:py-20">
        <h2 className="text-center text-xl sm:text-2xl mb-10">Que dicen nuestros clientes</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
              <div className="bg-white border border-border/50 rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-sm font-semibold text-accent">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-text">{t.name}</p>
                    <p className="text-xs text-text-light">{t.product}</p>
                  </div>
                  <span className="ml-auto text-2xl text-border">&ldquo;</span>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-text-light leading-relaxed font-light">{t.text}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Instagram CTA */}
      <section className="bg-secondary-light/40 py-12 sm:py-16">
        <div className="text-center px-4">
          <h2 className="text-lg sm:text-xl mb-3">Siguenos @meinspiras17</h2>
          <p className="text-text-light text-sm mb-6 font-light">Mira nuestras creaciones en Instagram</p>
          <a
            href="https://www.instagram.com/meinspiras17"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-heading text-xs tracking-[0.15em] uppercase rounded-full hover:opacity-90 transition-opacity"
          >
            📸 Seguir en Instagram
          </a>
        </div>
      </section>
    </div>
  );
}
