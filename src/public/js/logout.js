const logoutButton = document.getElementById("loguotButton");

// Agrega un event listener al botón de logout
logoutButton.addEventListener("click", function () {
  // Realiza una petición POST al endpoint de logout
  fetch("/api/sessions/logout", {
    method: "POST",
  })
    .then((response) => {
      if (response.ok) {
        // Redirige a la página de inicio de sesión
        window.location.replace("/login");
      }
    })
    .catch((error) => {
      console.error("Error al realizar la petición:", error);
    });
});
