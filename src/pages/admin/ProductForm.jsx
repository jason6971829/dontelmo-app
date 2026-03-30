import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Upload, X, Image } from "lucide-react";
import { adminGetProduct, adminSaveProduct, adminGetCategories, uploadImage } from "../../hooks/useSupabase";
import { isSupabaseConfigured } from "../../lib/supabase";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "nuevo";

  const [form, setForm] = useState({
    name: "", slug: "", category_id: "", price: "", old_price: "",
    description: "", images: [], featured: false, badge: "", active: true,
  });
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    adminGetCategories().then(({ data }) => setCategories(data || []));
    if (!isNew) {
      adminGetProduct(id).then(({ data }) => {
        if (data) setForm({
          ...data,
          price: data.price || "",
          old_price: data.old_price || data.oldPrice || "",
          images: data.images || [],
        });
      });
    }
  }, [id, isNew]);

  const update = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({
      ...f,
      [field]: val,
      ...(field === "name" && isNew ? { slug: val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/-+$/g, "") } : {}),
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (!isSupabaseConfigured) {
      // For non-Supabase, use data URLs
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          setForm((f) => ({ ...f, images: [...f.images, ev.target.result] }));
        };
        reader.readAsDataURL(file);
      }
      return;
    }

    setUploading(true);
    for (const file of files) {
      const { url, error } = await uploadImage(file);
      if (url) setForm((f) => ({ ...f, images: [...f.images, url] }));
      if (error) setError("Error subiendo imagen: " + error.message);
    }
    setUploading(false);
  };

  const removeImage = (index) => {
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== index) }));
  };

  const addImageUrl = () => {
    const url = prompt("URL de la imagen:");
    if (url) setForm((f) => ({ ...f, images: [...f.images, url] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const product = {
      ...form,
      price: parseInt(form.price) || 0,
      old_price: parseInt(form.old_price) || null,
      ...(isNew ? {} : { id }),
    };

    const { error: err } = await adminSaveProduct(product);
    if (err) {
      setError(err.message || "Error al guardar");
      setSaving(false);
    } else {
      navigate("/admin/productos");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link to="/admin/productos" className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="text-white text-xl font-semibold">{isNew ? "Nuevo Producto" : "Editar Producto"}</h1>
          <p className="text-gray-500 text-sm mt-0.5">{isNew ? "Crea un nuevo producto para tu tienda" : form.name}</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg p-3 mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-4">
          {/* Basic info */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h2 className="text-white text-sm font-medium mb-4">Informacion Basica</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Nombre del producto *</label>
                <input type="text" required value={form.name} onChange={update("name")}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Slug (URL)</label>
                <input type="text" value={form.slug} onChange={update("slug")}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Descripcion *</label>
                <textarea required rows={4} value={form.description} onChange={update("description")}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary resize-none" />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h2 className="text-white text-sm font-medium mb-4">Imagenes</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
              {/* Upload button */}
              <label className="aspect-square rounded-lg border-2 border-dashed border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
                {uploading ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Upload size={20} className="text-gray-500 mb-1" />
                    <span className="text-gray-500 text-[10px]">Subir</span>
                  </>
                )}
              </label>
            </div>
            <button type="button" onClick={addImageUrl} className="text-xs text-primary hover:underline flex items-center gap-1">
              <Image size={12} /> Agregar URL de imagen
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Pricing */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h2 className="text-white text-sm font-medium mb-4">Precio</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Precio (COP) *</label>
                <input type="number" required min={0} value={form.price} onChange={update("price")}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Precio anterior (tachado)</label>
                <input type="number" min={0} value={form.old_price} onChange={update("old_price")} placeholder="Dejar vacio si no hay descuento"
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary" />
              </div>
            </div>
          </div>

          {/* Category & Status */}
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
            <h2 className="text-white text-sm font-medium mb-4">Organizacion</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Categoria *</label>
                <select required value={form.category_id} onChange={update("category_id")}
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary">
                  <option value="">Seleccionar...</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">Badge / Etiqueta</label>
                <input type="text" value={form.badge} onChange={update("badge")} placeholder="Ej: Popular, Oferta, Nuevo"
                  className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={update("featured")} className="w-4 h-4 rounded accent-primary" />
                <span className="text-gray-300 text-sm">Producto destacado</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.active} onChange={update("active")} className="w-4 h-4 rounded accent-primary" />
                <span className="text-gray-300 text-sm">Visible en la tienda</span>
              </label>
            </div>
          </div>

          {/* Save */}
          <button
            type="submit" disabled={saving}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50"
          >
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><Save size={16} /> {isNew ? "Crear Producto" : "Guardar Cambios"}</>}
          </button>
        </div>
      </form>
    </div>
  );
}
