class Producto{
    constructor(id ,nombre, precio, stock){
        this.nombreProducto= nombre;
        this.precio = precio;
        this.stock=stock;
    }
}
let carrito=0;

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

function buscadorDeRopa(productoElegido) {
    const found = productos.find(item => item.nombreProducto === productoElegido);
    return found;
}

function buscadorDeStock(stock) {
    return stock > 0;
}

function comprar(productoElegido) {
    const found = buscadorDeRopa(productoElegido);
    console.log(productoElegido);
    if (found) {
        console.log("Producto encontrado");
        
        if (buscadorDeStock(found.stock)) {
            const cantidad = parseInt(prompt(`Ingrese la cantidad de ${found.nombreProducto} que desea comprar:`));
            
            if (!isNaN(cantidad) && cantidad > 0 && cantidad <= found.stock) {
                console.log(`Ha comprado ${cantidad} ${found.nombreProducto}`);
                carrito = (found.precio * cantidad);
                
            } else {
                alert("Cantidad inválida o no disponible en stock.");
            }
        } else {
            alert("Producto sin stock");
        }
    } else {
        alert("Producto no encontrado");
    }
    return carrito
}


let productoElegido = prompt("Ingrese el nombre del producto ");
console.log(productoElegido);
comprar(productoElegido);
alert("El valor a pagar es :" +  carrito);
