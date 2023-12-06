
const filtroDestino = document.getElementById('filtro-destino');
const cuerpoTablaVentas = document.getElementById('cuerpo-tabla-ventas');


window.onload = function() {
  mostrarElementos();
}


function mostrarElementos() {
  const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
  cuerpoTablaVentas.innerHTML = '';

  ventasGuardadas.forEach(venta => {
    const nuevaFila = cuerpoTablaVentas.insertRow();
    nuevaFila.innerHTML = `
      <td>${venta.destino}</td>
      <td><img src="${venta.imagen}" alt="${venta.destino}"></td>
      <td>${venta.descripcion}</td>
      <td>${venta.precio}</td>
      <td>${venta.fechaSalida}</td>
      <td>
        <button onclick="editarElemento(this)">Editar</button>
        <button onclick="borrarElemento(this)">Borrar</button>
      </td>
    `;
  });
}


function agregarInformacion() {
  
  const destino = document.getElementById('destino').value;
  const descripcion = document.getElementById('descripcion').value;
  const precio = document.getElementById('precio').value;
  const fechaSalida = document.getElementById('fecha-salida').value;
  const cargarImagen = document.getElementById('cargar-imagen');

 
  const lectorImagen = new FileReader();
  lectorImagen.onload = function(evento) {
    const imagen = evento.target.result;

    
    const nuevaVenta = {
      destino,
      imagen,
      descripcion,
      precio,
      fechaSalida
    };

   
    const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
    ventasGuardadas.push(nuevaVenta);
    localStorage.setItem('ventas', JSON.stringify(ventasGuardadas));

    mostrarElementos();
  };


  if (cargarImagen.files[0]) {
    lectorImagen.readAsDataURL(cargarImagen.files[0]);
  }
}


function editarElemento(boton) {
  const fila = boton.parentNode.parentNode;
  const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
  const indice = Array.from(cuerpoTablaVentas.rows).indexOf(fila);
  const ventaAEditar = ventasGuardadas[indice];

  // Aquí puedes mostrar un formulario de edición o manipular los elementos HTML directamente

  const nuevoDestino = prompt("Ingrese el nuevo destino", ventaAEditar.destino);
  const nuevaImagen = prompt("Ingrese la nueva URL de la imagen", ventaAEditar.imagen);
  const nuevaDescripcion = prompt("Ingrese la nueva descripción", ventaAEditar.descripcion);
  const nuevoPrecio = prompt("Ingrese el nuevo precio", ventaAEditar.precio);
  const nuevaFechaSalida = prompt("Ingrese la nueva fecha de salida", ventaAEditar.fechaSalida);

  // Actualizar los valores de la venta editada
  ventasGuardadas[indice] = {
    destino: nuevoDestino || ventaAEditar.destino,
    imagen: nuevaImagen || ventaAEditar.imagen,
    descripcion: nuevaDescripcion || ventaAEditar.descripcion,
    precio: nuevoPrecio || ventaAEditar.precio,
    fechaSalida: nuevaFechaSalida || ventaAEditar.fechaSalida
  };

  
  localStorage.setItem('ventas', JSON.stringify(ventasGuardadas));


  mostrarElementos();
}



function borrarElemento(boton) {
  const fila = boton.parentNode.parentNode;
  const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
  const indice = Array.from(cuerpoTablaVentas.rows).indexOf(fila);

  
  cuerpoTablaVentas.deleteRow(indice);

+
  ventasGuardadas.splice(indice, 1);
  localStorage.setItem('ventas', JSON.stringify(ventasGuardadas));
}


filtroDestino.addEventListener('input', function() {
  const valorFiltro = this.value.toLowerCase();
  const filas = cuerpoTablaVentas.getElementsByTagName('tr');

  Array.from(filas).forEach(fila => {
    const destino = fila.getElementsByTagName('td')[0].textContent.toLowerCase();
    fila.style.display = destino.includes(valorFiltro) ? '' : 'none';
  });
});