import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import { CATEGORIES } from "../data/products";
import PandaMascot from "./PandaMascot";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/tienda?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-text-light hover:text-primary transition-colors"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          <PandaMascot expression="wave" size={52} animate={true} />
          <div className="leading-tight">
            <div className="font-heading text-lg sm:text-xl text-primary tracking-[0.12em]">Me Inspiras</div>
            <div className="text-[10px] text-text-light tracking-[0.2em] uppercase">Regalos Bogota</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/" className="nav-link">Inicio</Link>
          <div className="relative group">
            <Link to="/tienda" className="nav-link">Tienda</Link>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white rounded-xl shadow-xl border border-border p-4 min-w-[220px]">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/tienda/${cat.id}`}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary-light transition-colors text-sm text-text"
                  >
                    <span className="text-lg">{cat.emoji}</span>
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <a href="#como-comprar" className="nav-link">Como Comprar</a>
          <a href="#contacto" className="nav-link">Contacto</a>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-text-light hover:text-primary transition-colors"
          >
            <Search size={20} />
          </button>
          <Link to="/carrito" className="p-2 text-text-light hover:text-primary transition-colors relative">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-border bg-white animate-fade-in">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-4 py-3 flex gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              autoFocus
              className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary"
            />
            <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors">
              Buscar
            </button>
          </form>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-white animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <Link to="/" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Inicio</Link>
            <Link to="/tienda" onClick={() => setMenuOpen(false)} className="mobile-nav-link font-semibold text-primary">Tienda</Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/tienda/${cat.id}`}
                onClick={() => setMenuOpen(false)}
                className="mobile-nav-link pl-6 text-sm"
              >
                {cat.emoji} {cat.name}
              </Link>
            ))}
            <div className="h-px bg-border my-2" />
            <a href="#como-comprar" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Como Comprar</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)} className="mobile-nav-link">Contacto</a>
          </nav>
        </div>
      )}

      <style>{`
        .nav-link {
          font-family: var(--font-heading);
          font-size: 0.8rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--color-text-light);
          position: relative;
          padding: 4px 0;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--color-primary); }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: var(--color-primary);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        .mobile-nav-link {
          padding: 10px 12px;
          border-radius: 10px;
          color: var(--color-text);
          transition: background 0.15s;
        }
        .mobile-nav-link:hover { background: var(--color-secondary-light); }
      `}</style>
    </header>
  );
}
