import { useState } from "react";
import { Lock, User } from "lucide-react";
import  {useAuthStore} from "../store/auth"

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if(!username || !password) {
      setError("Por favor ingrese usuario y contraseña");
      return;
    }

   const success = login(username, password);

    if (success) {
      const role = localStorage.getItem("role");
      if (role === "superadmin") {
        window.location.href = "/configuracion";
      } else if (role === "manager" || role === "admin" || role === "operator") {
        window.location.href = "/";
      } else {
        window.location.href = "/";
      }
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    
    <div className="w-[550px] p-8 backdrop-blur rounded-3xl shadow-2xl shadow-background-100 border border-primary-100 animate-fade-in">
      <div className="text-center mb-8">
        
        <img src="./logo.png" alt="logo BitSolution" className="w-[280px] m-auto" />
        <h1 className="text-[45px] font-extrabold text-text-50 mt-4">INICIO DE SESION</h1>
        <p className="text-text-50 text-[18px]">Por favor inicia sesión para continuar</p>
      </div>

      {error && (
        <div className="bg-extras-rojo border border-text-900 text-text-50 text-sm px-4 py-2 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <div>
        <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block text-lg font-medium text-text-50 mb-2">Usuario</label>
          <div className="flex items-center px-4 py-4 border border-text-300 rounded-lg  focus-within:ring-2 focus-within:ring-text-700">
            <User className="text-text-50 mr-2" size={24} />
            <input
              type="text"
              style={{ backgroundColor: "transparent" }}
              className="w-full  outline-none text-text-50 placeholder-background-100"
              placeholder="superadmin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-lg font-medium text-text-50 mb-2">Contraseña</label>
          <div className="flex items-center px-4 py-4 border border-text-300 rounded-lg  focus-within:ring-2 focus-within:ring-text-900">
            <Lock className="text-text-50 mr-2" size={18} />
            <input
              type="password"
              style={{ backgroundColor: "transparent" }}
              className="w-full bg-transparent outline-none text-text-50 placeholder-text-50"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="pt-4">
          <button
          type="submit"
          className="w-full bg-secondary-700 hover:bg-primary-800 text-text-50 font-semibold py-4 rounded-lg transition duration-200 shadow-md"
        >
          Ingresar
        </button>
        </div>
      </form>
      
      </div>
    </div>
  );
}
