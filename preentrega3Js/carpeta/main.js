
let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

if (usuarioStorage) {
  usuario = usuarioStorage;
  alert(`Bienvenido nuevamente ${usuario}`);
} else {
  let usuario = prompt("Ingrese el usuario");
  sessionStorage.setItem("usuario", usuario);

  alert(`Bienvenido por primera vez ${usuario}`);
}



let verCarritoDeCompras = document.getElementById("verCarrito").addEventListener("click", () => verCarrito(carrito));

let carritoStorage = localStorage.getItem("carrito");
let carrito = [
]
let eliminar = document.getElementById("borrarCarrito").addEventListener("click",() => eliminaCarrito(carrito));

let boton = document.getElementById("boton");

const productos=[
    {"id":1,
    "nombreProducto":"Gorra",
    "precio": 3500,
     "stock": 10,
 },
 {"id":2,
    "nombreProducto":"Remera",
    "precio": 4000,
     "stock": 10,
 },
 {"id":3,
    "nombreProducto":"Campera",
    "precio": 6000,
     "stock": 3,
 },
 {"id":4,
    "nombreProducto":"Buzo",
    "precio": 5500,
     "stock": 10,
 },
 
 ]

 productos.forEach((item) => {
    let div = document.createElement("div");
    div.innerHTML = `
      <h2>Id: ${item.id}</h2>
      <p>Nombre: ${item.nombreProducto}</p>
      <b>$${item.precio}</b>
      <br>       <br>
      <button class="comprar"> Comprar </button>
      <hr />
    `;
    div.querySelector(".comprar").addEventListener("click", () => agregarAlCarrito(item));
    document.body.append(div)
  });

    function validarStorage(){
      console.log(carritoStorage);
      if (carritoStorage) {
        carrito = JSON.parse(carritoStorage);
    }}

    function agregarAlCarrito(item){
      validarStorage();
      avisoDeCompra(item.nombreProducto,item.precio);
      carrito.push(item);
      console.log(carrito);
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    const avisoDeCompra = (nombreProducto, precio) => {
      console.log(`Usted agrego al carrito : ${nombreProducto}, $${precio} `);
    };

    function eliminaCarrito(carrito) {
      if (carrito.length <= 0) {
        alert("El carrito está vacío");
      } else {
        console.log(carrito);
        carrito.length = 0; 
        localStorage.removeItem("carrito"); 
        alert("Carrito eliminado");
      }
    }

    function verCarrito(carrito) {
      carrito.forEach(producto => {
        let div = document.createElement("div");
        div.innerHTML = `
          <h2>Nombre: ${producto.nombreProducto}</h2>
          <h2>$${producto.precio}</h2>
          <br>       <br> `;
        document.body.append(div);
      });
    }