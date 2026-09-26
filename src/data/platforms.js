/* Plataformas de streaming del selector "Ver película".
   Para activar una: status "available" + url real. La interfaz se adapta sola. */

export const PLATFORMS = [
  { id: "netflix", name: "Netflix", status: "coming-soon", url: null, brand: "#E50914" },
  { id: "disney", name: "Disney+", status: "coming-soon", url: null, brand: "#2187D9" },
  { id: "prime", name: "Prime Video", status: "coming-soon", url: null, brand: "#00A8E1" },
  { id: "max", name: "Max", status: "coming-soon", url: null, brand: "#002BE7" },
  { id: "appletv", name: "Apple TV+", status: "coming-soon", url: null, brand: "#c8c8c8" },
  { id: "paramount", name: "Paramount+", status: "coming-soon", url: null, brand: "#0064FF" },
  { id: "mgm", name: "MGM+", status: "coming-soon", url: null, brand: "#C5A028" },
  { id: "crunchyroll", name: "Crunchyroll", status: "coming-soon", url: null, brand: "#F47521" },
];

export const STATUS_LABELS = {
  available: "Disponible",
  "coming-soon": "Próximamente",
  unavailable: "No disponible",
};
