  // Función para cerrar sesión y redirigir
  function logout() {
    // Aquí ejecutas la lógica para cerrar sesión
    // Por ejemplo, limpiar localStorage, eliminar cookies, etc.
    console.log('Sesión cerrada');
    // Redireccionar a index.html
    window.location.href = "index.html";
  }

  // Event listener para el botón de logout
  document.getElementById('cerrarsesionboton').addEventListener('click', logout);
