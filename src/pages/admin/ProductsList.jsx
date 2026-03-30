import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { adminGetProducts, adminDeleteProduct, adminToggleProduct } from "../../hooks/useSupabase";
import { formatPrice } from "../../data/products";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchProducts = async () => {
    setLoading(true);
    const { data } = await adminGetProducts();
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id, name) => {
    if (!confirm(`Eliminar "${name}"?`)) return;
    await adminDeleteProduct(id);
    fetchProducts();
  };

  const handleToggle = async (id, currentActive) => {
    await adminToggleProduct(id, !currentActive);
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">Productos</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} productos en total</p>
        </div>
        <Link
          to="/admin/productos/nuevo"
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors"
        >
          <Plus size={16} /> Nuevo Producto
        </Link>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-700/50 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary"
        />
      </div>

      {/* Table */}
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Cargando...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No se encontraron productos</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700/50">
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider">Producto</th>
                  <th className="text-left text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider hidden sm:table-cell">Categoria</th>
                  <th className="text-right text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider">Precio</th>
                  <th className="text-center text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider hidden sm:table-cell">Estado</th>
                  <th className="text-right text-gray-400 text-xs font-medium px-4 py-3 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700/30">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-700/20 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center text-gray-500 text-xs">N/A</div>
                        )}
                        <div>
                          <p className="text-white text-sm font-medium">{p.name}</p>
                          <p className="text-gray-500 text-xs sm:hidden">{p.categories?.name || p.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm hidden sm:table-cell">
                      {p.categories?.emoji || ""} {p.categories?.name || p.category}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-white text-sm">{formatPrice(p.price)}</span>
                      {p.oldPrice && <span className="text-gray-500 text-xs line-through block">{formatPrice(p.oldPrice || p.old_price)}</span>}
                    </td>
                    <td className="px-4 py-3 text-center hidden sm:table-cell">
                      <span className={`text-xs px-2 py-1 rounded-full ${p.active !== false ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}>
                        {p.active !== false ? "Activo" : "Oculto"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link to={`/admin/productos/${p.id}`} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
                          <Edit size={15} />
                        </Link>
                        <button onClick={() => handleToggle(p.id, p.active !== false)} className="p-2 text-gray-400 hover:text-yellow-400 rounded-lg hover:bg-gray-700/50 transition-colors">
                          {p.active !== false ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button onClick={() => handleDelete(p.id, p.name)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-700/50 transition-colors">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
