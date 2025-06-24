import { Settings, FileDown, Fuel } from "lucide-react"; // Fuel es un ícono relacionado

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
    label: "Loggin",
    icon: <FileDown size={20} />,
    href: "/loggin",
  },
  {
    label: "Control de Surtidores",
    icon: <Fuel size={20} />,
    href: "/control-surtidores", // Nueva ruta sin conflicto
  },


];
