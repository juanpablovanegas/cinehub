/* =========================================================
   Punto único de acceso a localStorage.
   - Tolera JSON inválido y valores legacy sin serializar ("dark").
   - Tolera navegadores con el almacenamiento bloqueado.
   - Emite un evento para que todas las instancias de useLocalStorage
     de la pestaña se sincronicen (el evento "storage" nativo solo
     llega a las OTRAS pestañas).
   ========================================================= */

const CHANGE_EVENT = "cinehub:storage";

export function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Cuota llena o modo privado: la app sigue funcionando en memoria. */
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: { key } }));
}

/** Suscribe `callback` a cambios de `key`. Devuelve la función de limpieza. */
export function subscribeStorage(key, callback) {
  const onThisTab = (event) => event.detail.key === key && callback();
  const onOtherTab = (event) => event.key === key && callback();

  window.addEventListener(CHANGE_EVENT, onThisTab);
  window.addEventListener("storage", onOtherTab);

  return () => {
    window.removeEventListener(CHANGE_EVENT, onThisTab);
    window.removeEventListener("storage", onOtherTab);
  };
}
