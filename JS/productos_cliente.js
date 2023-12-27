const URL='https://backend-production-3215.up.railway.app'
var pathname = window.location.pathname;
var peticion = "";
switch(pathname){
    case "/HTML/CLIENTE/principal_cliente.html":
        peticion=URL+"/listaProductos"
        break;
    case "/HTML/CLIENTE/limpieza_cliente.html":
        peticion=URL+"/listaProductosPorCategoria/Limpieza"
        break;
    case "/HTML/CLIENTE/frutas_cliente.html":
        peticion=URL+"/listaProductosPorCategoria/Frutas y verduras"
        break;
    case "/HTML/CLIENTE/higiene_cliente.html":
        peticion=URL+"/listaProductosPorCategoria/Higiene Personal"
        break;
    case "/HTML/CLIENTE/animales_cliente.html":
        peticion=URL+"/listaProductosPorCategoria/Productos Animales"
        break;
}
axios.get(peticion)
.then(function(respuesta){
    var productos = respuesta.data;
    var listaDeProductos = document.getElementById('product-list');

    productos.forEach(function(producto){
        var elementoProducto = document.createElement('div');
        elementoProducto.className ='item';

        var imagenDelProducto = document.createElement('img');
        imagenDelProducto.src =producto.fotografia
        elementoProducto.appendChild(imagenDelProducto);

        var elementoProductoInfo = document.createElement('div');
        elementoProductoInfo.className ='info-producto';
        elementoProducto.appendChild(elementoProductoInfo);

        var nombreDelProducto = document.createElement('h2');
        nombreDelProducto.textContent = producto.nombre;
        elementoProductoInfo.appendChild(nombreDelProducto);

        var precioDelProducto = document.createElement('p');
        precioDelProducto.className='price'
        precioDelProducto.textContent = 'Precio: $' + producto.precio;
        elementoProductoInfo.appendChild(precioDelProducto);

        var botonAgregarAlCarrito = document.createElement('button');
        botonAgregarAlCarrito.textContent = 'Añadir al carro';
        botonAgregarAlCarrito.className ='btnadd';
        botonAgregarAlCarrito.addEventListener('click', function() {
            agregarAlCarrito(producto.idProducto);
        });
        elementoProducto.appendChild(botonAgregarAlCarrito);

        listaDeProductos.appendChild(elementoProducto);
    });

    
})
.catch(function (error) {
    console.log(error);
});

function agregarAlCarrito(idDelProducto) {
    console.log('Agregar al carrito: ' + idDelProducto);
    axios.post(URL + `/carrito/agregar/${idDelProducto}`)
    .then(response => {
        alert(response.data)
    })
    .catch(error => {
        console.error(error);
    });
}