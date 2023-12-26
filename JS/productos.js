const URL = 'https://backend-production-3215.up.railway.app'

axios.get(URL+'/listaProductos')
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
        elementoProducto.appendChild(elementoProductoInfo);

        var nombreDelProducto = document.createElement('h2');
        nombreDelProducto.textContent = producto.nombre;
        elementoProductoInfo.appendChild(nombreDelProducto);

        var precioDelProducto = document.createElement('p');
        precioDelProducto.className='price'
        precioDelProducto.textContent = 'Precio: $' + producto.precio;
        elementoProductoInfo.appendChild(precioDelProducto);
    });
})