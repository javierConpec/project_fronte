import { useState } from "react";
import { Lock, User } from "lucide-react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Por favor complete ambos campos.");
      return;
    }

    // ✅ Validación de usuario y contraseña fija
    if (username === "admin" && password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/configuracion";
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-gray-200 animate-fade-in">
      <div className="text-center mb-8">
        <Lock className="mx-auto text-gray-700" size={40} />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">Bienvenido</h1>
        <p className="text-gray-500 text-sm">Por favor inicia sesión para continuar</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 text-sm px-4 py-2 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
          <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-gray-700">
            <User className="text-gray-400 mr-2" size={18} />
            <input
              type="text"
              className="w-full bg-transparent outline-none text-gray-800"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
          <div className="flex items-center px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus-within:ring-2 focus-within:ring-gray-700">
            <Lock className="text-gray-400 mr-2" size={18} />
            <input
              type="password"
              className="w-full bg-transparent outline-none text-gray-800"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-900 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}
