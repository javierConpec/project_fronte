import React, { useState, useEffect } from "react";
import LoginForm from "./LoginForm";

export default function LoginEntry() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("isLoggedIn");
    if (session === "true") {
      setLoggedIn(true);
    }
  }, []);

  if (!loggedIn) {
    return (
       <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('./fondoLogin.webp')" }}
      >
        
        <LoginForm /> {/* ya sin onLogin */}
      </div>
    );
  }

  // Redirige si ya inició sesión
  window.location.href = "/configuracion";
  return null;
}
