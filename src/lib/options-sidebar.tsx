import { FileDown} from "lucide-react"; // Agregamos FileBarChart
import { IoHomeOutline,IoSettingsOutline,IoClipboardOutline ,IoScaleOutline,IoSpeedometerOutline  } from "react-icons/io5";

type Role = "superadmin" | "manager" | "admin" | "operator" | null;

type SidebarOption = {
  label: string;
  alt:string;
  icon: React.ReactNode;
  href?: string;
  subOptions?: SidebarOption[];
  roles?: Role[];
};



export const optionsSidebar: SidebarOption[] = [
  {
    label: "Inicio",
    icon: <IoHomeOutline size={25} />,
    alt:"Inicio",
    href: "/",
    roles: ["superadmin", "manager", "admin", "operator"],
  },
  {
    label: "Configuración",
    icon: <IoSettingsOutline size={25} />,
    alt:"Configuracion",
    href: "/configuracion",
    roles: ["superadmin","admin"],
  },
  {
    label: "Combustibles",
    icon: <IoScaleOutline size={25} />
    ,alt:"Telemetria",
    href: "/tanquesData",
    roles: ["superadmin", "manager", "admin"],
  },
  
  {
    label: "Control de Surtidores",
    icon: <IoSpeedometerOutline size={25} />,
    alt:"Surtidores",
    href: "/control-surtidores",
    roles: ["superadmin", "manager", "admin"],
  },
  {
    label: "Reportes",
    icon: <IoClipboardOutline size={25} />,
    alt:"Reportes",
    roles: ["superadmin", "manager", "admin", "operator"],
  },
  
];
