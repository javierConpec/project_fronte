let API_MANUEL: string;
let API_JAVI: string;

export const loadConfig = async () => {
  try {
    const res = await fetch("/config.json");
    if (!res.ok) throw new Error(`No se pudo cargar config.json: ${res.status}`);
    const config = await res.json();
    API_MANUEL = config.PUBLIC_API_URL_2;
    API_JAVI = config.PUBLIC_API_URL;
  } catch (err) {
    console.error("Error cargando config.json:", err);
    throw err; // opcional, para que quien llame sepa que falló
  }
};

export const getApiManuel = async () => {
  if (!API_MANUEL) await loadConfig();
  return API_MANUEL;
};

export const getApiJavi = async () => {
  if (!API_JAVI) await loadConfig();
  return API_JAVI;
};
