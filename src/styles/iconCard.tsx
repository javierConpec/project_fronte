import { GiPayMoney } from "react-icons/gi";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiGasStationFill } from "react-icons/ri";
import { PiGasCanFill } from "react-icons/pi";


import type { JSX } from "react";



export const iconsMap: { [key: string]: JSX.Element } = {
  "VentaHoy": <GiPayMoney size={60} className="text-white" />,
  "VentaTotal": <GiTakeMyMoney size={60} className=" text-white" />,
  "manguera": <RiGasStationFill size={50} className="text-white" />,
  "volume": <PiGasCanFill size={50} className="text-white" />,
 
};
