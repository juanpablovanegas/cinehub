# CineHub

Proyecto del curso DSAW · Universidad de La Sabana · Equipo: Samuel, Samuel David Ortiz Pico, David Fernando Gómez, Juan Pablo Vanegas

## Problema

En Colombia los amigos generalmente pierden demasiado tiempo cuadrando en WhatsApp, intentando ponerse de acuerdo sobre que hacer o en este caso que peliculas ver, en que cine y a que hora, con todo esto, la información de las peliculas y los horarios se pierden entre la información y los mensajes de chat, y no existe un lugar donde poder proponer un plan y ver quien realmente pudo confirmar asistencia, así que los planes se van deshaciendo lentamente, 

## Justificación de la aplicación web

1. Un grupo de WhatsApp no puede estructurar los datos de una película (póster, calificación, horarios, cine) — es solo texto que se desplaza, y los planes viejos quedan enterrados bajo mensajes nuevos.
2. Una hoja de cálculo no puede mostrar cartelera en tiempo real ni dejar que un amigo responda "Sí / Tal vez / No" a un plan — no tiene una vista interactiva y compartible.
3. Apps existentes como Cine Colombia o Cinemark permiten comprar boletas, pero no ayudan a que el grupo se ponga de acuerdo sobre *qué* película ver y *quién* realmente va a ir.
4. Una app solo-móvil dejaría afuera a quien esté en un computador coordinando el plan del grupo (por ejemplo, mientras trabaja o estudia); la web permite compartir un link que cualquiera abre sin instalar nada.

## Usuarios objetivo

Estudiantes universitarios y grupos de amigos en Colombia que quieren organizar una salida al cine juntos, pero les cuesta tomar una decisión y conseguir confirmaciones usando solo el chat.

## Roles de usuario

CineHub tiene dos roles con permisos distintos:

- **Organizador del plan**: crea el plan (elige película, cine, fecha y hora), puede editarlo o cancelarlo, y ve quién ha respondido. Tiene permisos de escritura y eliminación sobre los planes que crea.
- **Invitado**: solo puede ver los planes a los que fue invitado y responder Sí / Tal vez / No. No puede crear, editar ni cancelar planes de otros — solo tiene permiso de lectura sobre el plan y de escritura sobre su propia respuesta.

## Funcionalidades principales (mínimo 3, de punta a punta)

1. **Buscar y explorar películas** — el usuario ve la cartelera con póster, calificación y género, y puede buscar por nombre.
2. **Crear un plan** — el organizador elige película, cine, fecha y hora, y genera un plan con un link para compartir.
3. **Responder a un plan (RSVP)** — el invitado abre el link del plan y responde Sí / Tal vez / No; el organizador ve en tiempo real quién confirmó.

## Prototipo estático

`index.html` y `about.html` — landing page y página de equipo, construidas con HTML semántico y CSS puro (Flexbox, Grid, responsive en 3 breakpoints), incluyendo un acordeón de preguntas frecuentes hecho solo con CSS (`:target`, sin JavaScript).

[Ver prototipo publicado en GitHub Pages](https://juanpablovanegas.github.io/cinehub/)

## Figma

Wireframes del equipo (5 pantallas: Inicio, Películas, Mis planes, Buscar, Acerca de): https://www.figma.com/design/GJN2lOeZOoOmQL95y17bI5/CINEHUB--copia-?node-id=2002-2

> Completado: wireframes de todas las pantallas del proyecto para el Milestone 1.

## Restricciones del proyecto (verificadas)

- [x] Resuelve un problema real e identificable para un usuario específico
- [x] Justificado como app web (no hoja de cálculo, no herramienta existente, no solo-móvil)
- [x] Soporta 2 roles de usuario con permisos distintos (Organizador / Invitado)
- [x] Al menos 3 funcionalidades demostrables de principio a fin
- [x] No es clon de una app importante (no es Netflix, Twitter, Instagram)
