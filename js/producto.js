

/* const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("id");
console.log("ID del producto:", idParam);

fetch("../data/productos.json")
    .then(res => res.json())
    .then(data => {
        const producto = data.find(item => item.id === parseInt(idParam));
        if (producto) {
            mostrarInfoProducto(producto);
        } else {
            innerHTML = "producto no encontrado"
        }
    });

const contenedor = document.querySelector("#single-product");

const mostrarInfoProducto = (producto) => {
    const div = document.createElement("div");
    
    div.innerHTML = `
        <div class="card-producto">
            <a class="link-volver-inicio"href="../index.html"><</a>
            <div class="container-producto">
                <img class="img-producto" src="${producto.img}" />
                <div>  
                    <h2 class="titulo-producto contenido-producto">${producto.titulo}</h2>
                    <p class="descripcion-producto">${producto.descripciones}</p>
                    <p class="contenido-producto">$${producto.precio}</p>
                </div>
            </div>
        </div>
        
    `;
    contenedor.append(div);
}



const actualizarCarritoEnTodasLasPaginas = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const numeroDelCarrito = document.querySelector(".cart-count");
    if (carritoGuardado.length > 0) {
        const contadorCarrito = carritoGuardado.reduce((acc, prod) => acc + prod.cantidad, 0);
        numeroDelCarrito.innerText = contadorCarrito;

        // Mostrar los productos en el sidebar
        const carritoProductos = document.querySelector("#carrito-productos");
        const carritoTotal = document.querySelector("#carrito-total");

        carritoProductos.innerHTML = ""; // Limpiar el contenido previo

        carritoGuardado.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="img-sidebar" src="${producto.img}"></img>
                <h4 class="titulo-producto-sidebar contenido-producto">${producto.titulo}</h4>
                <p class="precio-sidebar contenido-producto">$ ${(producto.precio * producto.cantidad).toFixed(2)}</p>
            `;
            carritoProductos.appendChild(div);
        });

        // Actualizar el total del carrito
        const total = carritoGuardado.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0).toFixed(2);
        carritoTotal.innerText = `U$D ${total}`;
    } else {
        numeroDelCarrito.innerText = "0";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const carritoIcon = document.querySelector(".carrito-icon");
    const sidebarCloseIcon = document.querySelector(".sidebar-close");
    const sidebar = document.getElementById("sidebar");

    carritoIcon.addEventListener("click", () => {
        sidebar.classList.add("open");
        actualizarCarritoEnTodasLasPaginas(); // Actualizar el carrito al abrir el sidebar
    });

    sidebarCloseIcon.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });

    // Recuperar productos del localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado && carritoGuardado.length > 0) {
        carrito = carritoGuardado;
    }

    // Actualizar el carrito al cargar la página
    actualizarCarritoEnTodasLasPaginas();
});

 */










const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("id");

fetch("../data/productos.json")
    .then(res => res.json())
    .then(data => {
        const producto = data.find(item => item.id === parseInt(idParam));
        if (producto) {
            mostrarInfoProducto(producto);
            actualizarCarritoEnTodasLasPaginas(); // Actualizar el carrito al cargar el producto
        } else {
            innerHTML = "producto no encontrado"
        }
    });

const contenedor = document.querySelector("#single-product");

const mostrarInfoProducto = (producto) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card-producto">
            <a class="link-volver-inicio"href="../index.html"><</a>
            <div class="container-producto">
                <img class="img-producto" src="${producto.img}" />
                <div>  
                    <h2 class="titulo-producto contenido-producto">${producto.titulo}</h2>
                    <p class="descripcion-producto">${producto.descripciones}</p>
                    <p class="contenido-producto">$${producto.precio}</p>
                </div>
            </div>
        </div>
    `;
    contenedor.append(div);
}

const actualizarCarritoEnTodasLasPaginas = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    const carritoProductosContainer = document.querySelector("#carrito-productos");
    const numeroDelCarrito = document.querySelector(".cart-count");

    if (carritoGuardado.length === 0) {
        carritoProductosContainer.innerHTML = ""; // Limpiar el contenido previo
        carritoProductosContainer.classList.add("d-none"); // Ocultar el contenedor si el carrito está vacío
        document.querySelector("#carrito-vacio").classList.remove("d-none"); // Mostrar el mensaje de carrito vacío
    } else {
        carritoProductosContainer.innerHTML = ""; // Limpiar el contenido previo
        document.querySelector("#carrito-vacio").classList.add("d-none"); // Ocultar el mensaje de carrito vacío
        carritoProductosContainer.classList.remove("d-none"); // Mostrar el contenedor de productos

        carritoGuardado.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="img-sidebar" src="${producto.img}" alt="${producto.titulo}">
                <h4 class="titulo-producto-sidebar contenido-producto">${producto.titulo}</h4>
                <p class="precio-sidebar contenido-producto">$${(producto.precio * producto.cantidad).toFixed(2)}</p>
                <button class="carrito-producto-restar contenedor-sumar-restar">-</button>
                <p class="cantidad-sidebar contenedor-sumar-restar">${producto.cantidad}</p>
                <button class="carrito-producto-sumar contenedor-sumar-restar">+</button>
                <button class="carrito-producto-btn">🗑</button>
            `;
            carritoProductosContainer.appendChild(div);
        });
    }

    // Actualizar el total del carrito
    const total = carritoGuardado.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0).toFixed(2);
    document.querySelector("#carrito-total").innerText = `U$D ${total}`;

    const contadorCarrito = carritoGuardado.reduce((acc, prod) => acc + prod.cantidad, 0);
    numeroDelCarrito.innerText = contadorCarrito;
}



document.addEventListener("DOMContentLoaded", () => {
    const carritoIcon = document.querySelector(".carrito-icon");
    const sidebarCloseIcon = document.querySelector(".sidebar-close");
    const sidebar = document.getElementById("sidebar");

    carritoIcon.addEventListener("click", () => {
        sidebar.classList.add("open");
        actualizarCarritoEnTodasLasPaginas(); // Actualizar el carrito al abrir el sidebar
    });

    sidebarCloseIcon.addEventListener("click", () => {
        sidebar.classList.remove("open");
    });

    // Recuperar productos del localStorage
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado && carritoGuardado.length > 0) {
        carrito = carritoGuardado;
    }

    // Actualizar el carrito al cargar la página
    actualizarCarritoEnTodasLasPaginas();
});

