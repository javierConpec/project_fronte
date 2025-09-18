// src/store/auth.ts
import { create } from "zustand";

type Role = "superadmin" | "manager" | "admin" | "operator" | null;

interface AuthState {
  isLoggedIn: boolean;
  role: Role;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const users = [
  { username: "superadmin", password: "superpass", role: "superadmin" },
  { username: "manager", password: "managerpass", role: "manager" },
  { username: "admin", password: "adminpass", role: "admin" },
  { username: "operator", password: "operatorpass", role: "operator" },
];

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn:
    typeof window !== "undefined" &&
    localStorage.getItem("isLoggedIn") === "true",
  role:
    (typeof window !== "undefined"
      ? (localStorage.getItem("role") as Role)
      : null) || null,

  login: (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      set({ isLoggedIn: true, role: user.role as Role });
      if (typeof window !== "undefined") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("role", user.role);
      }
      return true;
    }
    return false;
  },

  logout: () => {
    set({ isLoggedIn: false, role: null });
    if (typeof window !== "undefined") {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("role");
    }
  },
}));



