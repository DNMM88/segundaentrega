document.getElementById('formulariologeo').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('emaillogin').value;
    const password = document.getElementById('passwordlogin').value;


    const usuariosRegistrados = JSON.parse(localStorage.getItem('email')) || [];

    const usuario = usuariosRegistrados.find(user => user.correo === email && user.contrasena === password);

    if (usuario) {
        if (email.includes("@admin.com")) {
            document.getElementById("mensaje").innerText = "Inicio de sesión correcto como administrador.";
            setTimeout(function () {
                window.location.href = "administracion.html"; 
            }, 2000);
        } else {
            document.getElementById("mensaje").innerText = "Inicio de sesión correcto.";
            setTimeout(function () {
                window.location.href = "ventas.html";
            }, 2000);
        }
    } else {
        document.getElementById("mensaje").innerText = "Credenciales incorrectas.";
    }
}
   
);

