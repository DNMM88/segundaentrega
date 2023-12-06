
window.onload = function() {
  const listaVentas = document.getElementById('lista-ventas');

  const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];

  
  ventasGuardadas.forEach((venta, index) => {
    const itemVenta = crearElementoVenta(venta, index);
    listaVentas.appendChild(itemVenta);
  });
}


function crearElementoVenta(venta, index) {
  const itemVenta = document.createElement('div');
  itemVenta.classList.add('item-venta');
  itemVenta.innerHTML = `
    <h3>${venta.destino}</h3>
    <img src="${venta.imagen}" alt="${venta.destino}">
    <p>${venta.descripcion}</p>
    <p>Precio: ${venta.precio} USD</p>
    <p>Fecha de Salida: ${venta.fechaSalida}</p>
    <div class="acciones">
      <span class="favorito" onclick="agregarAFavoritos(${index})">Agregar a Favoritos</span>
      <span class="agregar-carrito" onclick="agregarAlCarrito(${index})">Agregar al Carrito</span>
    </div>
  `;
  return itemVenta;
}


function agregarAFavoritos(index) {
  const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
  const ventasFavoritas = JSON.parse(localStorage.getItem('ventasFavoritas')) || [];

  const ventaSeleccionada = ventasGuardadas[index];
  if (ventaSeleccionada) {
    ventasFavoritas.push(ventaSeleccionada);
    localStorage.setItem('ventasFavoritas', JSON.stringify(ventasFavoritas));
  }
}


  const ventasGuardadas = JSON.parse(localStorage.getItem('ventas')) || [];
  const ventasCarrito = JSON.parse(localStorage.getItem('ventasCarrito')) || [];

  const ventaSeleccionada = ventasGuardadas[index];
  if (ventaSeleccionada) {
    ventasCarrito.push(ventaSeleccionada);
    localStorage.setItem('ventasCarrito', JSON.stringify(ventasCarrito));
  }
  
  function filtrarPorLetra() {
    const input = document.getElementById('letraFiltro');
    const filtro = input.value.toUpperCase();
    const elementosVenta = document.querySelectorAll('.item-venta');
  
    elementosVenta.forEach(elemento => {
      const destino = elemento.querySelector('h3').textContent.toUpperCase();
      if (destino.startsWith(filtro)) {
        elemento.style.display = 'block';
      } else {
        elemento.style.display = 'none';
      }
    });
  }