

    let libros = [];  
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById("libros");
    const carritoDiv = document.getElementById("carrito");

    
    async function cargarLibros() {
        try {
            const respuesta = await fetch('libros.json');
            libros = await respuesta.json();
            renderizarLibros();  
        } catch (error) {
            console.error("Error al cargar los libros:", error);
        }
    }

    function renderizarLibros() {
    contenedor.innerHTML = "";  
    libros.forEach(libro => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${libro.imagen}" 
                 alt="${libro.titulo}" 
                 style="cursor:pointer" 
                 onclick="mostrarDetalle('${libro.texto}')"> 
                 
            <h3>${libro.titulo}</h3>
            <p>$${libro.precio}</p>
            <input type="number" id="cant-${libro.id}" value="1" min="1" style="width: 50px">
            <button class="agrega" onclick="agregarAlCarrito(${libro.id})">Agregar</button>
        `;
        contenedor.appendChild(card);
    });
}

function mostrarDetalle(texto) {
    alert("Descripción del libro: " + texto);
}



    function agregarAlCarrito(id) {
        const libro = libros.find(l => l.id === id);
        const cantidad = parseInt(document.getElementById(`cant-${id}`).value);
        
      
        const indice = carrito.findIndex(item => item.id === id);
        if (indice !== -1) {
            carrito[indice].cantidad += cantidad;
        } else {
            carrito.push({ ...libro, cantidad });
        }
        
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    function actualizarCarrito() {
        carritoDiv.innerHTML = carrito.map((item, index) => `
            <p>${item.titulo} - Cant: ${item.cantidad} - Total: $${item.precio * item.cantidad}
               <button onclick="eliminarDelCarrito(${index})">X</button>
            </p>
        `).join('');
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    
    cargarLibros();
    actualizarCarrito();


function pagarCarrito() {
    if (carrito.length === 0) {
        alert("El carrito está vacío, agrega algo primero.");
        return;
    }

    let total = 0;
    for (let item of carrito) {
        total += (item.precio * item.cantidad);
    }

    alert("¡Compra realizada con éxito! Total a pagar: $" + total);

    
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
}







setTimeout(function() { 
    fetch("entregaFinal1.txt")   
    .then(response => response.json()) 
    .then(data => { 
        const fraseJson = document.querySelector(".frase_Json"); 
        fraseJson.innerHTML = `<p>"${data.texto}"</p>`; 
        fraseJson.style.animation = "aparece 2s forwards"; 
        fraseJson.style.fontSize = "22px";  
    })  
    .catch(error => { 
        console.log("Error fatal: El archivo EntreFinal1.txt no se encontró.", error);
    });   
}, 1000);


