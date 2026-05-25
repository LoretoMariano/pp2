const carritoGuardado = localStorage.getItem("carritoCompras"); 

let carrito = carritoGuardado ? JSON.parse(carritoGuardado) : []; 

actualizarCarrito(); 

function agregarAlCarrito(id, nombre, precio) {
  const inputElegido = document.getElementById(id); 
  const cantidad = parseInt(inputElegido.value); 

  if (isNaN(cantidad) || cantidad <= 0) {
    alert("Por favor, ingresa una cantidad válida.");
    return;
  }

  const producto = {
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    };

  carrito.push(producto); 

  localStorage.setItem("carritoCompras", JSON.stringify(carrito));

  actualizarCarrito(); 
}

// 🛠️ FUNCIÓN MODIFICADA
function actualizarCarrito() {
  const detalleCarrito = document.getElementById("detalle-carrito"); 
  const totalCarrito = document.getElementById("total-precio");
  const contadorNav = document.getElementById("cart-count");

  // Inicializamos todas las variables en 0
  let cantidadProductos = 0;
  let total = 0;

  // Limpiamos los textos del HTML antes de volver a contar y dibujar
  totalCarrito.innerHTML = "";
  detalleCarrito.innerHTML = "";

  // Controlamos si está vacío para cortar la ejecución rápido
  if (carrito.length === 0) {
    contadorNav.textContent = "0";
    detalleCarrito.innerHTML = "El carrito está vacío.";
    totalCarrito.innerHTML = "$0";
    return; 
  }

  // MODIFICACIÓN PRINCIPAL: Un solo recorrido para contar, sumar totales y dibujar el HTML
  carrito.forEach((producto, index) => {
    // 1. Calculamos cantidades y subtotales
    cantidadProductos += producto.cantidad;
    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    // 2. Inyectamos el string de HTML con el diseño compacto para el menú flotante
    // Sumamos el "index" en la función eliminarProducto y agregamos event.stopPropagation()
    detalleCarrito.innerHTML += `
      <div class="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom text-dark">
        <div style="max-width: 70%;">
          <div class="fw-semibold text-truncate">${producto.nombre}</div>
          <small class="text-muted">${producto.cantidad} x $${producto.precio.toLocaleString()}</small>
        </div>
        <div class="d-flex align-items-center">
          <span class="fw-bold small me-2">$${subtotal.toLocaleString()}</span>
          <button onclick="eliminarProducto(${index}); event.stopPropagation();" class="btn btn-sm btn-link text-danger p-0 fw-bold text-decoration-none" title="Eliminar">
            ✕
          </button>
        </div>
      </div>
    `;
  });

  // 3. Al terminar el bucle, actualizamos los datos finales en la pantalla
  contadorNav.textContent = cantidadProductos;
  totalCarrito.innerHTML = `$${total.toLocaleString()}`;
}

// 🛠️ NUEVA FUNCIÓN: Eliminar un único producto de la lista
function eliminarProducto(index) {
  carrito.splice(index, 1); // Remueve el producto del arreglo según su posición
  localStorage.setItem("carritoCompras", JSON.stringify(carrito)); // Actualiza la memoria local
  actualizarCarrito(); // Redibuja el menú con los cambios reflejados
}

function vaciarCarrito() {
  carrito = [];
  localStorage.removeItem("carritoCompras");
  actualizarCarrito();
}