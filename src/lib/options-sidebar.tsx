import { Settings, FileDown } from "lucide-react"; // Asegúrate de importar el ícono

type SidebarOption = {
  label: string;
  icon: React.ReactNode;
  href: string;
};

export const optionsSidebar: SidebarOption[] = [
  {
    label: "Configuración",
    icon: <Settings size={20} />,
    href: "/configuracion",
  },
  {
    label: "Loggin", // Nuevo menú
    icon: <FileDown size={20} />,
    href: "/loggin",
  },
];
