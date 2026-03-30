import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function AdminLogin() {
  const { signIn, user, isConfigured } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await signIn(email, password);
    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-5xl block mb-3">🐼</span>
          <h1 className="text-white text-xl font-semibold">Me Inspiras 17</h1>
          <p className="text-gray-400 text-sm mt-1">Panel de Administracion</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800/50 border border-gray-700 rounded-2xl p-6 backdrop-blur-sm">
          {!isConfigured && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs rounded-lg p-3 mb-4">
              Supabase no esta configurado. Agrega las variables VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en tu archivo .env
            </div>
          )}

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-lg p-3 mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-400 text-xs font-medium mb-1.5">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@meinspiras.com"
              className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-xs font-medium mb-1.5">Contrasena</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary pr-10"
              />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit" disabled={loading || !isConfigured}
            className="w-full py-3 bg-primary text-white rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><LogIn size={16} /> Iniciar Sesion</>}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Panel exclusivo para administradores
        </p>
      </div>
    </div>
  );
}
