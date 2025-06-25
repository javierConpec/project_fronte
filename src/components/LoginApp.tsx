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
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoginForm /> {/* ✅ ya sin onLogin */}
      </div>
    );
  }

  // Redirige si ya inició sesión
  window.location.href = "/configuracion";
  return null;
}
