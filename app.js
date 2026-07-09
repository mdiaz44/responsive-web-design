// ==========================================
// DARK MANGAS - APP.JS
// ==========================================

// Carrito
let carrito = [];

// Elementos del DOM
const btnCarrito = document.querySelector(".carrito");
const panelCarrito = document.getElementById("panel-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const totalElemento = document.querySelector(".total span");
const contadorCarrito = document.getElementById("contador-carrito");
const btnFinalizar = document.getElementById("finalizar-compra");

// ==========================================
// ABRIR / CERRAR CARRITO
// ==========================================

if (btnCarrito) {
    btnCarrito.addEventListener("click", () => {
        panelCarrito.classList.toggle("abierto");
    });
}

// ==========================================
// CARGAR CARRITO GUARDADO
// ==========================================

window.addEventListener("DOMContentLoaded", () => {

    const carritoGuardado = localStorage.getItem("darkMangasCart");

    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }

});

// ==========================================
// GUARDAR CARRITO
// ==========================================

function guardarCarrito() {

    localStorage.setItem(
        "darkMangasCart",
        JSON.stringify(carrito)
    );

}

// ==========================================
// AGREGAR PRODUCTOS
// ==========================================

const botonesComprar = document.querySelectorAll(".comprar");

botonesComprar.forEach(boton => {

    boton.addEventListener("click", () => {

        const card = boton.closest(".card");

        const nombre = card.querySelector("h3").textContent;

        const precioTexto =
            card.querySelector(".precio").textContent;

        const precio = parseInt(
            precioTexto.replace("$", "")
        );

        agregarAlCarrito(nombre, precio);

    });

});

function agregarAlCarrito(nombre, precio) {

    const existente = carrito.find(
        item => item.nombre === nombre
    );

    if (existente) {

        existente.cantidad++;

    } else {

        carrito.push({
            nombre,
            precio,
            cantidad: 1
        });

    }

    actualizarCarrito();

}

// ==========================================
// ACTUALIZAR CARRITO
// ==========================================

function actualizarCarrito() {

    listaCarrito.innerHTML = "";

    let total = 0;
    let cantidadTotal = 0;

    if (carrito.length === 0) {

        listaCarrito.innerHTML =
            "<p>Tu carrito está vacío.</p>";

    }

    carrito.forEach((producto, indice) => {

        total += producto.precio * producto.cantidad;

        cantidadTotal += producto.cantidad;

        const item = document.createElement("div");

        item.classList.add("item-carrito");

        item.innerHTML = `
            <div class="producto-carrito">

                <h4>${producto.nombre}</h4>

                <p>
                    $${producto.precio}
                    x
                    ${producto.cantidad}
                </p>

                <div class="acciones-carrito">

                    <button class="menos"
                        data-index="${indice}">
                        -
                    </button>

                    <button class="mas"
                        data-index="${indice}">
                        +
                    </button>

                    <button class="eliminar"
                        data-index="${indice}">
                        Eliminar
                    </button>

                </div>

            </div>
        `;

        listaCarrito.appendChild(item);

    });

    totalElemento.textContent = `$${total}`;

    contadorCarrito.textContent = cantidadTotal;

    guardarCarrito();

    activarBotonesCarrito();

}

// ==========================================
// BOTONES DEL CARRITO
// ==========================================

function activarBotonesCarrito() {

    document.querySelectorAll(".mas")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                const index =
                    btn.dataset.index;

                carrito[index].cantidad++;

                actualizarCarrito();

            });

        });

    document.querySelectorAll(".menos")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                const index =
                    btn.dataset.index;

                carrito[index].cantidad--;

                if (
                    carrito[index].cantidad <= 0
                ) {

                    carrito.splice(index, 1);

                }

                actualizarCarrito();

            });

        });

    document.querySelectorAll(".eliminar")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                const index =
                    btn.dataset.index;

                carrito.splice(index, 1);

                actualizarCarrito();

            });

        });

}

// ==========================================
// BUSCADOR
// ==========================================

const buscador =
    document.querySelector(".busqueda input");

if (buscador) {

    buscador.addEventListener("keyup", () => {

        const texto =
            buscador.value.toLowerCase();

        const cards =
            document.querySelectorAll(".card");

        cards.forEach(card => {

            const nombre =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();

            if (nombre.includes(texto)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// ==========================================
// FILTROS (PREPARADOS)
// ==========================================

const botonesFiltro =
    document.querySelectorAll(".categorias button");

botonesFiltro.forEach(btn => {

    btn.addEventListener("click", () => {

        botonesFiltro.forEach(b =>
            b.classList.remove("activo")
        );

        btn.classList.add("activo");

    });

});

// ==========================================
// FINALIZAR COMPRA
// ==========================================

if (btnFinalizar) {

    btnFinalizar.addEventListener("click", () => {

        if (carrito.length === 0) {

            alert(
                "Tu carrito está vacío."
            );

            return;

        }

        alert(
            "En la siguiente versión conectaremos esta compra con Flask y Excel."
        );

    });

}

// ==========================================
// NAVBAR SCROLL
// ==========================================

window.addEventListener("scroll", () => {

    const header =
        document.querySelector("header");

    if (window.scrollY > 100) {

        header.style.background =
            "rgba(15,15,15,0.95)";

    } else {

        header.style.background =
            "rgba(15,15,15,0.85)";

    }

});

// ==========================================
// NEWSLETTER
// ==========================================

const newsletterForm =
    document.querySelector(".newsletter form");

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        (e) => {

            e.preventDefault();

            const email =
                newsletterForm
                .querySelector("input")
                .value;

            if (email.trim() !== "") {

                alert(
                    `Gracias por suscribirte: ${email}`
                );

                newsletterForm.reset();

            }

        }
    );

}