# CineHub

Proyecto del curso DSAW · Universidad de La Sabana — **Milestone 2: React Frontend** (React + Vite + React Router).

**Equipo:** Samuel Díaz Melo, Samuel David Ortiz Pico, David Fernando Gómez y Juan Pablo Vanegas.

---

## Problema

En Colombia, los grupos de amigos suelen perder demasiado tiempo coordinando por WhatsApp qué hacer juntos y, específicamente, qué película ver, en qué cine y a qué hora.

La información sobre películas, horarios y lugares termina mezclada entre mensajes del chat. Además, no existe un espacio centralizado donde una persona pueda proponer un plan y consultar fácilmente quién confirmó su asistencia.

Como consecuencia, los planes pueden perderse entre las conversaciones o terminar cancelándose porque el grupo no logra ponerse de acuerdo.

### Usuario identificado

CineHub está dirigido principalmente a **estudiantes universitarios y grupos de amigos en Colombia** que quieren organizar una salida al cine y necesitan una forma sencilla de decidir qué película ver, seleccionar una función y confirmar quién asistirá.

---

## Justificación de la aplicación web

CineHub se plantea como una aplicación web porque permite centralizar la información y compartir los planes mediante un enlace, sin exigir la instalación de una aplicación adicional.

La solución está justificada frente a alternativas más simples por las siguientes razones:

1. **WhatsApp no estructura la información de una película.**  
   Un grupo de WhatsApp puede servir para conversar, pero la información sobre póster, calificación, género, cine y horarios queda dispersa entre los mensajes.

2. **Una hoja de cálculo no ofrece una experiencia adecuada para este problema.**  
   Puede almacenar información, pero no está diseñada para presentar una cartelera de películas y permitir una interacción sencilla para responder a un plan.

3. **Las plataformas de cine tienen un objetivo diferente.**  
   Servicios como Cine Colombia o Cinemark permiten consultar funciones y comprar boletas, pero no están enfocados en resolver el problema de coordinación de un grupo de amigos: decidir qué película ver y saber quién realmente asistirá.

4. **Una aplicación web facilita el acceso desde diferentes dispositivos.**  
   Un usuario puede abrir un enlace desde un computador, tablet o celular sin necesidad de instalar una aplicación.

Por estas razones, una aplicación web permite combinar la exploración de películas con la creación y coordinación de planes entre amigos.

---

## Usuarios objetivo

Los usuarios principales de CineHub son:

- Estudiantes universitarios.
- Grupos de amigos.
- Personas que desean organizar una salida al cine.
- Usuarios que necesitan comparar películas y horarios antes de tomar una decisión grupal.

---

## Roles de usuario

CineHub contempla dos roles principales con permisos diferentes:

### Organizador del plan

El organizador puede:

- Seleccionar una película.
- Seleccionar el cine.
- Seleccionar fecha y hora.
- Crear un plan.
- Compartir el plan con otros usuarios.
- Consultar las respuestas de los invitados.
- Editar o cancelar los planes que crea.

### Invitado

El invitado puede:

- Consultar el plan al que fue invitado.
- Ver la información de la película.
- Consultar fecha, hora y lugar.
- Responder **Sí / Tal vez / No**.
- Consultar la información necesaria para decidir su asistencia.

El invitado no puede crear, editar ni cancelar planes creados por otros usuarios.

---

## Funcionalidades principales

El prototipo contempla un flujo completo compuesto por las siguientes funcionalidades:

### 1. Buscar y explorar películas

El usuario puede consultar la cartelera disponible, visualizar información de las películas y utilizar el buscador para encontrar una película específica.

### 2. Consultar una película y sus funciones

El usuario puede seleccionar una película y acceder a información relacionada con sus funciones, incluyendo cine, fecha y hora.

### 3. Crear un plan

El organizador puede seleccionar una película, función y datos del plan para generar una propuesta de salida con sus amigos.

### 4. Consultar un plan

El usuario puede acceder a la información del plan creado y consultar los datos principales de la salida.

### 5. Responder a un plan

Los invitados pueden indicar su disponibilidad mediante las opciones:

- **Voy**
- **Tal vez**
- **No puedo**

El prototipo representa este flujo de confirmación para demostrar cómo se coordinaría la asistencia de los integrantes del grupo.

---

## Milestone 2 — React Frontend

El prototipo estático (HTML + CSS + JavaScript con manipulación directa del DOM) se migró a una
**aplicación React de una sola página (SPA)** construida con **Vite**, **React Router**, **Context API**
y **custom hooks**, manteniendo la identidad visual y todas las funcionalidades del prototipo.

### Cómo ejecutarlo

```bash
npm install
npm run dev       # desarrollo → http://localhost:5173/m1-avance-projecto-final-cinehub/
npm run build     # build de producción en dist/ (incluye 404.html para GitHub Pages)
npm run preview   # sirve el build localmente
npm run lint      # ESLint (reglas de hooks de React)
npm test          # pruebas de la lógica pura (node:test)
```

### Rutas

| Ruta | Página | Notas |
| --- | --- | --- |
| `/` | — | Redirige a `/home` |
| `/home` | `HomePage` | Hero con buscador, películas en tendencia, planes recientes y FAQ |
| `/movies` | `MoviesPage` | Catálogo con búsqueda, filtros por género y orden |
| `/movie/:id` | `MovieDetailPage` | **Ruta dinámica** (`useParams`) · tráiler · plataformas · favoritos · compartir |
| `/functions?movie=id` | `FunctionsPage` | Elegir cine, fecha y hora (`useSearchParams`) |
| `/create-plan` | `CreatePlanPage` | Formulario del plan con la función elegida |
| `/plan/:id` | `PlanPage` | **Ruta dinámica** · responder Sí / Tal vez / No · editar (organizador) |
| `/my-plans` | `MyPlansPage` | Estadísticas, filtro próximos/anteriores, compartir y eliminar |
| `/profile` | `ProfilePage` | Registro / inicio de sesión, o el perfil si hay sesión |
| `/dashboard` | `DashboardPage` | **Ruta protegida** (`ProtectedRoute`): sin sesión redirige a `/profile` |
| `/about` | `AboutPage` | Proyecto y equipo |
| `*` | `NotFoundPage` | Ruta inexistente |

### Arquitectura

```text
src/
├── main.jsx                 Punto de entrada: monta <App/> e importa los estilos
├── App.jsx                  Proveedores de contexto + RouterProvider
├── app/router.jsx           Definición de rutas (createBrowserRouter)
├── pages/                   Una página por ruta (composición, sin lógica pesada)
├── components/
│   ├── layout/              Layout (Header + Outlet + Footer), Header, Navbar, Footer
│   ├── common/              Button, Modal, Loading, EmptyState, Toast, PosterImage
│   ├── movies/              MovieCard, MoviePoster, MovieGrid, MovieSearch, MovieFilters
│   ├── movie-detail/        MovieInfo, MovieActions, MovieBackdrop, TrailerModal, WatchModal…
│   ├── functions/           SelectedMovie, ShowtimeStep, ShowtimeOptions, BookingSummary
│   ├── plans/               PlanCard, PlanForm, PlanStats, PlanHero, PlanSummary, RsvpPanel
│   ├── home/ · auth/        Secciones del inicio · AuthForm y ProfileCard
│   └── ProtectedRoute.jsx   Guardia de rutas privadas
├── context/                 AuthContext, MovieContext, PlanContext, ToastContext
├── hooks/                   useMovies, useMovie, useAuth, usePlans, useFavorites,
│                            useLocalStorage, useTheme, useReveal, useShare, useToast…
├── services/                movieService, planService, authService (+ services.test.js)
├── utils/                   storage, validation, palette, share, poster
├── data/                    Catálogo de 40 películas, tráilers, cines, plataformas, FAQ
└── styles/                  CSS del prototipo (global, componentes y páginas)
```

**Flujo de datos:** `data/` → `services/` (consultas y transformación) → `context/` (estado global) →
`hooks/` (API para los componentes) → `pages/` → `components/`. Los componentes solo renderizan y
delegan acciones; ninguno accede a `localStorage` directamente.

### Decisiones clave (para la defensa)

- **Context API sin prop drilling.** `MovieContext` guarda catálogo y filtros: lo que se escribe en el
  buscador del inicio sigue aplicado en `/movies`. `PlanContext` guarda planes y la función elegida entre
  `/functions` y `/create-plan`. `AuthContext` expone `user`, `login`, `register`, `logout` e
  `isAuthenticated`. Cada contexto tiene un hook de consumo (`useMovies`, `usePlans`, `useAuth`).
- **`useLocalStorage` centraliza la persistencia** (favoritos, planes, tema, sesión, función elegida).
  Se suscribe a cambios con *cleanup*, así varias instancias —y otras pestañas— quedan sincronizadas.
  Lee los datos que el prototipo ya había guardado (mismas claves `cinehub-*`).
- **Efectos con limpieza:** listeners de teclado (Ctrl + K, Escape en modales), `mousemove` del parallax,
  `IntersectionObserver` de las animaciones de scroll, temporizadores del toast y del tráiler automático,
  y respuestas asíncronas ignoradas si el componente se desmonta (`useMovie`, `MovieContext`).
- **Servicios con Promises:** `getMovies()` y `getMovieById()` devuelven Promises aunque los datos son
  locales, para cambiar a la API del backend (M3) sin tocar los componentes.
- **Autenticación local:** `authService` registra usuarios en `localStorage` con la contraseña en hash
  SHA-256 (nunca en texto plano). Es un mock hasta tener backend.
- **Roles del M1:** quien crea un plan (con sesión) es su organizador; solo él ve *Editar* y *Eliminar*.
  Los planes creados sin sesión o con el prototipo anterior los puede gestionar cualquiera.
- **Estilos del prototipo sin rediseño.** `main.css` y `responsive.css` siguen globales. Cada hoja propia de
  una página del prototipo se encapsula con `:where([data-page="…"])` (el `Layout` pone `data-page` según
  la ruta): no choca con las demás páginas y no cambia la especificidad. Tailwind (CDN) ya no hace falta.

### GitHub Pages

- `vite.config.js` define `base: "/m1-avance-projecto-final-cinehub/"` y el router usa ese `basename`.
- **Refresh en rutas profundas:** el build copia `index.html` como `404.html`. GitHub Pages sirve ese
  archivo para `/movie/dune` y React Router resuelve la ruta.
- **Deploy:** `.github/workflows/deploy.yml` hace `lint` + `build` y publica `dist/` en cada push a `master`.
  Requiere una sola vez: *Settings → Pages → Source: GitHub Actions*.

**[Ver CineHub en GitHub Pages](https://dsaw-2026-2.github.io/m1-avance-projecto-final-cinehub/)**

### Prototipo anterior

La versión HTML/CSS/JS del Milestone 1 está archivada en `legacy/` como referencia.

---

## Figma

Los wireframes del proyecto fueron desarrollados en Figma.

El diseño contempla las pantallas principales del proyecto:

1. Inicio.
2. Películas.
3. Mis planes.
4. Buscar.
5. Acerca de.

**[Ver wireframes de CineHub en Figma](https://www.figma.com/design/GJN2lOeZOoOmQL95y17bI5/CINEHUB--copia-?node-id=2002-2)**

Los wireframes mantienen una estructura visual consistente y sirven como base para el desarrollo del prototipo web.

---

## Restricciones del proyecto (verificadas)

- [x] Resuelve un problema real e identificable para un usuario específico
- [x] Justificado como app web (no hoja de cálculo, no herramienta existente, no solo-móvil)
- [x] Soporta 2 roles de usuario con permisos distintos (Organizador / Invitado)
- [x] Al menos 3 funcionalidades demostrables de principio a fin
- [x] No es clon de una app importante (no es Netflix, Twitter, Instagram)
