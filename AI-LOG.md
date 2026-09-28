# AI Log

Este archivo documenta honestamente qué se le pidió a la IA (Claude, vía Claude Code) y qué se decidió
manualmente durante el desarrollo de CineHub, para HW07, HW09 y HW10.

## HW07 — Async JavaScript

### State handling

Sí, se le pidió explícitamente a la IA que agregara el manejo de estados (loading/success/error) para
una petición real a una API pública, ya que el catálogo original de CineHub usaba solo datos locales
(`src/data/movies.js`) envueltos en `Promise.resolve(...)`, sin ningún `fetch` real. La IA propuso y
construyó `discoverService.js` + `useDiscoverMovies.js` + `DiscoverSection.jsx` (sección "Descubre" en
el inicio) consumiendo la API pública de Studio Ghibli.

### Number of states generated

`useDiscoverMovies` generó por defecto 3 estados explícitos: `"loading"`, `"success"` y `"error"`, más
una bandera `fromCache` para distinguir un éxito con datos frescos de un éxito con datos de respaldo.

### Offline cache

No — el comportamiento de cache offline (guardar en `localStorage` bajo la clave `cinehub_discover_movies`
tras cada éxito, mostrar esos datos con el aviso "Showing saved data" si el `fetch` falla y existe cache,
y el estado de error normal si falla sin cache) fue parte de lo que se pidió explícitamente a la IA, no
algo que se agregara después manualmente. Sí se revisó y probó manualmente en el navegador (incluyendo
confirmar que la clave aparece en `localStorage` tras la carga).

---

## HW09 — React State

### useEffect cleanup

Sí, se le pidió a la IA el `useEffect` con cleanup para `useDiscoverMovies`. Usa `AbortController`: si el
componente se desmonta antes de que la petición a la API responda, `controller.abort()` cancela el
`fetch` pendiente y el `catch` ignora el error de abort revisando `controller.signal.aborted`.

### Understanding of return function

Sí. La función que retorna el `useEffect` (`return () => controller.abort()`) es la limpieza que React
ejecuta automáticamente antes de volver a correr el efecto o al desmontar el componente. Sin ella, si el
usuario navega fuera de `/home` mientras la petición sigue en vuelo, la respuesta tardía intentaría hacer
`setState` sobre un componente ya desmontado (warning/fuga de memoria). El mismo patrón (con una bandera
`active` en vez de `AbortController`, porque no hay una petición real que cancelar) ya existía en
`MovieContext` y `useMovie` desde el Milestone 2.

### Dependency array verification

Se verificó revisando qué variables externas usa cada efecto: `useDiscoverMovies` y el fetch inicial de
`MovieContext` no dependen de props/estado externo, así que el arreglo es `[]` (corre solo al montar).
`useMovie(id)` sí depende del parámetro `id` de la ruta (`/movie/:id`), así que su arreglo es `[id]` —
confirmado navegando entre dos películas distintas en el navegador y viendo que el detalle se actualiza
sin quedarse con datos de la película anterior.

---

## HW10 — React Router + Architecture

### Folder structure

La estructura `src/{pages,components,context,hooks,services,utils,data,styles}` ya existía desde el
Milestone 2 (React) del proyecto, no se le pidió a la IA que la definiera desde cero. Se le pidió que
auditara si cumplía los requisitos de HW10 (páginas en `pages/`, componentes reutilizables en
`components/`, datos estáticos fuera de los componentes en `data/`) y que agregara ahí lo que faltaba
(`LoginPage.jsx` en `pages/`, `Breadcrumb.jsx` en `components/layout/`, `DiscoverSection.jsx` en
`components/home/`) siguiendo el mismo patrón, en vez de crear una carpeta nueva.

### Architecture decision

La decisión más discutible fue **dónde poner la ruta `/login`**: el proyecto ya tenía `/profile` con
registro + login + perfil combinados en una sola página (`ProfilePage` + `AuthForm`). En vez de duplicar
toda esa lógica, se optó por una `LoginPage.jsx` más pequeña que reutiliza `AuthForm` en modo `"login"`,
y se cambió `ProtectedRoute` para que redirija a `/login` (antes redirigía a `/profile`). `/profile` se
deja intacta para registro y para ver el perfil con sesión iniciada. Fue la más difícil de decidir porque
había que balancear el requisito explícito del HW ("debe existir una página /login") sin duplicar el
formulario de autenticación ni romper el flujo de registro que ya funcionaba.

### Layer 2 — navegación

Se le pidió a la IA agregar el uso explícito de `useLocation()` para indicar la ruta actual (más allá del
resaltado que ya hacía `NavLink` en la barra de navegación). Resultado: `Breadcrumb.jsx`, montado en
`Layout.jsx` debajo del header, mostrando "CineHub › <página actual>" en cada ruta.
