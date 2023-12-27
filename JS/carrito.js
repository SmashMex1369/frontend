const URL="https://backend-production-c394.up.railway.app"

updateCart();

function eliminarDelCarrito(id) {
    console.log('Eliminar del carrito: ' + id);
    axios.delete(url + '/borrar-producto-carrito/' + id)
    .then( function (response) {
        alert(response.data)
        location.reload();
    }).catch(function (error) {
        console.log(error)
    });
    updateCart();
}

function updateCart(){
    axios.get(URL+"/carrito")
    .then(respuesta =>{
        var productos = respuesta.data;
        var tablaDelCarrito = document.getElementById('tabla-del-carrito');

        while (tablaDelCarrito.rows.length > 1) {
            tablaDelCarrito.deleteRow(1);
        }

        productos.forEach(function(producto){
            var fila = tablaDelCarrito.insertRow();
            var celdaNombre = fila.insertCell();
            celdaNombre.textContent = producto.nombre;
            var celdaPrecio = fila.insertCell();
            celdaPrecio.textContent = '$'+producto.precio;
            
            var celdaCantidad = fila.insertCell();
            celdaCantidad.textContent = producto.cantidad;
            celdaCantidad.contentEditable = 'false'; 
        });
    })
}