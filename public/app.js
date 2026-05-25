let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
  const inputElegido = document.getElementById(id); // con esta variable guardo la cantidad del producto que el usuario eligio

  const cantidad = parseInt(inputElegido.value); // con esta variable paso a numero entero la cantidad del producto que eligio porque los imput vienen como string por defecto

  //aca defino un objeto con las caracteristicas de cada producto para despues agregarlo al carrito.
  const producto = {
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    };

  carrito.push(producto); // con esta linea agrego el producto al carrito

  actualizarCarrito(); // llamo a la funcion actualizar carrito para que se muestre el producto que se agrego al carrito en el html
  };


  function actualizarCarrito() {
    const detalleCarrito = document.getElementById("detalle-carrito"); 

    const totalCarrito = document.getElementById("total-precio");

    let total = 0;

    totalCarrito.innerHTML = "";
    detalleCarrito.innerHTML = "";

    carrito.forEach((producto) => {
      const subtotal = producto.precio * producto.cantidad;

      total += subtotal;

      detalleCarrito.innerHTML += `<p>Producto: ${producto.nombre} - Cantidad: ${producto.cantidad} - Subtotal: $${subtotal}</p>`;

      totalCarrito.innerHTML = `$${total}`;
    });
  }