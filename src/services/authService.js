/* =========================================================
   authService — autenticación local (sin backend todavía).
   Los usuarios registrados viven en localStorage y la contraseña
   nunca se guarda en texto plano.
   ========================================================= */

import { readStorage, writeStorage } from "../utils/storage.js";

const USERS_KEY = "cinehub-users";

// ponytail: SHA-256 sin sal alcanza para una demo 100% cliente;
// el backend (M3) debe usar bcrypt/argon2 y sesiones reales.
async function hashPassword(password) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(password));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

const normalizeEmail = (email) => email.trim().toLowerCase();
const toSession = ({ name, email }) => ({ name, email });

function getUsers() {
  const users = readStorage(USERS_KEY, []);
  return Array.isArray(users) ? users : [];
}

export async function register({ name, email, password }) {
  const users = getUsers();
  const normalized = normalizeEmail(email);

  if (users.some((user) => user.email === normalized)) {
    throw new Error("Ya existe una cuenta con ese correo.");
  }

  const user = {
    name: name.trim(),
    email: normalized,
    passwordHash: await hashPassword(password),
    createdAt: new Date().toISOString(),
  };
  writeStorage(USERS_KEY, [...users, user]);
  return toSession(user);
}

export async function login({ email, password }) {
  const user = getUsers().find((candidate) => candidate.email === normalizeEmail(email));

  if (!user || user.passwordHash !== (await hashPassword(password))) {
    throw new Error("Correo o contraseña incorrectos.");
  }
  return toSession(user);
}
