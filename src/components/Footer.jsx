import { Link } from "react-router-dom";
import { CATEGORIES, WHATSAPP_NUMBER } from "../data/products";

export default function Footer() {
  return (
    <footer id="contacto" className="bg-secondary/60 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🐼</span>
              <div>
                <div className="font-heading text-lg text-primary tracking-[0.12em]">Me Inspiras</div>
                <div className="text-[10px] text-text-light tracking-[0.2em] uppercase">Regalos Bogota</div>
              </div>
            </div>
            <p className="text-sm text-text-light leading-relaxed mb-4">
              Expertos en crear sonrisas. Detalles personalizados, desayunos sorpresa y mucho amor en cada entrega.
            </p>
            <div className="flex items-center gap-3 text-sm text-text-light">
              <span>💳</span>
              <span className="text-xs">Visa / Mastercard / Nequi / Daviplata</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm mb-4">Categorias</h4>
            <div className="flex flex-col gap-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <Link
                  key={cat.id}
                  to={`/tienda/${cat.id}`}
                  className="text-sm text-text-light hover:text-primary transition-colors"
                >
                  {cat.emoji} {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-sm mb-4">Informacion</h4>
            <div className="flex flex-col gap-2 text-sm text-text-light">
              <a href="#como-comprar" className="hover:text-primary transition-colors">Como comprar</a>
              <Link to="/tienda" className="hover:text-primary transition-colors">Ver tienda</Link>
              <span>Envios a toda Bogota</span>
              <span>Servicio 24 horas</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm mb-4">Contacto</h4>
            <div className="flex flex-col gap-3 text-sm text-text-light">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-whatsapp transition-colors"
              >
                <span className="text-whatsapp text-lg">💬</span>
                (+57) 312 663 4993
              </a>
              <a
                href="https://www.instagram.com/meinspiras17"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span className="text-lg">📸</span>
                @meinspiras17
              </a>
              <span className="flex items-center gap-2">
                <span className="text-lg">📍</span>
                Bogota, Colombia
              </span>
            </div>
          </div>
        </div>

        {/* Script decorativo */}
        <div className="mt-12 pt-8 border-t border-border/50 text-center">
          <p className="font-heading text-2xl text-primary/40 tracking-[0.2em] mb-3">
            Sorprende a los que mas quieres
          </p>
          <p className="text-xs text-text-light">
            &copy; {new Date().getFullYear()} Me Inspiras 17. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
