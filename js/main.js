let header = document.getElementById("header");
let navBar = document.createElement("nav");
navBar.classList.add("header");
navBar.innerHTML = ` <a class=" logo nav__link" href="#">LOGO</a>
<ul class="nav__menu">
   <li class="nav__item"><a class="nav__link" href="#">PRODUCTOS</a></li>
   <li class="nav__item"><a class="nav__link" href="#">CONTACTO</a></li>
   <li class="nav__item">
    <img src="./images/carrito.png" height="50px" alt="carrito de compras">
</ul>`
header.appendChild(navBar);

let carrito = [];

let contenedor = document.getElementById("container");
productos.forEach((producto, indice)=> {
    let card = document.createElement("div");
    card.classList.add("card", "col-lg-3");
    card.innerHTML = `
    <img src="${producto.imagen}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.nombre}</h5>
      <p class="precioProducto">Precio:$ ${producto.precio}</p>
      <a href="#" class="btn btn-primary" onClick = "agregarAlCarrito(${indice})">Comprar</a>
    </div>`
    contenedor.appendChild(card);
})

let modalCarrito = document.getElementById("cart-shop");
const agregarAlCarrito = (indiceProducto) => {
    const indiceCarrito = carrito.findIndex((elemento) => {
        return elemento.id === productos[indiceProducto].id
    }) 
    if (indiceCarrito === -1) {
        const agregarProducto = productos[indiceProducto];
        agregarProducto.cantidad = 1;
        carrito.push(agregarProducto);
        carritoRender();
    } else {
        carrito[indiceCarrito].cantidad += 1;
        carritoRender();
    }   
}

const carritoRender = () => {
    let total = 0;
    modalCarrito.className = "cart-shop";
    modalCarrito.innerHTML = "";
    if (carrito.length > 0) {
        carrito.forEach ((producto, indice) => {
            total += producto.precio + producto.cantidad;
            const carritoContenedor = document.createElement("div");
            carritoContenedor.className = "producto-carrito";
            carritoContenedor.innerHTML = `
            <img class="card-img" src="${producto.imagen}"/>
            <div class="product-details">${producto.nombre}</div>
            <div class="product-details" > Cantidad: ${producto.cantidad}</div>
            <div class="product-details"> Precio: $ ${producto.precio}</div>
            <div class="product-details"> Subtotal: $ ${producto.precio * producto.cantidad}</div>
            <button class="btn btn-danger"  id="remove-product" onClick="removeProduct(${indice})">Eliminar producto</button>`;
             modalCarrito.appendChild(carritoContenedor);

        }) 
        const totalContainer = document.createElement("div");
        totalContainer.className = "total-carrito";
        totalContainer.innerHTML = `<div class= "total"> TOTAL $ ${total}</div>
        <button class= "btn btn-primary finalizar" id="finalizar" onClick="finalizarCompra()"> FINALIZAR COMPRA </button>`;
        modalCarrito.appendChild(totalContainer);
      } else {
        modalCarrito.classList.remove("cart-shop");
      }
    
} 



