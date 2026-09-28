import { Outlet, ScrollRestoration, useMatches } from "react-router-dom";
import Header from "./Header.jsx";
import Breadcrumb from "./Breadcrumb.jsx";
import Footer from "./Footer.jsx";
import Toast from "../common/Toast.jsx";

/**
 * Estructura común de todas las rutas.
 * data-page (definido en el `handle` de cada ruta) activa la hoja de estilos
 * de esa página, como hacía cada .html del prototipo.
 */
export default function Layout() {
  const matches = useMatches();
  const page = matches.findLast((match) => match.handle?.page)?.handle.page;

  return (
    <div className="app-shell" data-page={page}>
      <Header />
      <Breadcrumb />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toast />
      <ScrollRestoration />
    </div>
  );
}
