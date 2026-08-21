import { validateForm } from "./validation.js";

document.addEventListener("DOMContentLoaded", () => {

  /* ==========================================
     MODO OSCURO / MODO CLARO
     ========================================== */

  const themeButton = document.querySelector("#theme-toggle");

  function applyTheme(theme) {

    if (theme === "dark") {

      document.documentElement.classList.add("dark");

      if (themeButton) {
        themeButton.textContent = "☀️ Modo claro";
      }

    } else {

      document.documentElement.classList.remove("dark");

      if (themeButton) {
        themeButton.textContent = "🌙 Modo oscuro";
      }

    }

  }


  const savedTheme = localStorage.getItem("cinehub-theme");

  if (savedTheme === "dark") {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }


  if (themeButton) {

    themeButton.addEventListener("click", () => {

      const isDark =
        document.documentElement.classList.contains("dark");

      const newTheme = isDark
        ? "light"
        : "dark";

      applyTheme(newTheme);

      localStorage.setItem(
        "cinehub-theme",
        newTheme
      );

    });

  }


  /* ==========================================
     BÚSQUEDA EN TIEMPO REAL
     ========================================== */

  const searchInput =
    document.querySelector("#search");

  const movieCards =
    document.querySelectorAll(".movie-card");

  const noResults =
    document.querySelector("#no-results");


  function filterMovies() {

    const searchText =
      searchInput.value
        .toLowerCase()
        .trim();

    let visibleMovies = 0;


    movieCards.forEach((movie) => {

      const title =
        movie.querySelector("h3")
          .textContent
          .toLowerCase();

      if (title.includes(searchText)) {

        movie.classList.remove("hidden");

        visibleMovies++;

      } else {

        movie.classList.add("hidden");

      }

    });


    if (noResults) {

      noResults.hidden =
        visibleMovies !== 0;

    }

  }


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      filterMovies
    );

  }


  /* ==========================================
     ATAJO CTRL + K
     ========================================== */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.ctrlKey &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();

        if (searchInput) {

          searchInput.focus();

          searchInput.select();

        }

      }

    }
  );


  /* ==========================================
     FORMULARIO
     ========================================== */

  const signupForm =
    document.querySelector("#signup-form");

  const nameInput =
    document.querySelector("#name");

  const emailInput =
    document.querySelector("#email");

  const passwordInput =
    document.querySelector("#password");


  const nameError =
    document.querySelector("#name-error");

  const emailError =
    document.querySelector("#email-error");

  const passwordError =
    document.querySelector("#password-error");


  const successMessage =
    document.querySelector("#form-success");


  function showError(
    element,
    message
  ) {

    if (!element) {
      return;
    }

    element.textContent =
      message;

    element.hidden =
      message === "";

  }


  function validateCurrentForm() {

    const errors =
      validateForm(
        nameInput.value,
        emailInput.value,
        passwordInput.value
      );


    showError(
      nameError,
      errors.name
    );

    showError(
      emailError,
      errors.email
    );

    showError(
      passwordError,
      errors.password
    );


    return (
      errors.name === "" &&
      errors.email === "" &&
      errors.password === ""
    );

  }


  if (signupForm) {

    signupForm.addEventListener(
      "submit",
      (event) => {

        event.preventDefault();


        const valid =
          validateCurrentForm();


        if (valid) {

          successMessage.textContent =
            "¡Cuenta creada correctamente!";

          successMessage.hidden =
            false;

          signupForm.reset();

          showError(
            nameError,
            ""
          );

          showError(
            emailError,
            ""
          );

          showError(
            passwordError,
            ""
          );

        } else {

          successMessage.hidden =
            true;

        }

      }
    );

  }


  /* ==========================================
     VALIDACIÓN MIENTRAS SE ESCRIBE
     ========================================== */

  if (nameInput) {

    nameInput.addEventListener(
      "input",
      validateCurrentForm
    );

  }


  if (emailInput) {

    emailInput.addEventListener(
      "input",
      validateCurrentForm
    );

  }


  if (passwordInput) {

    passwordInput.addEventListener(
      "input",
      validateCurrentForm
    );

  }

});