import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { useSettings, updateSetting } from "../../hooks/useSupabase";

export default function SettingsPage() {
  const { settings, loading: initialLoading } = useSettings();
  const [store, setStore] = useState({ name: "", whatsapp: "", instagram: "", address: "", slogan: "" });
  const [delivery, setDelivery] = useState({ free_above: 0, base_fee: 0, hours: "" });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (settings.store) setStore(settings.store);
    if (settings.delivery) setDelivery(settings.delivery);
  }, [settings]);

  const handleSave = async () => {
    setSaving(true);
    await updateSetting("store", store);
    await updateSetting("delivery", delivery);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (initialLoading) return <div className="text-gray-500 text-center py-12">Cargando...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-semibold">Configuracion</h1>
          <p className="text-gray-500 text-sm mt-1">Ajusta los datos de tu tienda</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark transition-colors disabled:opacity-50">
          {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={16} />}
          {saved ? "Guardado!" : "Guardar"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store info */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-white text-sm font-medium mb-4">Datos de la Tienda</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Nombre de la tienda</label>
              <input type="text" value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Slogan</label>
              <input type="text" value={store.slogan} onChange={(e) => setStore({ ...store, slogan: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Numero de WhatsApp (con codigo de pais)</label>
              <input type="text" value={store.whatsapp} onChange={(e) => setStore({ ...store, whatsapp: e.target.value })} placeholder="573126634993"
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Instagram</label>
              <input type="text" value={store.instagram} onChange={(e) => setStore({ ...store, instagram: e.target.value })} placeholder="@meinspiras17"
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Direccion</label>
              <input type="text" value={store.address} onChange={(e) => setStore({ ...store, address: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-5">
          <h2 className="text-white text-sm font-medium mb-4">Envio y Horarios</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Costo de envio base (COP)</label>
              <input type="number" min={0} value={delivery.base_fee} onChange={(e) => setDelivery({ ...delivery, base_fee: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Envio gratis a partir de (COP)</label>
              <input type="number" min={0} value={delivery.free_above} onChange={(e) => setDelivery({ ...delivery, free_above: parseInt(e.target.value) || 0 })} placeholder="0 = siempre gratis"
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
              <p className="text-gray-500 text-xs mt-1">Deja en 0 para envio siempre gratis</p>
            </div>
            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">Horario de atencion</label>
              <input type="text" value={delivery.hours} onChange={(e) => setDelivery({ ...delivery, hours: e.target.value })} placeholder="24/7"
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Help */}
      <div className="mt-6 bg-gray-800/30 border border-gray-700/30 rounded-xl p-5">
        <h3 className="text-gray-300 text-sm font-medium mb-2">Necesitas ayuda?</h3>
        <ul className="text-gray-500 text-xs space-y-1.5">
          <li>Para crear tu usuario admin, ve a tu proyecto en <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com</a> &gt; Authentication &gt; Users</li>
          <li>Para subir imagenes, asegurate de crear un bucket "product-images" en Storage con acceso publico</li>
          <li>El numero de WhatsApp debe incluir codigo de pais sin + (ej: 573126634993)</li>
        </ul>
      </div>
    </div>
  );
}
