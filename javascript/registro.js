document.getElementById('registroformulario').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('email').value;
    const contrasena = document.getElementById('password').value;
    const confirmContrasena = document.getElementById('repetirPassword').value;

    const usuariosRegistrados = JSON.parse(localStorage.getItem('email')) || [];

    // Verificar si el correo ya está registrado
    const correoExistente = usuariosRegistrados.find(usuario => usuario.correo === correo);

    if (correoExistente) {
        document.getElementById('mensajeError').textContent = 'Este correo ya está registrado';
        document.getElementById('mensajeExito').textContent = '';
    } else if (contrasena !== confirmContrasena) {
        document.getElementById('mensajeError').textContent = 'Las contraseñas no coinciden';
        document.getElementById('mensajeExito').textContent = '';
    } else {
        // Registro exitoso
        usuariosRegistrados.push({ nombre, correo, contrasena });
        localStorage.setItem('email', JSON.stringify(usuariosRegistrados));
        document.getElementById('mensajeExito').textContent = 'Registro exitoso';
        document.getElementById('mensajeError').textContent = '';
    }
});
function registrarUsuario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const rol = document.getElementById('rol').value;
  
    // Crear un objeto con la información del usuario
    const nuevoUsuario = {
      nombre: nombre,
      email: email,
      rol: rol
    };
  
    // Obtener los usuarios existentes o inicializar si es la primera vez
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
    // Agregar el nuevo usuario
    usuarios.push(nuevoUsuario);
  
    // Guardar los usuarios actualizados en localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
    // Redireccionar a la página de la tabla de usuarios
    window.location.href = "adminusuarios.html";
  }