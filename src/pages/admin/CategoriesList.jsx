import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { adminGetCategories, adminSaveCategory, adminDeleteCategory } from "../../hooks/useSupabase";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // id or 'new'
  const [form, setForm] = useState({ name: "", emoji: "", slug: "", image: "", sort_order: 0, active: true });

  const fetchCategories = async () => {
    setLoading(true);
    const { data } = await adminGetCategories();
    setCategories(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const startEdit = (cat) => {
    setEditing(cat.id);
    setForm({ name: cat.name, emoji: cat.emoji, slug: cat.slug || cat.id, image: cat.image || "", sort_order: cat.sort_order || 0, active: cat.active !== false });
  };

  const startNew = () => {
    setEditing("new");
    setForm({ name: "", emoji: "", slug: "", image: "", sort_order: categories.length, active: true });
  };

  const cancel = () => { setEditing(null); };

  const handleSave = async () => {
    const slug = form.slug || form.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");
    const cat = { ...form, slug };
    if (editing !== "new") cat.id = editing;
    await adminSaveCategory(cat);
    setEditing(null);
    fetchCategories();
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Eliminar categoria "${name}"? Los productos asociados quedaran sin categoria.`)) return;
    await adminDeleteCategory(id);
    fetchCategories();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">Categorias</h1>
          <p className="text-gray-500 text-sm mt-1">{categories.length} categorias</p>
        </div>
        <button onClick={startNew} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors">
          <Plus size={16} /> Nueva Categoria
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl overflow-hidden">
        {/* New category form */}
        {editing === "new" && (
          <div className="p-4 border-b border-gray-700/50 bg-gray-700/20">
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end">
              <div>
                <label className="block text-gray-400 text-[10px] font-medium mb-1">Emoji</label>
                <input type="text" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🌹"
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-400 text-[10px] font-medium mb-1">Nombre</label>
                <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Arreglos Florales"
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-gray-400 text-[10px] font-medium mb-1">URL de imagen</label>
                <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..."
                  className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="flex gap-2">
                <button onClick={handleSave} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"><Save size={16} /></button>
                <button onClick={cancel} className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"><X size={16} /></button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="p-8 text-center text-gray-500 text-sm">Cargando...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">No hay categorias</div>
        ) : (
          <div className="divide-y divide-gray-700/30">
            {categories.map((cat) => (
              <div key={cat.id}>
                {editing === cat.id ? (
                  <div className="p-4 bg-gray-700/20">
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-3 items-end">
                      <div>
                        <label className="block text-gray-400 text-[10px] font-medium mb-1">Emoji</label>
                        <input type="text" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-gray-400 text-[10px] font-medium mb-1">Nombre</label>
                        <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-gray-400 text-[10px] font-medium mb-1">Imagen</label>
                        <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })}
                          className="w-full px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={handleSave} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors"><Save size={16} /></button>
                        <button onClick={cancel} className="p-2 bg-gray-600/20 text-gray-400 rounded-lg hover:bg-gray-600/30 transition-colors"><X size={16} /></button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 hover:bg-gray-700/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{cat.emoji}</span>
                      <div>
                        <p className="text-white text-sm font-medium">{cat.name}</p>
                        <p className="text-gray-500 text-xs">/{cat.slug || cat.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${cat.active !== false ? "bg-green-500/10 text-green-400" : "bg-gray-500/10 text-gray-400"}`}>
                        {cat.active !== false ? "Activa" : "Oculta"}
                      </span>
                      <button onClick={() => startEdit(cat)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
                        <Edit size={15} />
                      </button>
                      <button onClick={() => handleDelete(cat.id, cat.name)} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
