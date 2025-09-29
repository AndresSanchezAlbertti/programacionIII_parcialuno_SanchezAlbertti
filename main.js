let productosTienda = 
[
{id:1, nombre:"anana", precio:1000, ruta_img:"PrimerParcial/img/anana.jpg"},
{id:2, nombre:"arandano", precio:200, ruta_img:"PrimerParcial/img/arandano.jpg"},
{id:3, nombre:"banana", precio:400, ruta_img:"PrimerParcial/img/banana.jpg"},
{id:4, nombre:"frutilla",  precio:500, ruta_img:"PrimerParcial/img/frutilla.jpg"},
{id:5, nombre:"kiwi", precio:350, ruta_img:"PrimerParcial/img/kiwi.jpg"},
{id:6, nombre:"mandarina", precio:1000, ruta_img:"PrimerParcial/img/mandarina.jpg"},
{id:7, nombre:"naranja", precio:200, ruta_img:"PrimerParcial/img/naranja.jpg"},
{id:8, nombre:"pera", precio:400, ruta_img:"PrimerParcial/img/pera.jpg"},
{id:9, nombre:"pomelo-amarillo", precio:500, ruta_img:"PrimerParcial/img/pomelo-amarillo.jpg"},
{id:10, nombre:"sandia", precio:100, ruta_img:"PrimerParcial/img/sandia.jpg"},
]
let html = "";



function imprimirDatosAlumno() {
    /*Imprime los datos en el >nav> del HTML agregando codigo html con el metyodo innerHTML*/
    const alumno = {
        dni:"35267290",
        nombre: "Andrés",
        apellido: "Sánchez Albertti"
    };

    console.log(`DNI:35267290- Nombre: ${alumno.nombre} - Apellido: ${alumno.apellido}`);
    console.log(`${alumno.nombre} ${alumno.apellido}`);

    const nav = document.getElementById("datosAlumno");
    if (nav) {
        nav.innerHTML = `${alumno.nombre} ${alumno.apellido}`;
    }
}
function imprimirProductos(lista) {
    /* Imprime los productos de productosTienda en el HTML 
    se utiliza un foreach para recorrer la lista y un innerHTML para agregar los productos con cada uno de sus atributos al contenedor
    */
  const listado = document.getElementById("listadoProductos");
  let html = "";

  lista.forEach(producto => {
    html += `
      <div class="card-producto">
        <img id="imagen" src="${producto.ruta_img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio}</p>
        
        <button onclick="agregarAlCarrito(${producto.id}); mostrarCarrito()">Agregar al carrito</button>
      </div>
    `;
  });

  listado.innerHTML = html;
}

    /* Muestra los productos en el carrito 
    usa localStorage para obtener los productos guardados en el carrito y los imprime en el HTML
    uso un foreach guardando el indice para luego poder eliminar el producto del carrito
    */
 function mostrarCarrito() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedorCarrito = document.getElementById("listaCarrito");
  const contadorHeader = document.getElementById("contadorCarritoHeader");
  const totalCarrito = document.getElementById("totalCarrito");
  let html = "";

  
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío</p>";
    contadorHeader.textContent = "Carrito: 0 productos";
    totalCarrito.textContent = "";
    return;
  }
  carrito.forEach((producto, index) => {
    html += `
      <li class="bloque-item">
        <p class="nombre-item">${producto.nombre} - $${producto.precio}</p>
        <button class="boton-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
      </li>
    `;
  });

  contenedorCarrito.innerHTML = html;
  contadorHeader.textContent = `Carrito: ${carrito.length} producto(s)`;
  let total = carrito.reduce((acum, prod) => acum + prod.precio, 0);
  totalCarrito.textContent = `Total: $${total}`;
}
function eliminarProductoPorCantidad(indice){
    let cantidad = document.getElementById("cantidad").value;
    if(cantidad <= 0){
        eliminarProducto(indice);

    }
}
function eliminarProducto(indice) {
    /* Elimina un producto del carrito
    usa el indice pasado por parametro para eliminar el producto del carrito
    luego actualiza el localStorage y vuelve a mostrar el carrito en caso de que no encuentre el carrito en el localStorage muestro un array vacio
    */
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.splice(indice, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));  
  mostrarCarrito();
}


function filtrarProductos() {
    /*filtra los productos por nombre
    uso un event listener "keyup" para detectar cuando se escribe, esto significa que se suelta una tecla que habia sido apretada, en la barra de busqueda,
    luego filtra dinamicamente los productos que contienen el texto ingresado y los imprime en el HTML
    */
  let barraBusqueda = document.getElementById("barraBusqueda");

  barraBusqueda.addEventListener("keyup", function() {
    let valorBusqueda = barraBusqueda.value.toLowerCase();
    let productosFiltrados = productosTienda.filter(producto => 
      producto.nombre.toLowerCase().includes(valorBusqueda)
    );

    console.table(productosFiltrados);

    
    imprimirProductos(productosFiltrados);
  });
}
function agregarAlCarrito(id) {
  /* Agrega un producto al carrito
  busca el producto en productosTienda por su id utilizando el metodo find(), si lo encuentra lo agrega al carrito
  luego actualiza el localStorage con el nuevo carrito
  */
  let productoSeleccionado = productosTienda.find(producto => producto.id == id);

  if (!productoSeleccionado) {
    console.log("Producto no encontrado");
    return;
  }
  let productoEnCarrito = {
    id: productoSeleccionado.id,
    nombre: productoSeleccionado.nombre,
    precio: productoSeleccionado.precio,
    ruta_img: productoSeleccionado.ruta_img
  };
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  carrito.push(productoEnCarrito);

  localStorage.setItem("carrito", JSON.stringify(carrito));

  console.log("Carrito actualizado:", carrito);
}
//FUNCION PRINCIPAL
function init() {
    imprimirDatosAlumno();
    imprimirProductos(productosTienda);
    filtrarProductos();
    
}
//LLAMADA A LA FUNCION PRINCIPAL
init();