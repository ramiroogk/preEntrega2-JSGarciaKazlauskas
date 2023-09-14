const productos = [
  {
    id: 1,
    nombreProducto: "Gorra",
    precio: 3500,
    stock: 10,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/19401b59f0ff487699dfae76012d9e7b_9366/Gorra_Trefoil_Baseball_UNISEX_Beige_HL9326_01_standard.jpg"

  },
  {
    id: 2,
    nombreProducto: "Remera",
    precio: 4000,
    stock: 10,
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmTqSS40PkISzObJIdT1WHPMNNoYCw8fN78A&usqp=CAU"

  },
  {
    id: 3,
    nombreProducto: "Campera",
    precio: 6000,
    stock: 3,
    img: "https://media.solodeportes.com.ar/media/catalog/product/cache/7c4f9b393f0b8cb75f2b74fe5e9e52aa/c/a/campera-adidas-adicolor-sst-ni-o-ni-a-negra-10002egn8451001-1.jpg"
  },
  {
    id: 4,
    nombreProducto: "Buzo",
    precio: 5500,
    stock: 10,
    img:"https://s3.sa-east-1.amazonaws.com/www.vaypol.com.ar/variants/hi380w41odf3r42s7owusq75q39p/c77c2a06864ac9aca38dc5bd9371de015471edcdbf322dfb14411689bf968ae5"

  },
];
productos.forEach((item) => {
  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card" style="width: 14rem;">
      <img src="${item.img}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${item.nombreProducto}</h5>
        <p class="card-text m-0">Precio: <b>$${item.precio}</b></p>
        <p id="stock-${item.id}" class="card-text">Disponible: ${item.stock}</p>
        <a id="btnComprar" class="btn btn-primary">Comprar</a>
      </div>
    </div>
  `;
  div.querySelector("#btnComprar").addEventListener("click", () => agregarAlCarrito(item));
  document.getElementById("container").append(div);

});
let usuario;
const usuarioStorage = sessionStorage.getItem("usuario");
let i = 0;
let contador = document.getElementById("contador");

if (usuarioStorage) {
  usuario = usuarioStorage;
  mostrarMensajeBienvenida(`Bienvenido nuevamente ${usuario}`);
} else {
  usuario = prompt("Ingrese el usuario");
  sessionStorage.setItem("usuario", usuario);
  mostrarMensajeBienvenida(`Bienvenido por primera vez ${usuario}`);
}

const verCarritoDeCompras = document.getElementById("verCarrito");
verCarritoDeCompras.addEventListener("click", () => verCarrito(carrito));

let carritoStorage = localStorage.getItem("carrito");
let carrito = [];

document.getElementById("borrarCarrito").addEventListener("click", () => eliminaCarrito(carrito));
document.getElementById("cerrarSesion").addEventListener("click",()=> cerrarSesion());
function validarStorage() {
  console.log(carritoStorage);
  if (carritoStorage) {
    carrito = JSON.parse(carritoStorage);
  }
}

function agregarAlCarrito(item) {
  if(item.stock > 0){ 
    validarStorage();
    avisoDeCompra(item.nombreProducto, item.precio);
    carrito.push(item);
    console.log(item.stock)
    item.stock--;
    document.getElementById("stock-" + item.id).innerText = "Disponible: " + item.stock;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    i++;
    contador.innerText = i 
  }else{
    noStock('No hay mas stock de:' + item.nombreProducto);
  }
}

function avisoDeCompra(nombreProducto, precio) {
}

function eliminaCarrito(carrito) {
  if (carrito.length <= 0) {
    mostrarAlerta("El carrito está vacío");
  } else {
    console.log(carrito);
    reponerProductos(carrito);
    localStorage.removeItem("carrito");
    mostrarAlerta("Carrito eliminado");
    i = 0;
    contador.innerText = i
  }
}

function reponerProductos(carrito){
  carrito.forEach((producto) => {
    productos[producto.id - 1].stock += producto.stock
    location.reload()
  })
}

function verCarrito(carrito) {
  const carritoDiv = document.createElement("div");
  carrito.forEach((producto) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>Nombre: ${producto.nombreProducto}<p>
      <p>Precio $${producto.precio}<p>
      <hr>
    `;
    carritoDiv.append(div);
  });
  Swal.fire({
    title: "Carrito de Compras",
    html: carritoDiv.innerHTML,
    icon: "info",
  });
}

function mostrarMensajeBienvenida(mensaje) {
  Swal.fire({
    title: mensaje,
    icon: "success",
  });
}

function mostrarAlerta(mensaje) {
  Swal.fire({
    title: mensaje,
    icon: "warning",
  });
}

function cerrarSesion() {
  sessionStorage.removeItem("usuario");
  Swal.fire({
    title: `Se cerro la sesion con el nombre  ${usuario}`,
    icon: "success",
  })
}
function noStock(mensaje) {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: mensaje,
  })
}
