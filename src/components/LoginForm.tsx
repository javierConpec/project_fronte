// src/components/LoginForm.tsx
import { useState } from "react"
import { Lock, User } from "lucide-react"

export default function LoginForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!username || !password) {
            setError("Por favor complete ambos campos.")
        } else {
            setError("")
            alert("Login enviado (sin autenticación por ahora).")
        }
    }

    return (
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 border border-gray-200 animate-fade-in">
            <div className="text-center mb-8">
                <Lock className="mx-auto text-blue-600" size={40} />
                <h1 className="text-3xl font-bold text-gray-800 mt-4">Bienvenido</h1>
                <p className="text-gray-500 text-sm">Por favor inicia sesión para continuar</p>
            </div>

            {error && (
                <div className="bg-red-100 text-red-700 text-sm px-4 py-2 rounded mb-4 text-center">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                        <User className="text-gray-400 mr-2" />
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
                    <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-500">
                        <Lock className="text-gray-400 mr-2" />
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
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200 shadow-md"
                >
                    Ingresar
                </button>
            </form>
        </div>
    )
}
