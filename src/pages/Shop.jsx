import { useState, useMemo } from "react";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { formatPrice } from "../data/products";
import { useProducts, useCategories } from "../hooks/useSupabase";

export default function Shop() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q")?.toLowerCase() || "";

  const [priceRange, setPriceRange] = useState([0, 800000]);
  const [sortBy, setSortBy] = useState("default");
  const [showFilters, setShowFilters] = useState(false);

  const { products, loading: loadingProducts } = useProducts();
  const { categories, loading: loadingCategories } = useCategories();

  const activeCategory = categories.find((c) => c.slug === category || c.id === category);

  const filtered = useMemo(() => {
    let result = products;

    if (category) result = result.filter((p) => p.category === category || p.categories?.slug === category);
    if (query) result = result.filter((p) => p.name.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query));
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc": return [...result].sort((a, b) => a.price - b.price);
      case "price-desc": return [...result].sort((a, b) => b.price - a.price);
      case "name": return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default: return result;
    }
  }, [products, category, query, priceRange, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-text-light mb-6">
        <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
        <span>/</span>
        <Link to="/tienda" className={`hover:text-primary transition-colors ${!category ? "text-primary font-medium" : ""}`}>
          Tienda
        </Link>
        {activeCategory && (
          <>
            <span>/</span>
            <span className="text-primary font-medium">{activeCategory.name}</span>
          </>
        )}
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl">
            {activeCategory ? activeCategory.name : query ? `Resultados para "${query}"` : "Tienda"}
          </h1>
          <p className="text-xs text-text-light mt-1">
            {loadingProducts ? "Cargando..." : `Mostrando ${filtered.length} de ${products.length} resultados`}
          </p>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-xs text-text-light"
        >
          <SlidersHorizontal size={14} /> Filtros
        </button>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <aside className={`${showFilters ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto" : "hidden"} lg:block lg:static lg:w-56 lg:shrink-0`}>
          {showFilters && (
            <button onClick={() => setShowFilters(false)} className="lg:hidden absolute top-4 right-4 p-2">
              <X size={20} />
            </button>
          )}

          <h3 className="font-heading text-xs tracking-[0.15em] text-heading mb-4">Categorias</h3>
          <div className="flex flex-col gap-1 mb-8">
            <Link
              to="/tienda"
              className={`px-3 py-2 rounded-lg text-sm transition-colors ${!category ? "bg-secondary text-primary font-medium" : "text-text-light hover:bg-secondary-light"}`}
            >
              Todas
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/tienda/${cat.slug || cat.id}`}
                onClick={() => setShowFilters(false)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                  category === (cat.slug || cat.id) ? "bg-secondary text-primary font-medium" : "text-text-light hover:bg-secondary-light"
                }`}
              >
                <span>{cat.emoji}</span> {cat.name}
              </Link>
            ))}
          </div>

          <h3 className="font-heading text-xs tracking-[0.15em] text-heading mb-4">Filtrar por precio</h3>
          <div className="space-y-3 mb-8">
            <input
              type="range"
              min={0}
              max={800000}
              step={5000}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-text-light">
              <span>{formatPrice(0)}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
          </div>

          <h3 className="font-heading text-xs tracking-[0.15em] text-heading mb-4">Ordenar</h3>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-border text-sm bg-white focus:outline-none focus:border-primary"
          >
            <option value="default">Orden por defecto</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name">Nombre A-Z</option>
          </select>

          {showFilters && (
            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full py-3 bg-primary text-white rounded-lg font-heading text-xs tracking-[0.15em] uppercase lg:hidden"
            >
              Aplicar Filtros
            </button>
          )}
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-secondary-light animate-pulse rounded-2xl h-72" />
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-5xl mb-4 block">🔍</span>
              <p className="font-heading text-sm tracking-[0.12em] text-heading mb-2">No encontramos productos</p>
              <p className="text-xs text-text-light">Intenta con otra categoria o ajusta los filtros</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
