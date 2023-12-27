const URL = 'https://backend-production-c394.up.railway.app'
var pathname = window.location.pathname;
console.log(pathname)
var peticion = "";
switch(pathname){
    case "/HTML/ADMINISTRADOR/principal_admin.html":
        peticion=URL+"/listaProductos"
        break;
    case "/HTML/ADMINISTRADOR/limpieza_admin.html":
        peticion=URL+"/listaProductosPorCategoria/Limpieza"
        break;
    case "/HTML/ADMINISTRADOR/frutas_admin.html":
        peticion=URL+"/listaProductosPorCategoria/Frutas y verduras"
        break;
    case "/HTML/ADMINISTRADOR/higiene_admin.html":
        peticion=URL+"/listaProductosPorCategoria/Higiene Personal"
        break;
    case "/HTML/ADMINISTRADOR/animales_admin.html":
        peticion=URL+"/listaProductosPorCategoria/Productos Animales"
        break;
}
console.log(peticion)
axios.get(peticion)
.then(function(respuesta){
    var productos = respuesta.data;
    var listaDeProductos = document.getElementById('product-list');
    Array.from(productos).forEach(function(producto){
        var elementoProducto = document.createElement('div');
        elementoProducto.className ='item';

        var imagenDelProducto = document.createElement('img');
        imagenDelProducto.src =producto.fotografia
        elementoProducto.appendChild(imagenDelProducto);

        var elementoProductoInfo = document.createElement('div');
        elementoProducto.appendChild(elementoProductoInfo);

        var nombreDelProducto = document.createElement('h2');
        nombreDelProducto.textContent = producto.nombre;
        elementoProductoInfo.appendChild(nombreDelProducto);

        var precioDelProducto = document.createElement('p');
        precioDelProducto.className='price'
        precioDelProducto.textContent = 'Precio: $' + producto.precio;
        elementoProductoInfo.appendChild(precioDelProducto);

        var botonAgregarAlCarrito = document.createElement('button');
        botonAgregarAlCarrito.textContent = 'Actualizar';
        botonAgregarAlCarrito.className ='btnadd';
        botonAgregarAlCarrito.addEventListener('click', function() {
        var datosProducto = new URLSearchParams();
            datosProducto.append("id",producto.idProducto);
            datosProducto.append("nombre",producto.nombre);
            datosProducto.append("precio",producto.precio);
            datosProducto.append("categoria",producto.categoria);
            location.href ='https://smashmex1369.github.io/frontend/HTML/ADMINISTRADOR/actualizar_admin.html'+ datosProducto.toString(); 
        });
        elementoProducto.appendChild(botonAgregarAlCarrito);

        var botoneliminar = document.createElement('button');
        botoneliminar.textContent = 'Eliminar';
        botoneliminar.className ='btnadd';
        botoneliminar.addEventListener('click', function() {
            eliminarProducto(producto.idProducto)
        });
        elementoProducto.appendChild(botoneliminar);
        listaDeProductos.appendChild(elementoProducto);
    });
})

.catch(function (error) {
    console.log(error);
});


function eliminarProducto(_idProducto) {
    axios.delete(URL + "/borrarProducto/" + _idProducto)
    .then( function (response) {
        alert(response.data)
        location.reload();
    }).catch(function (error) {
        alert("EL PRODUCTO ESTA EN EL CARRITO DE UN CLIENTE. ELIMINE EL PRODUCTO DEL CARRITO PRIMERO OwO")
        console.log(error)
    });
}