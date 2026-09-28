// Referencias a elementos HTML
//---------------------------------//
const containerListaCursos = document.getElementById("lista-cursos")
const productName = document.getElementById("product-name");
const productPrice = document.getElementById("product-price");
const btnDescuento = document.getElementById("btn-descuento");
const codigoPromocion = document.getElementById("promocion");
const contenedorPrecioFinal = document.getElementById("contenedor-precio-final");

// Constantes de códigos de promoción
//---------------------------------//
const SUMMER = "SUMMER";
const IESEMILI = "IESEMILI";

// Lista de cursos
let listaCursos = [
    { "id": 1, "name": "Curso React", "price": 100, "photo": "react.jpg" },
    { "id": 2, "name": "Curso Angular", "price": 50, "photo": "angular.png" },
    { "id": 3, "name": "Curso Ionic", "price": 150, "photo": "ionic.png" },
    { "id": 4, "name": "Curso Svelte", "price": 200, "photo": "svelte.jpg" },
    { "id": 5, "name": "Curso Oracle", "price": 70, "photo": "oracle.jpg" },
    { "id": 6, "name": "Curso Vue", "price": 30, "photo": "vue.webp" },
    { "id": 7, "name": "Curso Node.js", "price": 75, "photo": "node.jpg" },
    { "id": 8, "name": "Curso Web Components", "price": 40, "photo": "web-components.jpg" }
];

// Configuración inicial
//-----------------------------------------------------------//
window.onload = () => {
    cargarListaCursos();

    const listaBotonesCursos = document.querySelectorAll(".card button");
    listaBotonesCursos.forEach(botonCurso => {
        botonCurso.addEventListener("click", seleccionarCurso)
    });

    btnDescuento.addEventListener("click", calcularPrecioFinal);
};

/**
 * Renderiza una lista de cursos en el DOM actualizando el elemento containerListaCursos.
 * 
 * Limpia el contenido existente e itera a través del array listaCursos,
 * creando un elemento artículo tarjeta para cada curso con su imagen, nombre, precio,
 * y un botón "Seleccionar". Cada tarjeta se rellena con atributos de datos
 * para id, precio y nombre.
 * 
 * @returns {void}
 */
const cargarListaCursos = () => {
    containerListaCursos.innerHTML = "";
    listaCursos.forEach(curso => {
        containerListaCursos.innerHTML += `
            <article data-id="${curso.id}" data-price="${curso.price}" class="card">
                <div class="card-header">
                    <img src="./img/${curso.photo}" alt="" />
                </div>
                <div class="card-body">
                    <p class="name-course">${curso.name}</p>
                    <p class="price-tag"><i class="fa-solid fa-tag"></i> ${curso.price}</p>

                </div>
                <button class="btn-add">
                    <i class="fa-solid fa-cart-plus"></i> Seleccionar
                </button>
            </article>
        `;
    });
};


/**
 * Gestiona la selección de un curso y actualiza el carrito.
 * @param {Event} event - El evento click disparado por un botón de curso
 * @returns {void}
 * @description Extrae la información del curso (nombre y precio) del elemento padre del botón clickeado
 * usando atributos de datos, y actualiza los elementos de visualización del nombre y precio del producto.
 */
const seleccionarCurso = (event) => {
    let boton = event.target;
    // Accedemos al padre <article class=".card">
    let curso = boton.closest('.card');

    //Leemos los datos
    let price = curso.dataset.price;
    let name = curso.dataset.name;

    // Añadimos al carrito
    productName.textContent = name;
    productPrice.textContent = price;
};


/**
 * Calcula el precio final de un producto aplicando una promoción y actualiza el DOM
 * 
 * Lee el precio del producto desde el DOM, valida que se haya seleccionado un curso,
 * aplica la promoción correspondiente y actualiza el contenedor con el resultado.
 * 
 * @returns {boolean} Retorna true si el cálculo se realizó correctamente, 
 *                    false si no se ha seleccionado ningún curso.
 * 
 * @throws {Alert} Muestra una alerta si el precio es 0 o no es un número válido.
 */
const calcularPrecioFinal = () => {
    let precio = parseFloat(productPrice.textContent);

    if (precio === 0) {
        alert("No hay curso seleccionado");
    } else {
        let precioFinal = aplicarPromocion(precio);
        contenedorPrecioFinal.innerHTML = `
        Precio final: ${precioFinal} €
        `;
    }


};


/**
 * Aplica un código de promoción al precio proporcionado y devuelve el precio con descuento.
 * 
 * @param {number} precio - El precio original al que se aplicará el descuento.
 * @returns {number} El precio final después de aplicar el descuento correspondiente al código de promoción.
 *                   Si el código es inválido, devuelve el precio original.
 * 
 * @throws {Alert} Muestra una alerta si el código de promoción es incorrecto y limpia el campo de entrada.
 * 
 * @example
 * // Con código SUMMER (20% de descuento)
 * aplicarPromocion(100); // Retorna 80
 * 
 * @example
 * // Con código IESEMILI (30% de descuento)
 * aplicarPromocion(100); // Retorna 70
 * 
 * @example
 * // Con código inválido
 * aplicarPromocion(100); // Muestra alerta y retorna 100
 */
const aplicarPromocion = (precio) => {
    let codigo = codigoPromocion.value.toUpperCase().trim();
    if (codigo === SUMMER) {
        return precio * 0.8;
    } else if (codigo === IESEMILI) {
        return precio * 0.7;
    } else {
        alert("Codigo de descuento no valido");
        codigoPromocion.value = "";
        return precio;
    }
}
