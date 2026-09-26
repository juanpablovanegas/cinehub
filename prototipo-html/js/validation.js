export function validateName(name) {
  if (name.trim() === "") {
    return "El nombre es obligatorio.";
  }

  if (name.trim().length < 2) {
    return "El nombre debe tener al menos 2 caracteres.";
  }

  return "";
}

export function validateEmail(email) {
  if (email.trim() === "") {
    return "El correo electrónico es obligatorio.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email.trim())) {
    return "Ingresa un correo electrónico válido.";
  }

  return "";
}

export function validatePassword(password) {
  if (password === "") {
    return "La contraseña es obligatoria.";
  }

  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres.";
  }

  return "";
}

export function validateForm(name, email, password) {
  return {
    name: validateName(name),
    email: validateEmail(email),
    password: validatePassword(password)
  };
}